/**
 * A stand-in for the BingoMart API, used whenever API_URL is not set. It answers
 * the same paths with the same shapes as apps/bingomart-api, so connecting the
 * real backend later means setting API_URL and changing nothing else.
 */
import { randomUUID } from "node:crypto";
import { DEMO_SLUG, mock, type MockOrder } from "./store";

type Result = { ok: true; data: any } | { ok: false; status: number; code: string };
const ok = (data: any): Result => ({ ok: true, data });
const fail = (status: number, code: string): Result => ({ ok: false, status, code });

const TRANSITIONS: Record<string, Record<string, string>> = {
  created: { PACKED: "packed", CANCELLED: "cancelled" },
  packed: { HANDED_TO_CARRIER: "with_carrier", CANCELLED: "cancelled" },
  with_carrier: { OUT_FOR_DELIVERY: "out_for_delivery", DELIVERED: "delivered" },
  out_for_delivery: { DELIVERY_ATTEMPTED: "attempted", DELIVERED: "delivered" },
  attempted: { OUT_FOR_DELIVERY: "out_for_delivery", DELIVERED: "delivered" },
};
const CLEARED = new Set(["cod_due", "approved"]);

const phoneOf = (raw: string) => {
  const digits = raw.replace(/[၀-၉]/g, (d) => String(d.charCodeAt(0) - 0x1040)).replace(/[\s()-]/g, "").replace(/^\+?959/, "09");
  return /^09\d{7,9}$/.test(digits) ? digits : null;
};

const summary = (o: MockOrder) => ({
  id: o.id,
  number: o.number,
  customerName: o.customerName,
  totalMmk: o.totalMmk,
  paymentMethod: o.paymentMethod,
  paymentStatus: o.paymentStatus,
  createdAt: o.createdAt,
  shipmentStatus: o.shipment.status,
});

const orderById = (id: string) => mock.orders.find((o) => o.id === id);
const byToken = (token: string) => mock.orders.find((o) => o.shipment.token === token);

function detail(o: MockOrder) {
  const { shipment } = o;
  return {
    ...summary(o),
    customerPhone: o.customerPhone,
    region: o.region,
    township: o.township,
    address: o.address,
    subtotalMmk: o.subtotalMmk,
    deliveryFeeMmk: o.deliveryFeeMmk,
    paymentRejectReason: o.paymentRejectReason,
    items: o.items.map(({ name, unitPriceMmk, qty }) => ({ name, unitPriceMmk, qty })),
    shipment: {
      status: shipment.status,
      trackingToken: shipment.token,
      carrier: shipment.carrier,
      etaLow: shipment.etaLow,
      etaHigh: shipment.etaHigh,
      events: shipment.events,
    },
  };
}

function publicView(o: MockOrder) {
  const needsSlip = o.paymentStatus === "awaiting_slip" || o.paymentStatus === "rejected";
  return {
    number: o.number,
    subtotalMmk: o.subtotalMmk,
    deliveryFeeMmk: o.deliveryFeeMmk,
    totalMmk: o.totalMmk,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    paymentRejectReason: o.paymentRejectReason,
    status: o.shipment.status,
    carrier: o.shipment.carrier,
    etaLow: o.shipment.etaLow,
    etaHigh: o.shipment.etaHigh,
    shopName: mock.shop.name,
    shopSlug: mock.shop.slug,
    items: o.items.map(({ name, unitPriceMmk, qty }) => ({ name, unitPriceMmk, qty })),
    events: o.shipment.events.map(({ type, occurredAt }) => ({ type, occurredAt })),
    paymentAccounts: needsSlip && o.shipment.status !== "cancelled" ? mock.shop.paymentAccounts : [],
  };
}

function restock(o: MockOrder) {
  for (const line of o.items) {
    const product = mock.products.find((p) => p.id === line.productId);
    if (product) product.stock += line.qty;
  }
}

