/* Mock data for the second wave of screens. Every value here is an example. */

export const aiPerms = [
  { label: "ဈေးနှုန်း၊ လက်ကျန် ဖြေကြားခြင်း", sub: "ပစ္စည်း မေးခွန်း", on: true },
  { label: "အော်ဒါ လက်ခံခြင်း", sub: "ပစ္စည်း၊ အရေအတွက်၊ လိပ်စာ", on: true },
  { label: "ငွေစလစ် စစ်ဆေးခြင်း", sub: "50,000 ကျပ်အောက် အလိုအလျောက်", on: true },
  { label: "ပို့ဆောင်ချိန် ခန့်မှန်းပြောခြင်း", sub: "ETA အကွာအဝေး", on: true },
  { label: "ပြန်အမ်းငွေ ခွင့်ပြုခြင်း", sub: "အမြဲ လူ စစ်ရန်", on: false },
];
export const aiFaqs = [
  { q: "ပို့ခ ဘယ်လောက်လဲ?", a: "မြို့နယ်အလိုက် 1,500 – 3,000 ကျပ်။ ရန်ကုန်တွင်း တစ်နေ့။" },
  { q: "COD ရလား?", a: "ရပါတယ်။ ပထမဆုံး အော်ဒါတွင် အရံအတွက် ကန့်သတ်ချက် ရှိသည်။" },
  { q: "ပြန်လဲလို့ရလား?", a: "၇ ရက်အတွင်း၊ အရွယ်အစား မတော်လျှင် လဲပေးသည်။" },
];
export const aiChannels = [
  { label: "Messenger", on: true },
  { label: "Viber", on: true },
  { label: "Telegram", on: true },
  { label: "Web chat", on: true },
];

export const inventoryKpis = [
  { label: "ပစ္စည်း မျိုးစုံ", value: "248" },
  { label: "စုစုပေါင်း လက်ကျန်တန်ဖိုး", value: "42.8M" },
  { label: "နည်းနေ", value: "12" },
  { label: "ကုန်သွား", value: "3" },
];
export const inventoryRows = [
  { name: "ရှပ်အင်္ကျီ အဖြူ", variant: "M", sku: "SHRT-WH-M", stock: 12, cost: 18000, price: 28000 },
  { name: "ပိုးချည် လုံချည်", variant: "အပြာ", sku: "LGY-BL", stock: 2, cost: 30000, price: 45000 },
  { name: "ထမီ ပန်းနု", variant: "L", sku: "HTM-PK-L", stock: 4, cost: 34000, price: 52000 },
  { name: "ပုဝါ ပန်းထိုး", variant: "—", sku: "PW-EMB", stock: 0, cost: 11000, price: 18500 },
  { name: "ဦးထုပ်", variant: "—", sku: "CAP-01", stock: 20, cost: 7000, price: 12000 },
  { name: "လက်ဆွဲအိတ်", variant: "ညို", sku: "BAG-BR", stock: 6, cost: 22000, price: 35000 },
];

export const promos = [
  { name: "WELCOME5", detail: "ပထမဆုံးဝယ်သူ · 5,000 ကျပ် လျှော့", used: 184, status: "live" },
  { name: "Flash ည 8 နာရီ", detail: "အင်္ကျီ 15% · 1 ရက်သာ", used: 63, status: "live" },
  { name: "ဆောင်းဦး အထူး", detail: "ပို့ခ အခမဲ့ · 50,000 အထက်", used: 0, status: "draft" },
  { name: "Thingyan sale", detail: "20% · ပြီးဆုံး", used: 421, status: "end" },
];
export const promoStatus = { live: ["လက်ရှိ", "ok"], draft: ["မူကြမ်း", "wait"], end: ["ပြီး", "mute"] } as const;
export const segments = [
  { label: "VIP (3+ အော်ဒါ)", count: 52 },
  { label: "ဤလ မဝယ်သေး", count: 310 },
  { label: "အားလုံး (opt-in)", count: 940 },
];

