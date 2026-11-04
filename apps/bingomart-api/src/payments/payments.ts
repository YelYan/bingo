import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Module,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { createHash } from "node:crypto";
import { z } from "zod";
import { Db, type Tx } from "../db.js";
import { CurrentSeller, IamModule, SessionGuard, type Seller } from "../iam/iam.js";
import { OrdersModule, OrdersService } from "../orders/orders.js";
import { parse } from "../validation.js";

const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;

/** Reads the file's first bytes, because a browser-sent type or name can say anything. */
export function sniffImage(data: Buffer): string | null {
  if (data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return "image/jpeg";
  if (data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (data.subarray(0, 4).toString("latin1") === "RIFF" && data.subarray(8, 12).toString("latin1") === "WEBP") return "image/webp";
  return null;
}

const rejectSchema = z.object({ reason: z.string().trim().min(1).max(300) });

/**
 * Manual transfer with a receipt photo. The picture cannot prove money arrived, so
 * this only flags a repeated image; the seller decides from their own wallet record.
 */
@Injectable()
export class PaymentsService {
  constructor(
    private readonly db: Db,
    private readonly orders: OrdersService,
  ) {}

  private async lockOrder(tx: Tx, orderId: string) {
    const { rows } = await tx.query("SELECT id, payment_status FROM orders WHERE id = $1 FOR UPDATE", [orderId]);
    if (!rows[0]) throw new NotFoundException({ code: "ORDER_NOT_FOUND" });
    return rows[0] as { id: string; payment_status: string };
  }

  async upload(token: string, file: Express.Multer.File | undefined) {
    if (!file) throw new BadRequestException({ code: "NO_FILE" });
    const contentType = sniffImage(file.buffer);
    if (!contentType) throw new BadRequestException({ code: "NOT_AN_IMAGE" });

    const shopId = await this.orders.shopForToken(token);
    return this.db.withShop(shopId, async (tx) => {
      const orderId = await this.orders.orderIdForToken(tx, token);
      const order = await this.lockOrder(tx, orderId);
      await this.orders.assertNotCancelled(tx, orderId);
      if (order.payment_status !== "awaiting_slip" && order.payment_status !== "rejected") {
        throw new ConflictException({ code: "SLIP_NOT_EXPECTED" });
      }

      const sha256 = createHash("sha256").update(file.buffer).digest("hex");
      const { rows } = await tx.query(
        "SELECT order_id FROM payment_receipts WHERE sha256 = $1 AND order_id <> $2 LIMIT 1",
        [sha256, orderId],
      );
      await tx.query(
        `INSERT INTO payment_receipts (shop_id, order_id, image, content_type, sha256, duplicate_of_order_id)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [shopId, orderId, file.buffer, contentType, sha256, rows[0]?.order_id ?? null],
      );
      await tx.query("UPDATE orders SET payment_status = 'in_review', payment_reject_reason = NULL WHERE id = $1", [orderId]);
      return { paymentStatus: "in_review" };
    });
  }

  latest(shopId: string, orderId: string) {
    return this.db.withShop(shopId, async (tx) => {
      const { rows } = await tx.query(
        `SELECT r.image, r.content_type, r.created_at, o.number AS duplicate_of_number
         FROM payment_receipts r LEFT JOIN orders o ON o.id = r.duplicate_of_order_id
         WHERE r.order_id = $1 ORDER BY r.created_at DESC LIMIT 1`,
        [orderId],
      );
      return rows[0];
    });
  }

  /** Checks the state again inside the transaction: the order may have changed since the page loaded. */
  decide(shopId: string, orderId: string, decision: { approve: true } | { approve: false; reason: string }) {
    return this.db.withShop(shopId, async (tx) => {
      const order = await this.lockOrder(tx, orderId);
      await this.orders.assertNotCancelled(tx, orderId);
      if (order.payment_status !== "in_review") throw new ConflictException({ code: "NOTHING_TO_REVIEW" });
      const status = decision.approve ? "approved" : "rejected";
      await tx.query("UPDATE orders SET payment_status = $2, payment_reject_reason = $3 WHERE id = $1", [
        orderId,
        status,
        decision.approve ? null : decision.reason,
      ]);
      return { paymentStatus: status };
    });
  }
}

@Controller()
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post("track/:token/receipt")
  @UseInterceptors(FileInterceptor("receipt", { limits: { fileSize: MAX_RECEIPT_BYTES, files: 1 } }))
  upload(@Param("token") token: string, @UploadedFile() file?: Express.Multer.File) {
    return this.payments.upload(token, file);
  }

  @Get("seller/orders/:id/receipt")
  @UseGuards(SessionGuard)
  async receipt(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string, @Res() res: Response) {
    const receipt = await this.payments.latest(seller.shopId, id);
    if (!receipt) throw new NotFoundException({ code: "RECEIPT_NOT_FOUND" });
    res
      .set({
        "Content-Type": receipt.content_type,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
        // Tells the seller this same picture was already used on another order.
        "X-Duplicate-Of-Order": receipt.duplicate_of_number ?? "",
      })
      .send(receipt.image);
  }

  @Get("seller/orders/:id/receipt/info")
  @UseGuards(SessionGuard)
  async info(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string) {
    const receipt = await this.payments.latest(seller.shopId, id);
    return receipt ? { uploadedAt: receipt.created_at, duplicateOfOrderNumber: receipt.duplicate_of_number } : null;
  }

  @Post("seller/orders/:id/payment/approve")
  @HttpCode(200)
  @UseGuards(SessionGuard)
  approve(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string) {
    return this.payments.decide(seller.shopId, id, { approve: true });
  }

  @Post("seller/orders/:id/payment/reject")
  @HttpCode(200)
  @UseGuards(SessionGuard)
  reject(@CurrentSeller() seller: Seller, @Param("id", ParseUUIDPipe) id: string, @Body() body: unknown) {
    return this.payments.decide(seller.shopId, id, { approve: false, reason: parse(rejectSchema, body).reason });
  }
}

@Module({ imports: [IamModule, OrdersModule], controllers: [PaymentsController], providers: [PaymentsService] })
export class PaymentsModule {}
