import { Body, ConflictException, Controller, Get, Injectable, Module, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { Db, type Tx } from "../db.js";
import { CurrentSeller, IamModule, SessionGuard, type Seller } from "../iam/iam.js";
import { mmk, parse } from "../validation.js";

const productSchema = z.object({
  name: z.string().trim().min(1).max(200),
  priceMmk: mmk.min(1),
  // Recorded from day one so profit can be reported later (US-AIA-02).
  costMmk: mmk.default(0),
  stock: z.number().int().min(0).max(1_000_000),
});

const productPatchSchema = productSchema.partial().extend({ active: z.boolean().optional() });

const SELLER_COLUMNS = `id, name, price_mmk AS "priceMmk", cost_mmk AS "costMmk", stock, active`;

@Injectable()
export class CatalogService {
  constructor(private readonly db: Db) {}

  /** What shoppers see. Cost price must never appear here. */
  async storefront(slug: string) {
    const { rows } = await this.db.query(
      `SELECT id, slug, name, delivery_fee_mmk AS "deliveryFeeMmk" FROM shops WHERE slug = $1`,
      [slug],
    );
    const shop = rows[0];
    if (!shop) throw new NotFoundException({ code: "SHOP_NOT_FOUND" });
    const products = await this.db.withShop(shop.id, (tx) =>
      tx.query(
        `SELECT id, name, price_mmk AS "priceMmk", stock > 0 AS "inStock"
         FROM products WHERE active ORDER BY created_at DESC`,
      ),
    );
    return { shop, products: products.rows };
  }

  list(shopId: string) {
    return this.db.withShop(shopId, (tx) =>
      tx.query(`SELECT ${SELLER_COLUMNS} FROM products ORDER BY created_at DESC`).then((r) => r.rows),
    );
  }

  create(shopId: string, input: z.infer<typeof productSchema>) {
    return this.db.withShop(shopId, (tx) =>
      tx
        .query(
          `INSERT INTO products (shop_id, name, price_mmk, cost_mmk, stock) VALUES ($1, $2, $3, $4, $5) RETURNING ${SELLER_COLUMNS}`,
          [shopId, input.name, input.priceMmk, input.costMmk, input.stock],
        )
        .then((r) => r.rows[0]),
    );
  }

  async update(shopId: string, id: string, input: z.infer<typeof productPatchSchema>) {
    const row = await this.db.withShop(shopId, (tx) =>
      tx
        .query(
          `UPDATE products SET
             name = COALESCE($2, name), price_mmk = COALESCE($3, price_mmk), cost_mmk = COALESCE($4, cost_mmk),
             stock = COALESCE($5, stock), active = COALESCE($6, active)
           WHERE id = $1 RETURNING ${SELLER_COLUMNS}`,
          [id, input.name ?? null, input.priceMmk ?? null, input.costMmk ?? null, input.stock ?? null, input.active ?? null],
        )
        .then((r) => r.rows[0]),
    );
    if (!row) throw new NotFoundException({ code: "PRODUCT_NOT_FOUND" });
    return row;
  }

  /** Takes stock in one statement, so two shoppers can never buy the last item twice. */
  async reserve(tx: Tx, productId: string, qty: number) {
    const { rows } = await tx.query(
      `UPDATE products SET stock = stock - $2 WHERE id = $1 AND active AND stock >= $2
       RETURNING id, name, price_mmk, cost_mmk`,
      [productId, qty],
    );
    if (!rows[0]) throw new ConflictException({ code: "OUT_OF_STOCK", productId });
    return rows[0] as { id: string; name: string; price_mmk: number; cost_mmk: number };
  }

  async release(tx: Tx, productId: string, qty: number) {
    await tx.query("UPDATE products SET stock = stock + $2 WHERE id = $1", [productId, qty]);
  }
}

@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get("shops/:slug")
  storefront(@Param("slug") slug: string) {
    return this.catalog.storefront(slug);
  }

  @Get("seller/products")
  @UseGuards(SessionGuard)
  list(@CurrentSeller() seller: Seller) {
    return this.catalog.list(seller.shopId);
  }

  @Post("seller/products")
  @UseGuards(SessionGuard)
  create(@CurrentSeller() seller: Seller, @Body() body: unknown) {
    return this.catalog.create(seller.shopId, parse(productSchema, body));
  }

  @Patch("seller/products/:id")
  @UseGuards(SessionGuard)
  update(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string, @Body() body: unknown) {
    return this.catalog.update(seller.shopId, id, parse(productPatchSchema, body));
  }
}

@Module({ imports: [IamModule], controllers: [CatalogController], providers: [CatalogService], exports: [CatalogService] })
export class CatalogModule {}