export const deliveryZones = [
  { name: "ရန်ကုန် — မြို့တွင်း (ကမာရွတ်၊ စမ်းချောင်း...)", fee: 2000, eta: "တစ်နေ့" },
  { name: "ရန်ကုန် — မြို့ပြင် (လှိုင်သာယာ...)", fee: 3000, eta: "1 – 2 ရက်" },
  { name: "မန္တလေး", fee: 4500, eta: "2 – 3 ရက်" },
  { name: "အခြား မြို့ကြီးများ", fee: 5000, eta: "3 – 4 ရက်" },
  { name: "ကားဂိတ် (ခရီးသည်တင်ကား)", fee: 3500, eta: "1 – 3 ရက်" },
];
export const couriers = [
  { name: "[ပို့ဆောင်ရေး A]", note: "ရန်ကုန်တွင်း · COD", on: true },
  { name: "[ပို့ဆောင်ရေး B]", note: "တစ်နိုင်ငံလုံး", on: true },
  { name: "ကိုယ်ပိုင် ရိုက်ဒါ", note: "မြို့တွင်း သီးသန့်", on: false },
];

export const channelConnections = [
  { name: "Facebook Messenger", sub: "Page ချိတ်ရန်", mark: "ME", color: "#2F6FD0", on: true, detail: "Page: [ဆိုင်အမည်] ချိတ်ပြီး" },
  { name: "Viber", sub: "Business / bot", mark: "VB", color: "#7B4FB5", on: false, detail: "Viber partner မှတစ်ဆင့် ချိတ်ရန်" },
  { name: "Telegram", sub: "Bot token paste", mark: "TG", color: "#1F8FBF", on: false, detail: "Bot ဖန်တီး၍ token ကူးထည့်ရန်" },
  { name: "Web chat widget", sub: "Site ပေါ် script", mark: "WB", color: "#0A5547", on: true, detail: "သင့် subdomain site ပေါ် တပ်ဆင်ပြီး" },
];

export const kitchenColumns = [
  {
    title: "အသစ်", color: "#B97A00", tickets: [
      { id: "#D-204", items: "ကြက်ဆီထမင်း × 2, ဘူးသီးကြော် × 1", mode: "ပို့ပေးရန် · ကမာရွတ်", cust: "ကို A", timer: "2 မိနစ်", urgent: false, btn: "ချက်စရန် လက်ခံ" },
      { id: "#D-205", items: "မုန့်ဟင်းခါး × 3", mode: "ဆိုင်တွင် · စားပွဲ 4", cust: "ဒေါ် B", timer: "1 မိနစ်", urgent: false, btn: "ချက်စရန် လက်ခံ" },
    ],
  },
  {
    title: "ချက်နေဆဲ", color: "#1F4E8C", tickets: [
      { id: "#D-202", items: "အကင်စုံ × 1, ထမင်းကြော် × 2", mode: "ပို့ပေးရန် · လှိုင်", cust: "ကို C", timer: "11 မိနစ်", urgent: true, btn: "ပြင်ဆင်ပြီး ⟶" },
      { id: "#D-201", items: "ရှမ်းခေါက်ဆွဲ × 2", mode: "ယူသွား", cust: "မ D", timer: "8 မိနစ်", urgent: false, btn: "ပြင်ဆင်ပြီး ⟶" },
    ],
  },
  {
    title: "အဆင်သင့် / ပို့", color: "#0A5547", tickets: [
      { id: "#D-199", items: "ကြက်သားဆန်ပြုတ် × 1", mode: "ပို့ပေးရန် · စမ်းချောင်း", cust: "ကို E", timer: "ရိုက်ဒါ ခေါ်ပြီး", urgent: false, btn: "ရိုက်ဒါ ပေးအပ်" },
      { id: "#D-198", items: "ကော်ဖီ × 4, မုန့် × 2", mode: "ယူသွား", cust: "မ F", timer: "စောင့်နေ", urgent: false, btn: "ပြီးစီး ✓" },
    ],
  },
];

