import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, before, test } from "node:test";
import pg from "pg";
import type { INestApplication } from "@nestjs/common";
import { createApp } from "../main.js";

let app: INestApplication;
let base: string;
let shopCounter = 0;

before(async () => {
  app = await createApp();
  await app.listen(0, "127.0.0.1");
  base = (await app.getUrl()).replace("[::1]", "127.0.0.1");
});
after(() => app.close());

async function call(path: string, options: { method?: string; body?: unknown; token?: string; form?: FormData } = {}) {
  const res = await fetch(base + path, {
    method: options.method ?? (options.body || options.form ? "POST" : "GET"),
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.form ?? (options.body ? JSON.stringify(options.body) : undefined),
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, json, text };
}

async function newShop(deliveryFeeMmk = 2000) {
  const n = ++shopCounter;
  const slug = `shop-${n}-${Date.now()}`;
  const phone = `09${String(100000000 + n * 7 + (Date.now() % 1000000))}`.slice(0, 11);
  const res = await call("/auth/signup", {
    body: {
      shopName: `Shop ${n}`,
      slug,
      phone,
      password: "correct-horse",
      deliveryFeeMmk,
      paymentAccounts: [{ provider: "KBZPay", name: "Daw Aye", number: "09111222333" }],
    },
  });
  assert.equal(res.status, 201, res.text);
  return { slug, phone, token: res.json.token as string };
}

async function newProduct(token: string, stock = 5, priceMmk = 28000, costMmk = 15000) {
  const res = await call("/seller/products", { token, body: { name: "ရှပ်အင်္ကျီ", priceMmk, costMmk, stock } });
  assert.equal(res.status, 201, res.text);
  return res.json;
}

const customer = { name: "Ma Hla", phone: "၀၉ ၄၅၅ ၆၆၇ ၇၈၈", region: "ရန်ကုန်", township: "ကမာရွတ်", address: "No 5, 3rd ward, near the pagoda" };

function placeOrder(slug: string, productId: string, qty = 1, paymentMethod = "cod", idempotencyKey: string = randomUUID()) {
  return call(`/shops/${slug}/orders`, { body: { idempotencyKey, items: [{ productId, qty }], customer, paymentMethod } });
}

const firstOrderId = async (token: string) => (await call("/seller/orders", { token })).json[0].id as string;
const sendEvent = (token: string, orderId: string, type: string, extra: object = {}) =>
  call(`/seller/orders/${orderId}/events`, { token, body: { eventId: randomUUID(), type, ...extra } });

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]);
function receiptForm(bytes: Buffer = PNG) {
  const form = new FormData();
  form.append("receipt", new Blob([new Uint8Array(bytes)]), "slip.png");
  return form;
}

test("the whole cash-on-delivery loop works and totals come from the database", async () => {
  const { slug, token } = await newShop(2000);
  const product = await newProduct(token, 5, 28000);

  const placed = await call(`/shops/${slug}/orders`, {
    body: { idempotencyKey: randomUUID(), items: [{ productId: product.id, qty: 2, priceMmk: 1 }], customer, paymentMethod: "cod" },
  });
  assert.equal(placed.status, 201, placed.text);
  assert.equal(placed.json.number, 1001);

  const orderId = await firstOrderId(token);
  const detail = (await call(`/seller/orders/${orderId}`, { token })).json;
  assert.equal(detail.totalMmk, 58000, "a price sent by the client must be ignored");
  assert.equal(detail.customerPhone, "09455667788", "Burmese digits are normalized");

  for (const type of ["PACKED", "HANDED_TO_CARRIER", "OUT_FOR_DELIVERY", "DELIVERED"]) {
    const extra = type === "HANDED_TO_CARRIER" ? { carrier: "Royal Express", etaLow: "2026-11-06", etaHigh: "2026-11-08" } : {};
    const res = await sendEvent(token, orderId, type, extra);
    assert.equal(res.status, 201, res.text);
  }

  const view = (await call(`/track/${placed.json.trackingToken}`)).json;
  assert.equal(view.status, "delivered");
  assert.equal(view.paymentStatus, "cod_collected");
  assert.equal(view.carrier, "Royal Express");
  assert.equal(view.etaLow, "2026-11-06", "a date must not shift with the server's time zone");
  assert.equal(view.etaHigh, "2026-11-08");
  assert.deepEqual(view.events.map((e: any) => e.type), ["CREATED", "PACKED", "HANDED_TO_CARRIER", "OUT_FOR_DELIVERY", "DELIVERED"]);
});

