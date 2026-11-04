export type NavItem = { href: string; label: string; icon: string; badge?: string };
export type NavGroup = { title: string; items: NavItem[] };

const I = {
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  bag: "M6 7h12l1 13H5L6 7zM9 7a3 3 0 016 0",
  box: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  chat: "M4 5h16v11H9l-5 4V5z",
  people: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 8a3 3 0 010 6M21 20c0-2-1.5-3.5-3.5-4.3",
  truck: "M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  card: "M3 6h18v12H3zM3 10h18",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12l2-1-2-4-2 1-2-1V5H9v2L7 8 5 7l-2 4 2 1v2l-2 1 2 4 2-1 2 1v2h6v-2l2-1 2 1 2-4-2-1z",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  tag: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
  clock: "M12 8v4l3 2M12 3a9 9 0 100 18 9 9 0 000-18z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  cash: "M3 7h18v10H3zM12 14a2 2 0 100-4 2 2 0 000 4z",
};

export const sellerNav: NavGroup[] = [
  {
    title: "ရောင်းချမှု",
    items: [
      { href: "/seller", label: "ပင်မ", icon: I.home },
      { href: "/seller/orders", label: "အော်ဒါများ", icon: I.bag, badge: "5" },
      { href: "/pos", label: "POS ကောင်တာ", icon: I.card },
      { href: "/seller/shipments", label: "ပို့ဆောင်မှုများ", icon: I.truck },
      { href: "/seller/returns", label: "ပြန်အမ်းမှုများ", icon: I.list },
      { href: "/seller/payments", label: "ငွေပေးချေမှု စစ်ဆေးရန်", icon: I.shield },
    ],
  },
  {
    title: "ကုန်ပစ္စည်း",
    items: [
      { href: "/seller/products", label: "ပစ္စည်းများ", icon: I.box },
      { href: "/seller/inventory", label: "လက်ကျန်", icon: I.list },
      { href: "/seller/stock-in", label: "ပစ္စည်းဝင် (FIFO)", icon: I.box },
      { href: "/seller/purchasing", label: "ဝယ်ယူမှု / ပေးသွင်းသူ", icon: I.truck },
      { href: "/seller/stocktake", label: "စာရင်းစစ် / ဆိုင်ခွဲ ရွှေ့", icon: I.list },
      { href: "/seller/import", label: "Excel တင်ရန်", icon: I.list },
    ],
  },
  {
    title: "ဖောက်သည်နှင့် AI",
    items: [
      { href: "/seller/inbox", label: "မက်ဆေ့ချ်များ", icon: I.chat, badge: "12" },
      { href: "/seller/customers", label: "ဖောက်သည်များ", icon: I.people },
      { href: "/seller/broadcast", label: "Broadcast", icon: I.chat },
      { href: "/seller/templates", label: "မက်ဆေ့ချ် ပုံစံများ", icon: I.list },
      { href: "/seller/ai", label: "AI ဆက်တင်", icon: I.spark },
      { href: "/seller/knowledge", label: "AI အသိပညာ", icon: I.spark },
      { href: "/seller/assistant", label: "AI လက်ထောက်", icon: I.spark },
      { href: "/seller/marketing", label: "မားကက်တင်းနှင့် ကူပွန်", icon: I.tag },
      { href: "/seller/loyalty", label: "Loyalty အမှတ်", icon: I.tag },
    ],
  },
  {
    title: "ငွေကြေး",
    items: [
      { href: "/seller/finance", label: "ငွေစာရင်း", icon: I.cash },
      { href: "/seller/credit", label: "အကြွေးစာရင်း", icon: I.cash },
      { href: "/seller/day-close", label: "နေ့ပိတ်", icon: I.clock },
      { href: "/seller/expenses", label: "အသုံးစရိတ်နှင့် အခွန်", icon: I.cash },
      { href: "/seller/reports", label: "အစီရင်ခံစာ", icon: I.chart },
    ],
  },
  {
    title: "ဆိုင်ဆက်တင်",
    items: [
      { href: "/seller/website", label: "ဝက်ဘ်ဆိုက်", icon: I.globe },
      { href: "/seller/domain", label: "Domain", icon: I.globe },
      { href: "/seller/channels", label: "ချန်နယ် ချိတ်ဆက်ရန်", icon: I.chat },
      { href: "/seller/delivery", label: "ပို့ခ သတ်မှတ်ရန်", icon: I.truck },
      { href: "/seller/staff", label: "ဝန်ထမ်းနှင့် အခွင့်အရေး", icon: I.people },
      { href: "/seller/notifications", label: "သတိပေးချက်များ", icon: I.chat },
      { href: "/seller/settings", label: "ဆက်တင်", icon: I.gear },
      { href: "/seller/billing", label: "ငွေပေးချေ / အစီအစဉ်", icon: I.card },
    ],
  },
  {
    title: "အမျိုးအစားအလိုက်",
    items: [
      { href: "/seller/kitchen", label: "အစားအစာ အော်ဒါ ဘုတ်", icon: I.list },
      { href: "/seller/bookings", label: "ဘွတ်ကင် ပြက္ခဒိန်", icon: I.clock },
      { href: "/seller/preorders", label: "Pre-order / Group-buy", icon: I.list },
      { href: "/seller/warranty", label: "အာမခံနှင့် လစဉ်ပေး", icon: I.shield },
      { href: "/seller/deals", label: "တန်ဖိုးကြီး အရောင်း", icon: I.tag },
      { href: "/seller/prescriptions", label: "ဆေးညွှန်း စစ်ဆေးရန်", icon: I.shield },
      { href: "/seller/wholesale", label: "လက်ကား / B2B", icon: I.box },
      { href: "/seller/grocery", label: "ကုန်စုံ အချိန်/အလေးချိန်", icon: I.box },
      { href: "/seller/furniture", label: "ပရိဘောဂ ပို့ဆောင်/တပ်ဆင်", icon: I.truck },
      { href: "/seller/produce", label: "စိုက်ပျိုးသီးနှံ နေ့စဉ်ဈေး", icon: I.tag },
      { href: "/seller/autoparts", label: "ကားပစ္စည်း တွဲဖက်နိုင်မှု", icon: I.gear },
    ],
  },
];

export const adminNav: NavGroup[] = [
  {
    title: "BingoMart အဖွဲ့",
    items: [
      { href: "/admin", label: "ဆိုင်များ စီမံရန်", icon: I.home },
      { href: "/admin/moderation", label: "AI အရည်အသွေး / စောင့်ကြည့်", icon: I.shield },
      { href: "/admin/support", label: "စတင်ခြင်းနှင့် ပံ့ပိုးမှု", icon: I.chat },
    ],
  },
];
