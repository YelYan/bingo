/* Mock data for the main seller screens. Every value here is an example. */

export const owner = { name: "ဒေါ်မေမြင့်", shop: "အေးအေး ဖက်ရှင်", domain: "aye-fashion.bingomart.example" };

export const channelColor: Record<string, string> = { Messenger: "#2F6FD0", Viber: "#7B4FB5", Telegram: "#1F8FBF", Web: "#0E6B5B", POS: "#B97A00" };

export const kpis = [
  { label: "ယနေ့ရောင်းရငွေ", value: "1,284,500", unit: "ကျပ်", note: "မနေ့ကထက် 12% တက်" },
  { label: "အော်ဒါအသစ်", value: "34", unit: "ခု", note: "AI လက်ခံ 28 · POS 6" },
  { label: "ငွေစစ်ရန် ကျန်သည်", value: "5", unit: "ခု", note: "AI စစ်ပြီး 17 ခု" },
  { label: "ပို့ဆောင်နေဆဲ", value: "18", unit: "ခု", note: "နောက်ကျနေသည် 2 ခု" },
];

export const todayOrders = [
  { id: "#1048", name: "ဒေါ်သီတာ", channel: "Messenger", amount: 45000, pay: "ok", ship: "go" },
  { id: "#1047", name: "ကိုအောင်မင်း", channel: "Viber", amount: 128500, pay: "wait", ship: "prep" },
  { id: "#1046", name: "မမြတ်နိုး", channel: "Web", amount: 72000, pay: "cod", ship: "prep" },
  { id: "#1045", name: "ကိုဇေယျာ", channel: "Telegram", amount: 36000, pay: "ok", ship: "done" },
  { id: "#1044", name: "ဆိုင်ရှေ့ ဝယ်သူ", channel: "POS", amount: 18500, pay: "ok", ship: "done" },
  { id: "#1043", name: "ဒေါ်ခင်မာ", channel: "Messenger", amount: 96000, pay: "bad", ship: "hold" },
] as const;

export const payLabel = { ok: ["ငွေရှင်းပြီး", "ok"], wait: ["စစ်ဆေးနေသည်", "wait"], cod: ["COD", "mute"], bad: ["မရှင်းသေး", "bad"] } as const;
export const shipLabel = { prep: ["ပြင်ဆင်နေ", "mute"], go: ["ပို့ဆောင်နေ", "ship"], done: ["ပို့ပြီး", "ok"], hold: ["စောင့်ဆိုင်း", "wait"] } as const;

export const week = [
  { label: "25", value: 6.2 },
  { label: "26", value: 4.8 },
  { label: "27", value: 7.1 },
  { label: "28", value: 5.5 },
  { label: "29", value: 9.0 },
  { label: "30", value: 8.4 },
  { label: "31", value: 12.8 },
].map((d) => ({ ...d, display: d.value.toFixed(1) }));

export const alerts = [
  { tag: "ငွေ", tone: "bad", text: "ငွေလွှဲစလစ်တွင် ပမာဏ မကိုက်ပါ (အော်ဒါ #1047)" },
  { tag: "ပြန်အမ်း", tone: "wait", text: "ဖောက်သည်က ပြန်အမ်းငွေ တောင်းဆိုထားသည် (#1039)" },
  { tag: "AI", tone: "ship", text: "အရွယ်အစား မေးခွန်းကို AI မသေချာသဖြင့် လူကို လွှဲပေးထားသည်" },
] as const;

export const lowStock = [
  { name: "ရှပ်အင်္ကျီ အဖြူ (M)", left: 3 },
  { name: "ပိုးချည် လုံချည်", left: 2 },
  { name: "ထမီ ပန်းနု (L)", left: 4 },
];