test("the transfer loop: no packing until the seller approves a receipt", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token);
  const { json: placed } = await placeOrder(slug, product.id, 1, "transfer");
  const orderId = await firstOrderId(token);

  const before = (await call(`/track/${placed.trackingToken}`)).json;
  assert.equal(before.paymentStatus, "awaiting_slip");
  assert.equal(before.paymentAccounts[0].number, "09111222333");

  assert.equal((await sendEvent(token, orderId, "PACKED")).json.code, "PAYMENT_NOT_CLEARED");
  assert.equal((await call(`/seller/orders/${orderId}/payment/approve`, { token, method: "POST" })).json.code, "NOTHING_TO_REVIEW");

  assert.equal((await call(`/track/${placed.trackingToken}/receipt`, { form: receiptForm() })).status, 201);
  const reject = await call(`/seller/orders/${orderId}/payment/reject`, { token, body: { reason: "Amount is wrong" } });
  assert.equal(reject.json.paymentStatus, "rejected");
  assert.equal((await call(`/track/${placed.trackingToken}`)).json.paymentRejectReason, "Amount is wrong");
  assert.equal((await sendEvent(token, orderId, "PACKED")).json.code, "PAYMENT_NOT_CLEARED");

  assert.equal((await call(`/track/${placed.trackingToken}/receipt`, { form: receiptForm() })).status, 201);
  assert.equal((await call(`/track/${placed.trackingToken}/receipt`, { form: receiptForm() })).json.code, "SLIP_NOT_EXPECTED");
  assert.equal((await call(`/seller/orders/${orderId}/payment/approve`, { token, method: "POST" })).json.paymentStatus, "approved");
  assert.equal((await sendEvent(token, orderId, "PACKED")).status, 201);
});

test("a receipt must be a real image, and only the seller can see it", async () => {
  const { slug, token } = await newShop();
  const other = await newShop();
  const product = await newProduct(token);
  const { json: placed } = await placeOrder(slug, product.id, 1, "transfer");
  const orderId = await firstOrderId(token);

  const fake = await call(`/track/${placed.trackingToken}/receipt`, { form: receiptForm(Buffer.from("<script>alert(1)</script>")) });
  assert.equal(fake.json.code, "NOT_AN_IMAGE");
  assert.equal((await call(`/track/${placed.trackingToken}/receipt`, { form: receiptForm() })).status, 201);

  assert.equal((await call(`/seller/orders/${orderId}/receipt`)).status, 401);
  assert.equal((await call(`/seller/orders/${orderId}/receipt`, { token: other.token })).status, 404);
  const mine = await call(`/seller/orders/${orderId}/receipt`, { token });
  assert.equal(mine.status, 200);
});

test("the same receipt picture on a second order is flagged", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token);
  const first = (await placeOrder(slug, product.id, 1, "transfer")).json;
  await call(`/track/${first.trackingToken}/receipt`, { form: receiptForm() });
  const second = (await placeOrder(slug, product.id, 1, "transfer")).json;
  await call(`/track/${second.trackingToken}/receipt`, { form: receiptForm() });

  const orders = (await call("/seller/orders", { token })).json;
  const info = (await call(`/seller/orders/${orders[0].id}/receipt/info`, { token })).json;
  assert.equal(info.duplicateOfOrderNumber, first.number);
});

test("a repeated checkout request does not create a second order or take more stock", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token, 5);
  const key = randomUUID();
  const [a, b, c] = await Promise.all([1, 2, 3].map(() => placeOrder(slug, product.id, 1, "cod", key)));
  assert.equal(a.json.number, b.json.number);
  assert.equal(b.json.number, c.json.number);
  assert.equal((await call("/seller/orders", { token })).json.length, 1);
  assert.equal((await call("/seller/products", { token })).json[0].stock, 4);
});

test("two shoppers cannot buy the last item, and a failed order takes nothing", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token, 1);
  const results = await Promise.all([placeOrder(slug, product.id), placeOrder(slug, product.id), placeOrder(slug, product.id)]);
  assert.deepEqual(results.map((r) => r.status).sort(), [201, 409, 409]);
  assert.equal((await call("/seller/products", { token })).json[0].stock, 0);

  const plenty = await newProduct(token, 3);
  const mixed = await call(`/shops/${slug}/orders`, {
    body: {
      idempotencyKey: randomUUID(),
      items: [{ productId: plenty.id, qty: 1 }, { productId: product.id, qty: 1 }],
      customer,
      paymentMethod: "cod",
    },
  });
  assert.equal(mixed.json.code, "OUT_OF_STOCK");
  const plentyNow = (await call("/seller/products", { token })).json.find((p: any) => p.id === plenty.id);
  assert.equal(plentyNow.stock, 3, "the whole order rolls back");
});