export const returnRows = [
  { id: "#1039", reason: "အရွယ်အစား မတော်", cust: "ဒေါ်ခင်မာ", kind: "ပြန်လဲ", amount: 52000, status: "new" },
  { id: "#1021", reason: "ပစ္စည်း ပျက်", cust: "ကိုဇေယျာ", kind: "ပြန်အမ်း", amount: 36000, status: "new" },
  { id: "#1008", reason: "အရောင် မှားပို့", cust: "မမြတ်နိုး", kind: "ပြန်လဲ", amount: 28000, status: "ok" },
  { id: "#0994", reason: "စိတ်မကြိုက်", cust: "ကို A", kind: "ပြန်အမ်း", amount: 18500, status: "no" },
];
export const returnStatus = { new: ["စစ်ဆေးရန်", "wait"], ok: ["ပြီးစီး", "ok"], no: ["ငြင်းပယ်", "bad"] } as const;

export const financeKpis = [
  { label: "ယနေ့ ဝင်ငွေ", value: "1.28M", good: true },
  { label: "ယနေ့ အသုံး", value: "342k" },
  { label: "အသားတင်", value: "942k" },
  { label: "လက်ကျန် ငွေသား", value: "3.6M" },
];
export const transactions = [
  { time: "09:20", label: "POS ရောင်းရငွေ", cat: "ရောင်းအား", in: 185000, out: 0 },
  { time: "10:52", label: "အော်ဒါ #1047 (KBZPay)", cat: "ရောင်းအား", in: 128500, out: 0 },
  { time: "11:10", label: "ပစ္စည်း ဝယ်ယူ — ပေးသွင်းသူ A", cat: "ကုန်ဝယ်", in: 0, out: 240000 },
  { time: "13:40", label: "ပို့ဆောင်ခ", cat: "ပို့ဆောင်ရေး", in: 0, out: 42000 },
  { time: "15:00", label: "အွန်လိုင်း အော်ဒါများ", cat: "ရောင်းအား", in: 624000, out: 0 },
  { time: "17:30", label: "ဝန်ထမ်း လစာ (တစ်စိတ်)", cat: "လစာ", in: 0, out: 60000 },
];

export const staffRows = [
  { name: "မအေးအေး", role: "ကက်ရှီယာ", perms: "POS၊ အော်ဒါ", active: true },
  { name: "ကိုမျိုး", role: "ရိုက်ဒါ", perms: "ပို့ဆောင်ရေး", active: true },
  { name: "မသီတာ", role: "စတော့ကီပါ", perms: "ပစ္စည်း၊ လက်ကျန်", active: true },
  { name: "ကိုအောင်", role: "မန်နေဂျာ", perms: "အားလုံး", active: false },
];

export const loyaltyTiers = [
  { name: "Bronze", min: 0, perk: "1 ကျပ် = 1 point" },
  { name: "Silver", min: 500000, perk: "1.5× point + ပို့ခ 10% လျှော့" },
  { name: "Gold", min: 2000000, perk: "2× point + ပို့ခ အခမဲ့" },
];

export const broadcastSegments = [
  { label: "VIP (3+ အော်ဒါ)", count: 52 },
  { label: "ဤလ မဝယ်သေး", count: 310 },
  { label: "အသစ် (ဤလ ပထမဆုံး)", count: 96 },
  { label: "အားလုံး (opt-in)", count: 940 },
];

export const templates = [
  { name: "အော်ဒါ အတည်ပြု", body: "မင်္ဂလာပါ {{name}}၊ သင့်အော်ဒါ {{order}} ကို လက်ခံပါသည်။ စုစုပေါင်း {{total}} ကျပ် ဖြစ်ပါသည်။" },
  { name: "ငွေလွှဲ တောင်းခံ", body: "ပစ္စည်း ပို့ရန် {{total}} ကျပ် လွှဲပေးပါရန် ပြောပါသည်။ ရည်ညွှန်း {{order}} ကို မှတ်စုထဲ ရေးပါ။" },
  { name: "ပို့ဆောင်နေကြောင်း", body: "{{order}} ပစ္စည်း ယခု ပို့ဆောင်နေပါသည်။ ခန့်မှန်း {{eta}} အတွင်း ရောက်ပါမည်။" },
  { name: "ပို့ပြီးကြောင်း", body: "{{order}} ပစ္စည်း ပို့ပြီးပါပြီ။ ကျေးဇူးတင်ပါသည် 🙏" },
];