/* POS */
export const posCategories = ["အားလုံး", "အင်္ကျီ", "လုံချည် / ထမီ", "ဘောင်းဘီ", "အိတ် / ဖိနပ်", "အလှကုန်", "လက်ဆောင်"];
export const posProducts = [
  { id: "p1", name: "ရှပ်အင်္ကျီ အဖြူ", variant: "M · L · XL", price: 28000, stock: 12 },
  { id: "p2", name: "ပိုးချည် လုံချည်", variant: "အပြာ · အစိမ်း", price: 45000, stock: 2 },
  { id: "p3", name: "ထမီ ပန်းနု", variant: "M · L", price: 52000, stock: 4 },
  { id: "p4", name: "ဘောင်းဘီရှည်", variant: "အနက် · ခါကီ", price: 38000, stock: 9 },
  { id: "p5", name: "လက်ဆွဲအိတ်", variant: "ညို · အနက်", price: 35000, stock: 6 },
  { id: "p6", name: "ဦးထုပ်", variant: "တစ်မျိုးတည်း", price: 12000, stock: 20 },
  { id: "p7", name: "ပုဝါ ပန်းထိုး", variant: "အရောင်စုံ", price: 18500, stock: 0 },
  { id: "p8", name: "ဖိနပ်", variant: "38 – 42", price: 24000, stock: 7 },
];
export const posMethods = ["ငွေသား", "KBZPay", "Wave", "AYA Pay", "ဘဏ်လွှဲ", "COD"];

/* Inbox */
export type Msg = { from: "them" | "ai" | "me"; text: string; slip?: boolean };
export const conversations = [
  { id: "c1", name: "ဒေါ်သီတာ", ch: "Messenger", time: "2 မိနစ်", tag: "ai", msgs: [{ from: "them", text: "ဒီလုံချည် အပြာရောင် ရှိလား?" }, { from: "ai", text: "ပိုးချည် လုံချည် အပြာရောင် ရှိပါတယ် (ကျန် 2 ထည်)။ 45,000 ကျပ် ဖြစ်ပါတယ်။" }] as Msg[] },
  {
    id: "c2",
    name: "ကိုအောင်မင်း",
    ch: "Viber",
    time: "5 မိနစ်",
    tag: "chk",
    msgs: [
      { from: "them", text: "ရှပ်အင်္ကျီ အဖြူ M 2 ထည်၊ ထမီ ပန်းနု M 1 ထည်၊ ပုဝါ 1 ထည် ယူမယ်။ ကမာရွတ်ကို ပို့ပေးပါ။" },
      { from: "ai", text: "အော်ဒါ အတည်ပြုပါသည်။ ပစ္စည်း 126,500 ကျပ် + ပို့ခ 2,000 ကျပ် = 128,500 ကျပ်။ KBZPay သို့မဟုတ် ဘဏ်လွှဲ ရွေးနိုင်ပါသည်။ ပို့ဆောင်ချိန် မနက်ဖြန် ညနေ 2 နာရီမှ 5 နာရီအတွင်း ခန့်မှန်းသည်။" },
      { from: "them", text: "ငွေလွှဲပြီးပါပြီ", slip: true },
    ] as Msg[],
  },
  { id: "c3", name: "မမြတ်နိုး", ch: "Web", time: "12 မိနစ်", tag: "ai", msgs: [{ from: "them", text: "COD ရနိုင်လား?" }, { from: "ai", text: "ရပါတယ်။ ရန်ကုန်တွင်း COD လက်ခံပါတယ်။ ပို့ခ 2,000 ကျပ် ဖြစ်ပါတယ်။" }] as Msg[] },
  { id: "c4", name: "ကိုဇေယျာ", ch: "Telegram", time: "20 မိနစ်", tag: "ai", msgs: [{ from: "them", text: "ပါဆယ် ဘယ်ရောက်လဲ?" }, { from: "ai", text: "အော်ဒါ #1045 ကို ပို့ပြီးပါပြီ။ ခြေရာခံလင့်ခ် ပို့ပေးလိုက်ပါတယ်။" }] as Msg[] },
  { id: "c5", name: "ဒေါ်ခင်မာ", ch: "Messenger", time: "31 မိနစ်", tag: "you", msgs: [{ from: "them", text: "ပြန်အမ်းချင်ပါတယ်" }, { from: "ai", text: "နားလည်ပါတယ်။ ဆိုင်ရှင်ထံ လွှဲပေးလိုက်ပါတယ်။ မကြာမီ ပြန်ဆက်သွယ်ပါမယ်။" }] as Msg[] },
];
export const convTag = { ai: ["AI ဖြေနေ", "ok"], you: ["လူလိုသည်", "bad"], chk: ["ငွေစစ်နေ", "wait"] } as const;

