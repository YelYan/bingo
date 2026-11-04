/* Mock data for operations screens: purchasing, stock-in, stocktake, import, credit, day-close, expenses, AI knowledge, assistant, admin. */

export const suppliers = [
  { name: "ပေးသွင်းသူ A", items: "အင်္ကျီ၊ ထမီ", owes: 1240000, terms: "Net 30" },
  { name: "ပေးသွင်းသူ B", items: "အိတ်၊ ဖိနပ်", owes: 0, terms: "ချက်ခြင်း" },
];
export const purchaseOrders = [
  { id: "#PO-014", supplier: "ပေးသွင်းသူ A", items: "ရှပ်အင်္ကျီ 50, ထမီ 20", amount: 1240000, status: "pending" },
  { id: "#PO-013", supplier: "ပေးသွင်းသူ B", items: "အိတ် 30", amount: 660000, status: "received" },
];

export const stockInBatches = [
  { id: "#B-0088", product: "ရှပ်အင်္ကျီ အဖြူ", qty: 50, unitCost: 17500, date: "28 အောက်တိုဘာ" },
  { id: "#B-0087", product: "ထမီ ပန်းနု", qty: 20, unitCost: 33000, date: "25 အောက်တိုဘာ" },
];

export const stocktakeRows = [
  { name: "ရှပ်အင်္ကျီ အဖြူ", system: 12, counted: 11, diff: -1 },
  { name: "ပိုးချည် လုံချည်", system: 2, counted: 2, diff: 0 },
  { name: "ထမီ ပန်းနု", system: 4, counted: 5, diff: 1 },
];
export const branches = ["ဆိုင်ခွဲ 1", "ဆိုင်ခွဲ 2"];

export const creditLedger = [
  { customer: "ဦးစံ", owes: 240000, since: "15 ရက် ကျော်", status: "overdue" },
  { customer: "ဒေါ်အိ", owes: 60000, since: "3 ရက်", status: "ok" },
];

export const expenseCategories = [
  { label: "ငှားရမ်းခ", amount: 400000 },
  { label: "လျှပ်စစ်", amount: 85000 },
  { label: "ဝန်ထမ်းလစာ", amount: 1200000 },
  { label: "ကုန်ပစ္စည်း ဝယ်ယူခ", amount: 2840000 },
];
export const taxSummary = { income: 28400000, deductible: 4525000, estimated: 1419500 };

export const knowledgeDocs = [
  { title: "ပြန်အမ်း/ပြန်လဲ မူဝါဒ", updated: "2 ရက် က" },
  { title: "ပို့ဆောင်ရေး ဇုန်များနှင့် ETA", updated: "5 ရက် က" },
  { title: "ဆိုင် အကြောင်း (About us)", updated: "2 ပတ် က" },
];

export const assistantSuggestions = [
  "ဤလ အရောင်းရဆုံး ပစ္စည်း ၅ ခု ပြပါ",
  "ကုန်လက်ကျန် နည်းနေသော ပစ္စည်း ပြပါ",
  "ယနေ့ အသားတင် အမြတ် ဘယ်လောက်လဲ",
];

export const adminShops = [
  { name: "အေးအေး ဖက်ရှင်", owner: "ဒေါ်မေမြင့်", plan: "ကြီးထွားဆဲ", status: "active", gmv: 28400000 },
  { name: "ရွှေစင် အလှကုန်", owner: "မသီတာ", plan: "အခမဲ့", status: "pending", gmv: 0 },
  { name: "ကြိုက်တယ် မုန့်", owner: "ကိုအောင်", plan: "စီးပွားရေး", status: "active", gmv: 61200000 },
];
export const adminShopStatus = { active: ["ဆောင်ရွက်ဆဲ", "ok"], pending: ["စောင့်ဆိုင်း", "wait"], suspended: ["ရပ်ထားသည်", "bad"] } as const;

export const moderationQueue = [
  { shop: "ကြိုက်တယ် မုန့်", issue: "AI ဈေးနှုန်း မှားပြောမိသည်", severity: "high" },
  { shop: "အေးအေး ဖက်ရှင်", issue: "Burmese reply ရှည်လွန်းသည်", severity: "low" },
];

export const supportTickets = [
  { shop: "ရွှေစင် အလှကုန်", topic: "Payout အကောင့် အတည်ပြုရန်", status: "open" },
  { shop: "ကြိုက်တယ် မုန့်", topic: "Domain ချိတ်ဆက်ရန် အကူအညီ", status: "open" },
];