function placeOrder(body: any): Result {
  const repeat = mock.keys.get(body.idempotencyKey);
  if (repeat) {
    const existing = orderById(repeat)!;
    return ok({ number: existing.number, trackingToken: existing.shipment.token });
  }
  const phone = phoneOf(String(body.customer?.phone ?? ""));
  const c = body.customer ?? {};
  if (!phone || !c.name || !c.township || !c.address || !Array.isArray(body.items) || body.items.length === 0) return fail(400, "INVALID_INPUT");

  const wanted = new Map<string, number>();
  for (const { productId, qty } of body.items) wanted.set(productId, (wanted.get(productId) ?? 0) + Number(qty));
  for (const [id, qty] of wanted) {
    const p = mock.products.find((x) => x.id === id);
    if (!p || !p.active || p.stock < qty) return fail(409, "OUT_OF_STOCK");
  }
  const items = [...wanted].map(([id, qty]) => {
    const p = mock.products.find((x) => x.id === id)!;
    p.stock -= qty;
    return { productId: id, name: p.name, unitPriceMmk: p.priceMmk, qty };
  });
  const subtotalMmk = items.reduce((s, i) => s + i.unitPriceMmk * i.qty, 0);
  const cod = body.paymentMethod === "cod";
  const order: MockOrder = {
    id: randomUUID(),
    number: mock.shop.nextOrderNumber++,
    customerName: c.name,
    customerPhone: phone,
    region: c.region,
    township: c.township,
    address: c.address,
    items,
    subtotalMmk,
    deliveryFeeMmk: mock.shop.deliveryFeeMmk,
    totalMmk: subtotalMmk + mock.shop.deliveryFeeMmk,
    paymentMethod: cod ? "cod" : "transfer",
    paymentStatus: cod ? "cod_due" : "awaiting_slip",
    paymentRejectReason: null,
    createdAt: new Date().toISOString(),
    receipt: null,
    shipment: { status: "created", token: randomUUID().replaceAll("-", ""), carrier: null, etaLow: null, etaHigh: null, events: [{ type: "CREATED", occurredAt: new Date().toISOString() }] },
    seenEventIds: new Set(),
  };
  mock.orders.unshift(order);
  mock.keys.set(body.idempotencyKey, order.id);
  return ok({ number: order.number, trackingToken: order.shipment.token });
}

function applyEvent(o: MockOrder, body: any): Result {
  if (o.seenEventIds.has(body.eventId)) return ok({ status: o.shipment.status, applied: false });
  const next = TRANSITIONS[o.shipment.status]?.[body.type];
  if (!next) return fail(409, "ILLEGAL_TRANSITION");
  if (body.type === "PACKED" && !CLEARED.has(o.paymentStatus)) return fail(409, "PAYMENT_NOT_CLEARED");
  o.seenEventIds.add(body.eventId);
  o.shipment.status = next;
  if (body.carrier) o.shipment.carrier = body.carrier;
  if (body.etaLow) o.shipment.etaLow = body.etaLow;
  if (body.etaHigh) o.shipment.etaHigh = body.etaHigh;
  o.shipment.events.push({ type: body.type, occurredAt: new Date().toISOString() });
  if (next === "cancelled") restock(o);
  if (next === "delivered" && o.paymentMethod === "cod") o.paymentStatus = "cod_collected";
  return ok({ status: next, applied: true });
}