export const slipChecks = [
  { label: "ပမာဏ", value: "118,500 ကျပ်", ok: false },
  { label: "ရက်စွဲ / အချိန်", value: "31 အောက်တိုဘာ 10:42", ok: true },
  { label: "လက်ခံသူ အကောင့်", value: "ဆိုင်အကောင့်နှင့် တူသည်", ok: true },
  { label: "ရည်ညွှန်းနံပါတ်", value: "အသစ် (မသုံးဖူးပါ)", ok: true },
  { label: "ပုံ ပြင်ထားခြင်း", value: "မတွေ့ပါ", ok: true },
];

/* Customers */
export const customerKpis = [
  { label: "စုစုပေါင်း ဖောက်သည်", value: "1,284" },
  { label: "ဤလ အသစ်", value: "96" },
  { label: "ပြန်ဝယ်သူ", value: "38%" },
  { label: "VIP", value: "52" },
];
export const customers = [
  { name: "ဒေါ်သီတာ", ch: "Messenger", orders: 14, spent: 842000, last: "2 ရက်", tag: "vip" },
  { name: "ကိုအောင်မင်း", ch: "Viber", orders: 6, spent: 438000, last: "ယနေ့", tag: "reg" },
  { name: "မမြတ်နိုး", ch: "Web", orders: 1, spent: 72000, last: "ယနေ့", tag: "new" },
  { name: "ကိုဇေယျာ", ch: "Telegram", orders: 9, spent: 611000, last: "5 ရက်", tag: "vip" },
  { name: "ဒေါ်ခင်မာ", ch: "Messenger", orders: 3, spent: 184000, last: "12 ရက်", tag: "reg" },
  { name: "မသူဇာ", ch: "Web", orders: 1, spent: 45000, last: "မနေ့", tag: "new" },
];

