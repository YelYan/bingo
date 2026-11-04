import { Body, ConflictException, Controller, Get, Injectable, Module, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { CatalogModule, CatalogService } from "../catalog/catalog.js";
import { Db, type Tx } from "../db.js";
import { CurrentSeller, IamModule, SessionGuard, type Seller } from "../iam/iam.js";
import { ShippingModule, ShippingService } from "../shipping/shipping.js";
import { parse, phone } from "../validation.js";

const orderSchema = z.object({
  // Made by the client once per checkout, so a retry on weak internet cannot double an order.
  idempotencyKey: z.string().min(8).max(64),
  // Only product and quantity: prices are always read from the database.
  items: z.array(z.object({ productId: z.uuid(), qty: z.number().int().min(1).max(999) })).min(1).max(50),
  customer: z.object({
    name: z.string().trim().min(1).max(100),
    phone,
    region: z.string().trim().min(1).max(60),
    township: z.string().trim().min(1).max(60),
    address: z.string().trim().min(3).max(500),
  }),
  paymentMethod: z.enum(["cod", "transfer"]),
});

const date = z.iso.date();
const eventSchema = z
  .object({
    eventId: z.string().min(8).max(64),
    type: z.enum(["PACKED", "HANDED_TO_CARRIER", "OUT_FOR_DELIVERY", "DELIVERY_ATTEMPTED", "DELIVERED", "CANCELLED"]),
    carrier: z.string().trim().min(1).max(100).optional(),
    etaLow: date.optional(),
    etaHigh: date.optional(),
    note: z.string().trim().max(500).optional(),
  })
  .refine((e) => !e.etaLow || !e.etaHigh || e.etaLow <= e.etaHigh, { path: ["etaHigh"] });

const PAYMENT_CLEARED = new Set(["cod_due", "approved"]);

const SUMMARY = `id, number, customer_name AS "customerName", total_mmk AS "totalMmk",
  payment_method AS "paymentMethod", payment_status AS "paymentStatus", created_at AS "createdAt"`;

@Injectable()
export class OrdersService {
  constructor(
    private readonly db: Db,
    private readonly catalog: CatalogService,
    private readonly shipping: ShippingService,
  ) {}

  async place(slug: string, input: z.infer<typeof orderSchema>) {
    const { rows } = await this.db.query("SELECT id, delivery_fee_mmk FROM shops WHERE slug = $1", [slug]);
    const shop = rows[0];
    if (!shop) throw new NotFoundException({ code: "SHOP_NOT_FOUND" });

    try {
      return await this.db.withShop(shop.id, async (tx) => {
        const repeat = await this.findByKey(tx, input.idempotencyKey);
        return repeat ?? this.insert(tx, shop, input);
      });
    } catch (err: any) {
      // Two identical requests raced; the other one won, so return its order.
      if (err.code === "23505" && err.constraint === "orders_shop_id_idempotency_key_key") {
        return this.db.withShop(shop.id, async (tx) => (await this.findByKey(tx, input.idempotencyKey))!);
      }
      throw err;
    }
  }

  private async findByKey(tx: Tx, key: string) {
    const { rows } = await tx.query(
      `SELECT o.number, s.public_token AS "trackingToken" FROM orders o JOIN shipments s ON s.order_id = o.id WHERE o.idempotency_key = $1`,
      [key],
    );
    return rows[0] as { number: number; trackingToken: string } | undefined;
  }

  private async insert(tx: Tx, shop: { id: string; delivery_fee_mmk: number }, input: z.infer<typeof orderSchema>) {
    const quantities = new Map<string, number>();
    for (const { productId, qty } of input.items) quantities.set(productId, (quantities.get(productId) ?? 0) + qty);

    // Sorted, so two orders for the same products cannot deadlock.
    const lines = [];
    for (const [productId, qty] of [...quantities].sort(([a], [b]) => a.localeCompare(b))) {
      lines.push({ ...(await this.catalog.reserve(tx, productId, qty)), qty });
    }

    const subtotal = lines.reduce((sum, line) => sum + line.price_mmk * line.qty, 0);
    const { rows: numbered } = await tx.query(
      "UPDATE shops SET next_order_number = next_order_number + 1 WHERE id = $1 RETURNING next_order_number - 1 AS number",
      [shop.id],
    );
    const { customer } = input;
    const { rows } = await tx.query(
      `INSERT INTO orders (shop_id, number, idempotency_key, customer_name, customer_phone, region, township, address,
         subtotal_mmk, delivery_fee_mmk, total_mmk, payment_method, payment_status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id, number`,
      [
        shop.id, numbered[0].number, input.idempotencyKey, customer.name, customer.phone, customer.region, customer.township,
        customer.address, subtotal, shop.delivery_fee_mmk, subtotal + shop.delivery_fee_mmk, input.paymentMethod,
        input.paymentMethod === "cod" ? "cod_due" : "awaiting_slip",
      ],
    );
    for (const line of lines) {
      await tx.query(
        `INSERT INTO order_items (shop_id, order_id, product_id, name, unit_price_mmk, unit_cost_mmk, qty) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [shop.id, rows[0].id, line.id, line.name, line.price_mmk, line.cost_mmk, line.qty],
      );
    }
    return { number: rows[0].number as number, trackingToken: await this.shipping.create(tx, shop.id, rows[0].id) };
  }

  list(shopId: string) {
    return this.db.withShop(shopId, async (tx) => {
      const { rows } = await tx.query(`SELECT ${SUMMARY} FROM orders ORDER BY created_at DESC LIMIT 200`);
      const statuses = await this.shipping.statuses(tx, rows.map((r) => r.id));
      return rows.map((r) => ({ ...r, shipmentStatus: statuses.get(r.id) }));
    });
  }

  detail(shopId: string, id: string) {
    return this.db.withShop(shopId, async (tx) => {
      const { rows } = await tx.query(
        `SELECT ${SUMMARY}, customer_phone AS "customerPhone", region, township, address, subtotal_mmk AS "subtotalMmk",
           delivery_fee_mmk AS "deliveryFeeMmk", payment_reject_reason AS "paymentRejectReason"
         FROM orders WHERE id = $1`,
        [id],
      );
      if (!rows[0]) throw new NotFoundException({ code: "ORDER_NOT_FOUND" });
      const items = await this.items(tx, id);
      const shipment = await this.shipping.forOrder(tx, id);
      return {
        ...rows[0],
        items,
        shipment: {
          status: shipment.status,
          trackingToken: shipment.public_token,
          carrier: shipment.carrier,
          etaLow: shipment.eta_low,
          etaHigh: shipment.eta_high,
          events: await this.shipping.history(tx, shipment.id),
        },
      };
    });
  }

  private async items(tx: Tx, orderId: string) {
    const { rows } = await tx.query(
      `SELECT name, unit_price_mmk AS "unitPriceMmk", qty FROM order_items WHERE order_id = $1 ORDER BY name`,
      [orderId],
    );
    return rows;
  }

  applyEvent(shopId: string, orderId: string, event: z.infer<typeof eventSchema>) {
    return this.db.withShop(shopId, async (tx) => {
      const { rows } = await tx.query("SELECT payment_method, payment_status FROM orders WHERE id = $1 FOR UPDATE", [orderId]);
      const order = rows[0];
      if (!order) throw new NotFoundException({ code: "ORDER_NOT_FOUND" });
      const shipment = await this.shipping.forOrder(tx, orderId);

      // Same event sent twice (double tap, retry): nothing more happens.
      if (await this.shipping.hasEvent(tx, event.eventId)) return { status: shipment.status, applied: false };

      if (event.type === "PACKED" && !PAYMENT_CLEARED.has(order.payment_status)) {
        throw new ConflictException({ code: "PAYMENT_NOT_CLEARED" });
      }

      const status = await this.shipping.append(tx, shipment, event, "seller");

      if (status === "cancelled") {
        const { rows: lines } = await tx.query("SELECT product_id, qty FROM order_items WHERE order_id = $1", [orderId]);
        for (const line of lines) await this.catalog.release(tx, line.product_id, line.qty);
      }
      if (status === "delivered" && order.payment_method === "cod") {
        await tx.query("UPDATE orders SET payment_status = 'cod_collected' WHERE id = $1", [orderId]);
      }
      return { status, applied: true };
    });
  }

  /** The tracking page. Holds no customer name, phone or address: the link can be forwarded. */
  async publicView(token: string) {
    const shopId = await this.shopForToken(token);
    return this.db.withShop(shopId, async (tx) => {
      const { rows } = await tx.query(
        `SELECT o.id, o.number, o.subtotal_mmk AS "subtotalMmk", o.delivery_fee_mmk AS "deliveryFeeMmk", o.total_mmk AS "totalMmk",
           o.payment_method AS "paymentMethod", o.payment_status AS "paymentStatus", o.payment_reject_reason AS "paymentRejectReason",
           s.id AS shipment_id, s.status, s.carrier, s.eta_low AS "etaLow", s.eta_high AS "etaHigh",
           shop.name AS "shopName", shop.slug AS "shopSlug", shop.payment_accounts AS accounts
         FROM shipments s JOIN orders o ON o.id = s.order_id JOIN shops shop ON shop.id = s.shop_id
         WHERE s.public_token = $1`,
        [token],
      );
      const { id, shipment_id, accounts, ...view } = rows[0];
      const events = (await this.shipping.history(tx, shipment_id)).map(({ type, occurredAt }) => ({ type, occurredAt }));
      const needsSlip = view.paymentStatus === "awaiting_slip" || view.paymentStatus === "rejected";
      return { ...view, items: await this.items(tx, id), events, paymentAccounts: needsSlip && view.status !== "cancelled" ? accounts : [] };
    });
  }

  async shopForToken(token: string): Promise<string> {
    const { rows } = await this.db.query("SELECT shop_for_tracking_token($1) AS shop_id", [token]);
    if (!rows[0].shop_id) throw new NotFoundException({ code: "ORDER_NOT_FOUND" });
    return rows[0].shop_id;
  }

  async assertNotCancelled(tx: Tx, orderId: string) {
    const { status } = await this.shipping.forOrder(tx, orderId);
    if (status === "cancelled") throw new ConflictException({ code: "ORDER_CANCELLED" });
  }

  async orderIdForToken(tx: Tx, token: string): Promise<string> {
    const { rows } = await tx.query("SELECT order_id FROM shipments WHERE public_token = $1", [token]);
    return rows[0].order_id;
  }
}

@Controller()
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post("shops/:slug/orders")
  place(@Param("slug") slug: string, @Body() body: unknown) {
    return this.orders.place(slug, parse(orderSchema, body));
  }

  @Get("track/:token")
  track(@Param("token") token: string) {
    return this.orders.publicView(token);
  }

  @Get("seller/orders")
  @UseGuards(SessionGuard)
  list(@CurrentSeller() seller: Seller) {
    return this.orders.list(seller.shopId);
  }

  @Get("seller/orders/:id")
  @UseGuards(SessionGuard)
  detail(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string) {
    return this.orders.detail(seller.shopId, id);
  }

  @Post("seller/orders/:id/events")
  @UseGuards(SessionGuard)
  event(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string, @Body() body: unknown) {
    return this.orders.applyEvent(seller.shopId, id, parse(eventSchema, body));
  }
}

@Module({
  imports: [IamModule, CatalogModule, ShippingModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
