import { ConflictException, Injectable, Module } from "@nestjs/common";
import { randomBytes, randomUUID } from "node:crypto";
import type { Tx } from "../db.js";

export type ShipmentStatus = "created" | "packed" | "with_carrier" | "out_for_delivery" | "attempted" | "delivered" | "cancelled";
export type EventType = "PACKED" | "HANDED_TO_CARRIER" | "OUT_FOR_DELIVERY" | "DELIVERY_ATTEMPTED" | "DELIVERED" | "CANCELLED";

/** The state machine: an event not listed for the current status is refused. */
export const TRANSITIONS: Record<ShipmentStatus, Partial<Record<EventType, ShipmentStatus>>> = {
  created: { PACKED: "packed", CANCELLED: "cancelled" },
  packed: { HANDED_TO_CARRIER: "with_carrier", CANCELLED: "cancelled" },
  with_carrier: { OUT_FOR_DELIVERY: "out_for_delivery", DELIVERED: "delivered" },
  out_for_delivery: { DELIVERY_ATTEMPTED: "attempted", DELIVERED: "delivered" },
  attempted: { OUT_FOR_DELIVERY: "out_for_delivery", DELIVERED: "delivered" },
  delivered: {},
  cancelled: {},
};

export type EventInput = {
  eventId: string;
  type: EventType;
  carrier?: string;
  etaLow?: string;
  etaHigh?: string;
  note?: string;
};

@Injectable()
export class ShippingService {
  async create(tx: Tx, shopId: string, orderId: string) {
    const token = randomBytes(24).toString("base64url");
    const { rows } = await tx.query(
      `INSERT INTO shipments (shop_id, order_id, public_token, status) VALUES ($1, $2, $3, 'created') RETURNING id`,
      [shopId, orderId, token],
    );
    await tx.query(
      `INSERT INTO tracking_events (event_id, shop_id, shipment_id, type, seq, actor) VALUES ($1, $2, $3, 'CREATED', 1, 'system')`,
      [randomUUID(), shopId, rows[0].id],
    );
    return token;
  }

  /** Locks the shipment row, so events on one parcel apply one at a time. */
  async forOrder(tx: Tx, orderId: string) {
    const { rows } = await tx.query("SELECT * FROM shipments WHERE order_id = $1 FOR UPDATE", [orderId]);
    return rows[0];
  }

  async hasEvent(tx: Tx, eventId: string) {
    return (await tx.query("SELECT 1 FROM tracking_events WHERE event_id = $1", [eventId])).rowCount! > 0;
  }

  async append(tx: Tx, shipment: any, event: EventInput, actor: string): Promise<ShipmentStatus> {
    const next = TRANSITIONS[shipment.status as ShipmentStatus]?.[event.type];
    if (!next) throw new ConflictException({ code: "ILLEGAL_TRANSITION", from: shipment.status, type: event.type });

    const { carrier, etaLow, etaHigh, note } = event;
    await tx.query(
      `INSERT INTO tracking_events (event_id, shop_id, shipment_id, type, seq, actor, payload)
       VALUES ($1, $2, $3, $4,
         (SELECT COALESCE(MAX(seq), 0) + 1 FROM tracking_events WHERE shipment_id = $3),
         $5, $6)`,
      [event.eventId, shipment.shop_id, shipment.id, event.type, actor, JSON.stringify({ carrier, etaLow, etaHigh, note })],
    );
    await tx.query(
      `UPDATE shipments SET status = $2, carrier = COALESCE($3, carrier), eta_low = COALESCE($4, eta_low), eta_high = COALESCE($5, eta_high) WHERE id = $1`,
      [shipment.id, next, carrier ?? null, etaLow ?? null, etaHigh ?? null],
    );
    return next;
  }

  async history(tx: Tx, shipmentId: string) {
    const { rows } = await tx.query(
      `SELECT type, occurred_at AS "occurredAt", payload FROM tracking_events WHERE shipment_id = $1 ORDER BY seq`,
      [shipmentId],
    );
    return rows;
  }

  async statuses(tx: Tx, orderIds: string[]) {
    const { rows } = await tx.query("SELECT order_id, status FROM shipments WHERE order_id = ANY($1)", [orderIds]);
    return new Map<string, ShipmentStatus>(rows.map((r) => [r.order_id, r.status]));
  }
}

@Module({ providers: [ShippingService], exports: [ShippingService] })
export class ShippingModule {}