/* Reports */
export const reportRanges: Record<string, { kpis: { label: string; value: string; note: string; good?: boolean }[]; bars: { label: string; value: number }[]; unit: string; period: string }> = {
  နေ့: {
    kpis: [{ label: "ယနေ့ ရောင်းရငွေ", value: "1.28M", note: "+12% ↑", good: true }, { label: "အော်ဒါ", value: "34", note: "+4 ↑", good: true }, { label: "ပျမ်းမျှ အော်ဒါ", value: "37,800", note: "ကျပ်" }, { label: "အသားတင် အမြတ်", value: "0.41M", note: "ခန့်မှန်း" }],
    bars: [{ label: "9", value: 1.1 }, { label: "11", value: 2.4 }, { label: "13", value: 3.0 }, { label: "15", value: 2.2 }, { label: "17", value: 3.6 }, { label: "19", value: 2.0 }],
    unit: "သိန်း",
    period: "ယနေ့ · နာရီအလိုက်",
  },
  ပတ်: {
    kpis: [{ label: "ဤပတ် ရောင်းရငွေ", value: "5.6M", note: "+9% ↑", good: true }, { label: "အော်ဒါ", value: "148", note: "+6% ↑", good: true }, { label: "ပျမ်းမျှ အော်ဒါ", value: "37,900", note: "ကျပ်" }, { label: "အသားတင် အမြတ်", value: "1.8M", note: "ခန့်မှန်း" }],
    bars: [{ label: "တနင်္လာ", value: 6.2 }, { label: "အင်္ဂါ", value: 4.8 }, { label: "ဗုဒ္ဓဟူး", value: 7.1 }, { label: "ကြာသပတေး", value: 5.5 }, { label: "သောကြာ", value: 9.0 }, { label: "စနေ", value: 8.4 }, { label: "တနင်္ဂနွေ", value: 12.8 }],
    unit: "သိန်း",
    period: "အောက်တိုဘာ 25 – 31",
  },
  လ: {
    kpis: [{ label: "ဤလ ရောင်းရငွေ", value: "28.4M", note: "+18% ↑", good: true }, { label: "အော်ဒါ", value: "742", note: "+9% ↑", good: true }, { label: "ပျမ်းမျှ အော်ဒါ", value: "38,300", note: "ကျပ်" }, { label: "အသားတင် အမြတ်", value: "9.1M", note: "ခန့်မှန်း" }],
    bars: [{ label: "မေ", value: 14.2 }, { label: "ဇွန်", value: 16.8 }, { label: "ဇူ", value: 15.1 }, { label: "ဩ", value: 19.4 }, { label: "စက်", value: 22.0 }, { label: "အောက်", value: 28.4 }],
    unit: "သိန်း",
    period: "မေ – အောက်တိုဘာ 2026",
  },
  "၆ လ": {
    kpis: [{ label: "၆ လ ရောင်းရငွေ", value: "115.9M", note: "+22% ↑", good: true }, { label: "အော်ဒါ", value: "3,021", note: "+14% ↑", good: true }, { label: "ပျမ်းမျှ အော်ဒါ", value: "38,400", note: "ကျပ်" }, { label: "အသားတင် အမြတ်", value: "37.2M", note: "ခန့်မှန်း" }],
    bars: [{ label: "မေ", value: 14.2 }, { label: "ဇွန်", value: 16.8 }, { label: "ဇူ", value: 15.1 }, { label: "ဩ", value: 19.4 }, { label: "စက်", value: 22.0 }, { label: "အောက်", value: 28.4 }],
    unit: "သိန်း",
    period: "ဧပြီ – အောက်တိုဘာ 2026",
  },
};
export const channelShare = [
  { label: "Messenger", pct: 44, fill: "#2F6FD0" },
  { label: "Web storefront", pct: 24, fill: "#0E6B5B" },
  { label: "Viber", pct: 16, fill: "#7B4FB5" },
  { label: "POS ဆိုင်ခွဲ", pct: 10, fill: "#B97A00" },
  { label: "Telegram", pct: 6, fill: "#1F8FBF" },
];
export const topProducts = [
  { n: 1, name: "ရှပ်အင်္ကျီ အဖြူ", qty: "184 ထည်", rev: "5.1M" },
  { n: 2, name: "ပိုးချည် လုံချည်", qty: "96 ထည်", rev: "4.3M" },
  { n: 3, name: "ထမီ ပန်းနု", qty: "71 ထည်", rev: "3.7M" },
  { n: 4, name: "လက်ဆွဲအိတ်", qty: "63 ခု", rev: "2.2M" },
  { n: 5, name: "ဦးထုပ်", qty: "142 ခု", rev: "1.7M" },
];

/* Plans (names and limits from the design; prices are placeholders) */
export const plans = [
  { name: "အခမဲ့", who: "စတင်သူ", price: "0", unit: "ကျပ်", cta: "အခမဲ့ စတင်မည်", feats: ["ပစ္စည်း 30 ခု", "AI စာ 500 / လ", "ချန်နယ် 1 (Messenger)", "ဝန်ထမ်း 1 ဦး", "အခြေခံ အစီရင်ခံစာ"] },
  { name: "ကြီးထွားဆဲ", who: "ဆိုင်ငယ်", price: "[၂၅,၀၀၀]", unit: "ကျပ် / လ", cta: "ရွေးမည်", hot: true, tag: "လူကြိုက်များ", feats: ["ပစ္စည်း မကန့်သတ်", "AI စာ 5,000 / လ", "ချန်နယ် အားလုံး", "ဝန်ထမ်း 5 ဦး", "ငွေ AI စစ်ဆေးမှု", "ပြည့်စုံ အစီရင်ခံစာ"] },
  { name: "စီးပွားရေး", who: "ရောင်းအားများ", price: "[၆၀,၀၀၀]", unit: "ကျပ် / လ", cta: "ရွေးမည်", feats: ["ကြီးထွားဆဲ အကုန် +", "AI စာ 20,000 / လ", "ဆိုင်ခွဲ များစွာ", "ဝန်ထမ်း 15 ဦး", "မားကက်တင်း + loyalty", "ဦးစားပေး ပံ့ပိုးမှု"] },
  { name: "လက်ကား", who: "B2B / ကုမ္ပဏီ", price: "ဆက်သွယ်ရန်", unit: "", cta: "တွေ့ဆုံမည်", feats: ["စီးပွားရေး အကုန် +", "AI စာ စိတ်ကြိုက်", "custom domain", "တန်းစီ စျေးနှုန်း", "API ချိတ်ဆက်", "account manager"] },
];

