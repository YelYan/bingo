/**
 * In-memory demo data for the shop, shared by the pages that already speak to
 * the real API. It lives on globalThis so dev-server reloads keep it, and it
 * resets whenever the server restarts: this is a demo, not storage.
 */
import { randomUUID } from "node:crypto";

export type Variants = { sizes?: string[]; colors?: string[] };
export type MockProduct = { id: string; name: string; priceMmk: number; costMmk: number; stock: number; active: boolean; variants?: Variants };
export type MockEvent = { type: string; occurredAt: string; payload?: Record<string, string | undefined> };
export type MockOrder = {
  id: string;
  number: number;
  customerName: string;
  customerPhone: string;
  region: string;
  township: string;
  address: string;
  items: { productId: string; name: string; unitPriceMmk: number; qty: number }[];
  subtotalMmk: number;
  deliveryFeeMmk: number;
  totalMmk: number;
  paymentMethod: "cod" | "transfer";
  paymentStatus: string;
  paymentRejectReason: string | null;
  createdAt: string;
  receipt: { uploadedAt: string; duplicateOfOrderNumber: number | null } | null;
  shipment: { status: string; token: string; carrier: string | null; etaLow: string | null; etaHigh: string | null; events: MockEvent[] };
  seenEventIds: Set<string>;
};
export type MockShop = {
  id: string;
  slug: string;
  name: string;
  deliveryFeeMmk: number;
  paymentAccounts: { provider: string; name: string; number: string }[];
  nextOrderNumber: number;
};
export type MockStore = { shop: MockShop; products: MockProduct[]; orders: MockOrder[]; keys: Map<string, string> };

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();
const dayAhead = (d: number) => new Date(Date.now() + d * 86_400_000).toISOString().slice(0, 10);

function seed(): MockStore {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["အဖြူ", "အနက်", "အညို"];
  const products: MockProduct[] = [
    ["ရှပ်အင်္ကျီ အဖြူ", 28000, 15000, 12, { sizes }],
    ["ပိုးချည် လုံချည်", 45000, 30000, 2, { colors: ["အပြာ", "အစိမ်း", "အနီ"] }],
    ["ထမီ ပန်းနု", 52000, 34000, 4, { sizes: ["S", "M", "L"] }],
    ["ဘောင်းဘီရှည်", 38000, 22000, 9, { sizes, colors: ["အနက်", "ခါကီ"] }],
    ["လက်ဆွဲအိတ်", 35000, 20000, 6, { colors }],
    ["ဦးထုပ်", 12000, 6000, 20, undefined],
    ["ပုဝါ ပန်းထိုး", 18500, 9000, 0, { colors: ["ပန်းရောင်", "အဝါ"] }],
    ["ဖိနပ်", 24000, 14000, 7, { sizes: ["38", "39", "40", "41", "42"] }],
  ].map(([name, priceMmk, costMmk, stock, variants], i) => ({
    id: `p${i + 1}`,
    name: name as string,
    priceMmk: priceMmk as number,
    costMmk: costMmk as number,
    stock: stock as number,
    active: true,
    variants: variants as Variants | undefined,
  }));

  const byName = (name: string) => products.find((p) => p.name === name)!;
  const base = [
    // number, customer, phone, items, method, payment, shipment, minutes ago
    [1048, "ဒေါ်သီတာ", "09420111048", [["ရှပ်အင်္ကျီ အဖြူ", 1], ["ဦးထုပ်", 1]], "transfer", "approved", "out_for_delivery", 35],
    [1047, "ကိုအောင်မင်း", "09770000123", [["ရှပ်အင်္ကျီ အဖြူ", 2], ["ထမီ ပန်းနု", 1], ["ပုဝါ ပန်းထိုး", 1]], "transfer", "in_review", "created", 80],
    [1046, "မမြတ်နိုး", "09450222046", [["ပိုးချည် လုံချည်", 1], ["ဦးထုပ်", 1]], "cod", "cod_due", "created", 140],
    [1045, "ကိုဇေယျာ", "09250333045", [["ဘောင်းဘီရှည်", 1]], "transfer", "approved", "delivered", 1500],
    [1043, "ဒေါ်ခင်မာ", "09790444043", [["လက်ဆွဲအိတ်", 2], ["ဖိနပ်", 1]], "transfer", "awaiting_slip", "created", 2400],
  ] as const;

  const flow = ["created", "packed", "with_carrier", "out_for_delivery", "delivered"];
  const labelOf: Record<string, string> = { created: "CREATED", packed: "PACKED", with_carrier: "HANDED_TO_CARRIER", out_for_delivery: "OUT_FOR_DELIVERY", delivered: "DELIVERED" };

  const orders: MockOrder[] = base.map(([number, customerName, customerPhone, lines, method, payment, status, age]) => {
    const items = lines.map(([name, qty]) => ({ productId: byName(name).id, name, unitPriceMmk: byName(name).priceMmk, qty }));
    const subtotalMmk = items.reduce((s, i) => s + i.unitPriceMmk * i.qty, 0);
    const reached = flow.slice(0, flow.indexOf(status) + 1);
    return {
      id: randomUUID(),
      number,
      customerName,
      customerPhone,
      region: "ရန်ကုန်",
      township: "ကမာရွတ်",
      address: "၅ လမ်း၊ (၃) ရပ်ကွက်၊ ဘုရားရှေ့",
      items,
      subtotalMmk,
      deliveryFeeMmk: 2000,
      totalMmk: subtotalMmk + 2000,
      paymentMethod: method,
      paymentStatus: payment,
      paymentRejectReason: null,
      createdAt: minutesAgo(age),
      receipt: payment === "in_review" || payment === "approved" ? { uploadedAt: minutesAgo(age - 5), duplicateOfOrderNumber: null } : null,
      shipment: {
        status,
        token: randomUUID().replaceAll("-", ""),
        carrier: reached.length > 2 ? "Royal Express" : null,
        etaLow: reached.length > 2 ? dayAhead(1) : null,
        etaHigh: reached.length > 2 ? dayAhead(2) : null,
        events: reached.map((step, i) => ({ type: labelOf[step], occurredAt: minutesAgo(age - i * 3) })),
      },
      seenEventIds: new Set<string>(),
    };
  });

  return {
    shop: {
      id: randomUUID(),
      slug: "aye-fashion",
      name: "အေးအေး ဖက်ရှင်",
      deliveryFeeMmk: 2000,
      paymentAccounts: [{ provider: "KBZPay", name: "Daw Aye Aye", number: "09111222333" }],
      nextOrderNumber: 1049,
    },
    products,
    orders,
    keys: new Map(),
  };
}

const g = globalThis as unknown as { __bingomartMock?: MockStore };
export const mock = (g.__bingomartMock ??= seed());
export const DEMO_SLUG = "aye-fashion";