export function mockApi(path: string, options: { method?: string; body?: any; form?: FormData }): Result {
  const method = options.method ?? (options.body || options.form ? "POST" : "GET");
  const body = options.body;
  let m: RegExpMatchArray | null;

  if (path === "/auth/signup" || path === "/auth/login") return ok({ token: "demo-session" });

  if ((m = path.match(/^\/shops\/([^/]+)$/))) {
    if (m[1] !== DEMO_SLUG) return fail(404, "SHOP_NOT_FOUND");
    const { id, slug, name, deliveryFeeMmk } = mock.shop;
    return ok({
      shop: { id, slug, name, deliveryFeeMmk },
      products: mock.products.filter((p) => p.active).map((p) => ({ id: p.id, name: p.name, priceMmk: p.priceMmk, inStock: p.stock > 0, variants: p.variants })),
    });
  }
  if ((m = path.match(/^\/shops\/([^/]+)\/orders$/)) && method === "POST") return m[1] === DEMO_SLUG ? placeOrder(body) : fail(404, "SHOP_NOT_FOUND");

  if ((m = path.match(/^\/track\/([^/]+)$/))) {
    const o = byToken(m[1]);
    return o ? ok(publicView(o)) : fail(404, "ORDER_NOT_FOUND");
  }
  if ((m = path.match(/^\/track\/([^/]+)\/receipt$/))) {
    const o = byToken(m[1]);
    if (!o) return fail(404, "ORDER_NOT_FOUND");
    if (o.shipment.status === "cancelled") return fail(409, "ORDER_CANCELLED");
    if (o.paymentStatus !== "awaiting_slip" && o.paymentStatus !== "rejected") return fail(409, "SLIP_NOT_EXPECTED");
    if (!options.form?.get("receipt")) return fail(400, "NO_FILE");
    o.receipt = { uploadedAt: new Date().toISOString(), duplicateOfOrderNumber: null };
    o.paymentStatus = "in_review";
    o.paymentRejectReason = null;
    return ok({ paymentStatus: "in_review" });
  }

  if (path === "/seller/shop") {
    if (method === "PATCH") {
      mock.shop.name = body.shopName;
      mock.shop.deliveryFeeMmk = body.deliveryFeeMmk;
      mock.shop.paymentAccounts = body.paymentAccounts;
    }
    const { id, slug, name, deliveryFeeMmk, paymentAccounts } = mock.shop;
    return ok({ id, slug, name, deliveryFeeMmk, paymentAccounts });
  }

  if (path === "/seller/products") {
    if (method === "POST") {
      if (!body.name || !(body.priceMmk > 0)) return fail(400, "INVALID_INPUT");
      const p = { id: randomUUID(), name: body.name, priceMmk: body.priceMmk, costMmk: body.costMmk ?? 0, stock: body.stock ?? 0, active: true };
      mock.products.unshift(p);
      return ok(p);
    }
    return ok(mock.products);
  }
  if ((m = path.match(/^\/seller\/products\/([^/]+)$/))) {
    const p = mock.products.find((x) => x.id === m![1]);
    if (!p) return fail(404, "PRODUCT_NOT_FOUND");
    for (const key of ["name", "priceMmk", "costMmk", "stock", "active"] as const) if (body[key] !== undefined && body[key] !== null) (p as any)[key] = body[key];
    return ok(p);
  }

  if (path === "/seller/orders") return ok(mock.orders.map(summary));
  if ((m = path.match(/^\/seller\/orders\/([^/]+)$/))) {
    const o = orderById(m[1]);
    return o ? ok(detail(o)) : fail(404, "ORDER_NOT_FOUND");
  }
  if ((m = path.match(/^\/seller\/orders\/([^/]+)\/(events|payment\/approve|payment\/reject|receipt\/info)$/))) {
    const o = orderById(m[1]);
    if (!o) return fail(404, "ORDER_NOT_FOUND");
    if (m[2] === "receipt/info") return ok(o.receipt);
    if (m[2] === "events") return applyEvent(o, body);
    if (o.paymentStatus !== "in_review") return fail(409, "NOTHING_TO_REVIEW");
    if (m[2] === "payment/approve") o.paymentStatus = "approved";
    else {
      o.paymentStatus = "rejected";
      o.paymentRejectReason = body.reason;
    }
    return ok({ paymentStatus: o.paymentStatus });
  }

  return fail(404, "UNKNOWN");
}

/** A drawn stand-in for a receipt photo. */
export const RECEIPT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0 0 480 640"><rect width="480" height="640" fill="#f6f3ec"/><rect x="24" y="24" width="432" height="592" rx="20" fill="#fff" stroke="#e3ded2"/><text x="240" y="110" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#0e3d35">KBZPay</text><text x="240" y="180" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#5c645f">Transfer successful (example slip)</text><text x="240" y="300" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="700" fill="#1e2420">75,000 MMK</text><text x="240" y="380" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#5c645f">Demo image, not a real receipt</text></svg>`;