/* Website builder */
export const builderBlocks = ["ဟီးရိုး / ဘန်နာ", "ပစ္စည်း ဂရစ်", "ပရိုမိုးရှင်း ဘန်း", "ဖောက်သည် မှတ်ချက်", "ဆက်သွယ်ရန် / မြေပုံ", "အောက်ခြေ (Footer)"];
export const builderTemplates = ["ဖက်ရှင်", "အလှကုန်", "အစားအစာ", "ရိုးရှင်း"];
export const brandColors = ["#0E6B5B", "#1F4E8C", "#8F2A17", "#5B3A8C"];

/* Phone screens */
export const onboardCategories = [
  { label: "ဖက်ရှင် / အဝတ်အထည်", sub: "အင်္ကျီ၊ လုံချည်၊ ဖိနပ်", icon: "M3 7l4-4 5 3 5-3 4 4-3 4v10H6V11z", tint: "#E4EFEA" },
  { label: "အလှကုန်", sub: "အသားအရေ၊ မိတ်ကပ်", icon: "M9 3h6v4a3 3 0 01-6 0zM8 11h8l1 10H7z", tint: "#F2DFDA" },
  { label: "အစားအစာ / မုန့်", sub: "အအေး၊ လက်လုပ်", icon: "M4 3v8a3 3 0 006 0V3M7 3v18M15 3c-1 2-1 5 0 7v11", tint: "#E9EDD6" },
  { label: "ကုန်စုံ", sub: "နေ့စဉ် သုံးပစ္စည်း", icon: "M3 4h2l2 12h11l2-8H6M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z", tint: "#E2ECF3" },
  { label: "အီလက်ထရွန်းနစ်", sub: "ဖုန်း၊ ဆက်စပ်", icon: "M7 3h10v18H7zM10 18h4", tint: "#E5E6F2" },
  { label: "ဝန်ဆောင်မှု / ဘွတ်ကင်", sub: "ဆံပင်၊ ပြုပြင်", icon: "M12 8v4l3 2M12 3a9 9 0 100 18 9 9 0 000-18z", tint: "#E4EFEA" },
];

export const riderStops = [
  { id: "#1047", name: "ကိုအောင်မင်း", township: "ကမာရွတ်", address: "၅ လမ်း၊ (၃) ရပ်ကွက်၊ ဘုရားရှေ့", cod: 128500 },
  { id: "#1048", name: "ဒေါ်သီတာ", township: "လှိုင်", address: "၁၂ လမ်း၊ ကျောင်းအနီး", cod: 0 },
  { id: "#1050", name: "မသူဇာ", township: "ဒဂုံ", address: "ဈေးအနောက်ဘက်", cod: 45000 },
];
export const riderSteps = [
  { label: "လမ်းပေါ်", tone: "dark", btn: "ရောက်ပြီ ⟶" },
  { label: "ရောက်ပြီ", tone: "ship", btn: "ငွေ ကောက်ပြီ ⟶" },
  { label: "ငွေရပြီ", tone: "ok", btn: "ပို့ပြီး အတည်ပြု ✓" },
  { label: "ပို့ပြီး", tone: "ok", btn: "နောက် အော်ဒါ ⟶" },
] as const;