test("a repeated event is a no-op, and illegal moves are refused", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token, 5);
  await placeOrder(slug, product.id, 2);
  const orderId = await firstOrderId(token);

  assert.equal((await sendEvent(token, orderId, "DELIVERED")).json.code, "ILLEGAL_TRANSITION");

  const eventId = randomUUID();
  const send = () => call(`/seller/orders/${orderId}/events`, { token, body: { eventId, type: "CANCELLED" } });
  assert.equal((await send()).json.applied, true);
  assert.equal((await send()).json.applied, false);
  assert.equal((await call("/seller/products", { token })).json[0].stock, 5, "stock returns exactly once");
  assert.equal((await sendEvent(token, orderId, "PACKED")).json.code, "ILLEGAL_TRANSITION");
});

test("shoppers never see cost price, and the tracking link holds no personal data", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token, 5, 28000, 15000);
  const store = await call(`/shops/${slug}`);
  assert.equal(store.json.products[0].id, product.id);
  assert.ok(!store.text.includes("15000"));
  assert.ok(!/cost/i.test(store.text));

  const { json: placed } = await placeOrder(slug, product.id, 1, "transfer");
  const view = await call(`/track/${placed.trackingToken}`);
  assert.equal(view.status, 200);
  for (const secret of ["Ma Hla", "09455667788", "pagoda", "15000"]) {
    assert.ok(!view.text.includes(secret), `leaked ${secret}`);
  }
  assert.equal((await call("/track/not-a-real-token")).status, 404);
});

test("one shop cannot reach another shop's data", async () => {
  const a = await newShop();
  const b = await newShop();
  const product = await newProduct(a.token);
  await placeOrder(a.slug, product.id);
  const orderId = await firstOrderId(a.token);

  assert.equal((await call(`/seller/orders/${orderId}`, { token: b.token })).status, 404);
  assert.equal((await sendEvent(b.token, orderId, "PACKED")).status, 404);
  assert.equal((await call(`/seller/products/${product.id}`, { token: b.token, method: "PATCH", body: { stock: 0 } })).status, 404);
  assert.deepEqual((await call("/seller/orders", { token: b.token })).json, []);
  assert.equal((await call("/seller/orders")).status, 401);

  const sold = await call(`/shops/${b.slug}/orders`, {
    body: { idempotencyKey: randomUUID(), items: [{ productId: product.id, qty: 1 }], customer, paymentMethod: "cod" },
  });
  assert.equal(sold.json.code, "OUT_OF_STOCK", "another shop's product cannot be ordered through this shop");
});

test("the database itself enforces isolation and append-only history", async () => {
  const { slug, token } = await newShop();
  const product = await newProduct(token);
  await placeOrder(slug, product.id);

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    assert.equal((await client.query("SELECT * FROM orders")).rowCount, 0, "no shop set means no rows");
    assert.equal((await client.query("SELECT * FROM products")).rowCount, 0);
    await assert.rejects(client.query("UPDATE tracking_events SET type = 'X'"), /permission denied/);
    await assert.rejects(client.query("DELETE FROM tracking_events"), /permission denied/);
    await assert.rejects(client.query("DELETE FROM orders"), /permission denied/);
    const { rows } = await client.query("SELECT rolsuper, rolbypassrls FROM pg_roles WHERE rolname = current_user");
    assert.deepEqual(rows[0], { rolsuper: false, rolbypassrls: false });
  } finally {
    await client.end();
  }
});

test("sign-in works, and repeated wrong passwords lock the account", async () => {
  const { phone } = await newShop();
  assert.equal((await call("/auth/signup", { body: { shopName: "Copy", slug: `copy-${Date.now()}`, phone, password: "correct-horse" } })).json.code, "PHONE_TAKEN");

  const ok = await call("/auth/login", { body: { phone, password: "correct-horse" } });
  assert.equal(ok.status, 200);
  assert.equal((await call("/seller/shop", { token: ok.json.token })).status, 200);

  for (let i = 0; i < 5; i++) {
    assert.equal((await call("/auth/login", { body: { phone, password: "wrong-password" } })).json.code, "BAD_LOGIN");
  }
  assert.equal((await call("/auth/login", { body: { phone, password: "correct-horse" } })).json.code, "LOCKED");
  assert.equal((await call("/auth/login", { body: { phone: "09999999999", password: "x" } })).json.code, "BAD_LOGIN");
});