export const broadcasts = [
  { name: "ဆောင်းဦး promo", audience: "VIP", sent: 52, status: "live" },
  { name: "Flash sale အသိပေးချက်", audience: "ဤလ မဝယ်သေး", sent: 310, status: "end" },
];

export const bookingSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
export const bookings = [
  { time: "09:00", name: "ဒေါ်သီတာ", service: "ဆံပင်ညှပ်", status: "ok" },
  { time: "10:00", name: "—", service: "", status: "free" },
  { time: "11:00", name: "ကိုအောင်", service: "မျက်ခုံးထိုး", status: "wait" },
  { time: "13:00", name: "—", service: "", status: "free" },
  { time: "14:00", name: "မမြတ်", service: "ဆံပင်ဆေး", status: "ok" },
];
export const bookingStatus = { ok: ["အတည်ပြုပြီး", "ok"], wait: ["စောင့်နေ", "wait"], free: ["လွတ်", "mute"] } as const;

export const preorders = [
  { name: "ဂျပန် ကောင်တီနား ဖက်ရှင် (round 4)", closes: "3 ရက် အတွင်း", joined: 18, min: 10, unit: "11,000 ကျပ်" },
  { name: "ကိုရီးယား အလှကုန် box", closes: "ပိတ်ပြီး — ငွေပေးချေရန်", joined: 34, min: 20, unit: "28,000 ကျပ်" },
];

export const warrantyItems = [
  { product: "ဖုန်း X100", customer: "ကိုဇေယျာ", months: "12 လ အာမခံ", left: "8 လ ကျန်", installment: "3 လ ဆက်ပေးရန်" },
  { product: "ဖင်း Y200", customer: "မသူဇာ", months: "6 လ အာမခံ", left: "ကုန်ပြီး", installment: "ပြီးဆုံးပြီး" },
];

export const dealRows = [
  { item: "ရွှေလက်စွပ် 2 ပဲရည်", customer: "ဦးကြည်", stage: "စျေးဆစ်နေသည်", amount: "1,840,000" },
  { item: "စိန်နားကပ်", customer: "ဒေါ်နှင်း", stage: "စောင့်ဆိုင်းနေသည် (ဖောက်သည် အတည်ပြု)", amount: "3,200,000" },
];

export const prescriptionQueue = [
  { id: "#RX-041", customer: "ဦးစံ", items: "Paracetamol, Amoxicillin", status: "စစ်ဆေးရန်" },
  { id: "#RX-040", customer: "ဒေါ်အိ", items: "Insulin", status: "ဆေးဝါးပညာရှင် စစ်ပြီး" },
];

export const wholesaleAccounts = [
  { name: "ရွှေတိဂုံ ကုန်တိုက်", limit: "5,000,000", used: "2,840,000", terms: "Net 30" },
  { name: "မြိုင်ကြီး စတိုးများ", limit: "2,000,000", used: "1,950,000", terms: "Net 15" },
];

export const groceryItems = [
  { name: "ကြက်သား", unit: "kg", price: 9500, stock: "42.5 kg" },
  { name: "ငါးပိရည်", unit: "ပုလင်း", price: 3200, stock: "68 ပုလင်း" },
  { name: "ကော်ပြန့်", unit: "kg", price: 2800, stock: "6.2 kg" },
];

export const furnitureOrders = [
  { item: "ဧည့်ခန်း ဆိုဖာ 3 ခု", customer: "ဒေါ်သီတာ", stage: "ပို့ဆောင်ချိန် ချိန်းဆိုရန်", crew: 2 },
  { item: "အိပ်ခန်း ဘီရို", customer: "ကိုမင်း", stage: "တပ်ဆင်ပြီး", crew: 2 },
];

export const produceToday = [
  { name: "ခရမ်းချဉ်သီး", unit: "viss", price: 2400, change: "+200" },
  { name: "ကြက်သွန်နီ", unit: "viss", price: 3100, change: "−150" },
  { name: "ငှက်ပျော", unit: "ဖီး", price: 1800, change: "0" },
];

export const autoparts = [
  { name: "Brake pad (front)", fits: "Toyota Vios 2015–2019", stock: 8, price: 42000 },
  { name: "Air filter", fits: "Honda City 2017–2021", stock: 15, price: 18000 },
];
