import type { ItemId } from "./links";

export type Lang = "en" | "my";

export const paths: Record<Lang, string> = { en: "/bingomart", my: "/bingomart/my" };

// Anchor ids. The Records below are keyed by these, so a missing translation fails the typecheck.
export const featureIds = ["shop", "chat-orders", "receipts", "delivery", "pos", "reports"] as const;
export const sellerIds = ["chat-sellers", "counter-shops", "shippers"] as const;
export const shopTypeIds = ["fashion", "beauty", "food"] as const;

type Pair = readonly [title: string, detail: string];
type Entry = { id: ItemId; label: string; detail: string };
export type MenuCopy = {
  label: string;
  groups: { eyebrow: string; items: Entry[] }[];
  footer: { id: ItemId; title: string; detail: string; cta: string };
};

// Text inside the product-story mockups. Kept here, not baked into images, so it translates.
export type StoryCopy = {
  lead: string;
  example: string;
  shop: { url: string; name: string; items: Pair[]; add: string };
  chat: { shopper1: string; ai1: string; shopper2: string; created: string; aiTag: string };
  receipt: { slip: string; fields: Pair[]; dup: string; approve: string; reject: string };
  delivery: { order: string; steps: string[]; eta: string };
  pos: { title: string; lines: Pair[]; total: Pair; offline: string; paid: string; stock: string };
  reports: { title: string; profit: Pair; best: Pair; slow: Pair; days: string[] };
};

export type Copy = {
  meta: { title: string; description: string };
  topbar: { label: string; back: string; switchLabel: string };
  nav: {
    home: string;
    label: string;
    mobileLabel: string;
    open: string;
    close: string;
    pricing: string;
    join: string;
    menus: MenuCopy[];
  };
  hero: {
    badge: string;
    title: string;
    sub?: string;
    body: string;
    join: string;
    see: string;
    preview: string;
    card: string;
    example: string;
    orders: { title: string; detail: string; state: string }[];
  };
  jobs: { title: string; items: Pair[] };
  features: { title: string; items: Record<(typeof featureIds)[number], Pair> };
  story: StoryCopy;
  who: {
    title: string;
    lead: string;
    items: Record<(typeof sellerIds)[number], readonly [title: string, pain: string, fix: string]>;
    typesTitle: string;
    types: Record<(typeof shopTypeIds)[number], Pair>;
  };
  myanmar: { title: string; items: Pair[] };
  how: { title: string; steps: Pair[] };
  pricing: { title: string; body: string };
  faq: { title: string; items: Pair[] };
  access: { title: string; body: string; join: string; survey: string };
  footer: { product: string; privacy: string };
};

const en: Copy = {
  meta: {
    title: "BingoMart: online shop for Myanmar sellers",
    description:
      "Sell, get paid and deliver from one place. BingoMart is the online shop for Myanmar sellers who take orders through chat. In development, early access open.",
  },
  topbar: { label: "BingoMart is a Bingo product", back: "Back to Bingo", switchLabel: "Language" },
  nav: {
    home: "BingoMart home",
    label: "BingoMart",
    mobileLabel: "BingoMart mobile",
    open: "Open menu",
    close: "Close menu",
    pricing: "Pricing",
    join: "Join early access",
    menus: [
      {
        label: "Product",
        groups: [
          {
            eyebrow: "Sell",
            items: [
              { id: "shop", label: "Web shop", detail: "A shop on your own web address." },
              { id: "chatOrders", label: "Chat orders", detail: "An AI assistant takes orders day and night." },
              { id: "pos", label: "Counter sales", detail: "A point of sale that works offline." },
            ],
          },
          {
            eyebrow: "Get paid and deliver",
            items: [
              { id: "receipts", label: "Receipt checks", detail: "Reads transfer slips and flags repeats." },
              { id: "delivery", label: "Delivery tracking", detail: "A link your shoppers can follow." },
              { id: "reports", label: "Profit reports", detail: "Best and slow sellers, by day or month." },
            ],
          },
        ],
        footer: { id: "demo", title: "See it working", detail: "Demo screens with example data.", cta: "Preview the app" },
      },
      {
        label: "Solutions",
        groups: [
          {
            eyebrow: "Who it's for",
            items: [
              { id: "chatSellers", label: "Chat sellers", detail: "Orders arrive on Telegram, Facebook or TikTok." },
              { id: "counterShops", label: "Shops with a counter", detail: "Sell in store and online from one stock list." },
              { id: "shippers", label: "Sellers who ship", detail: "Riders, couriers and bus gates." },
            ],
          },
          {
            eyebrow: "By shop type",
            items: [
              { id: "fashion", label: "Fashion", detail: "Sizes and colours for every item." },
              { id: "beauty", label: "Beauty", detail: "Shades, sets and repeat buyers." },
              { id: "food", label: "Food", detail: "Daily orders and your own riders." },
            ],
          },
        ],
        footer: { id: "myanmar", title: "Built for Myanmar", detail: "Kyat, Burmese and weak internet.", cta: "See why" },
      },
      {
        label: "Resources",
        groups: [
          {
            eyebrow: "Learn",
            items: [
              { id: "how", label: "How it works", detail: "Open a shop in three steps." },
              { id: "demo", label: "App preview", detail: "Click through the demo screens." },
              { id: "survey", label: "Seller survey", detail: "Tell us how you sell today. In Burmese." },
              { id: "faq", label: "Questions", detail: "Cost, offline use and the AI, answered." },
            ],
          },
          {
            eyebrow: "Company",
            items: [
              { id: "about", label: "About Bingo", detail: "The company behind BingoMart." },
              { id: "contact", label: "Contact", detail: "Talk to the team." },
              { id: "privacy", label: "Privacy", detail: "How we handle your data." },
            ],
          },
        ],
        footer: { id: "access", title: "Early access", detail: "Yangon and Mandalay shops first.", cta: "Join" },
      },
    ],
  },
  hero: {
    badge: "In development · Early access open",
    title: "Sell, get paid and deliver from one place.",
    // Draft Burmese: needs a native speaker's check.
    sub: "သင့်ဆိုင်ကို တစ်နေရာတည်းမှာ စီမံပါ",
    body: "The online shop for Myanmar sellers who take orders through chat. Fashion, beauty and food shops come first.",
    join: "Join early access",
    see: "See what it does",
    preview: "Preview the app (demo)",
    card: "Today in your shop",
    example: "Example data",
    orders: [
      { title: "Order #1042 · Telegram", detail: "45,000 MMK · taken by the AI assistant", state: "Receipt to approve" },
      { title: "Order #1041 · Web shop", detail: "28,500 MMK · bus gate to Mandalay", state: "2 to 3 days" },
      { title: "Order #1040 · Counter sale", detail: "12,000 MMK · saved offline, synced later", state: "Paid" },
    ],
  },
  jobs: {
    title: "Three jobs that eat a shop owner's day",
    items: [
      ["Orders buried in chats", "Orders arrive as messages, at all hours, and some get lost."],
      ["Receipts to check by hand", "Every transfer slip needs a look, and some are fake or reused."],
      ["Parcels nobody can track", "Riders, couriers and bus gates, and shoppers keep asking where it is."],
    ],
  },
  features: {
    title: "What BingoMart will do for your shop",
    items: {
      shop: ["A shop on your own web address", "A storefront built from templates for your category. Share the link anywhere."],
      "chat-orders": [
        "Orders from chat and the web",
        "An AI assistant answers shoppers day and night, takes orders and calls you when a person is needed.",
      ],
      receipts: [
        "Receipts checked, you decide",
        "BingoMart reads the amount, date and transaction ID and flags repeats. You approve.",
      ],
      delivery: [
        "Parcels shoppers can follow",
        "Your rider, a courier or a bus gate: record each step and show a delivery window.",
      ],
      pos: [
        "Counter sales and stock",
        "A point of sale that keeps working when the internet drops, with stock and cost price in one list.",
      ],
      reports: ["Reports that show profit", "Income, profit, best sellers and slow sellers, by day, month or year."],
    },
  },
  story: {
    lead: "Six jobs, one app. Tap a step to see the screen.",
    example: "Example data",
    shop: {
      url: "your-shop-name.com",
      name: "Thiri Fashion",
      items: [
        ["Black dress", "25,000 MMK"],
        ["Linen shirt", "18,500 MMK"],
        ["Silk scarf", "9,000 MMK"],
      ],
      add: "Order",
    },
    chat: {
      shopper1: "Is the black dress in size M?",
      ai1: "Yes, one left in M. 25,000 MMK. Shall I take your order?",
      shopper2: "Yes please, to Mandalay.",
      created: "Order #1042 made · waiting for the receipt",
      aiTag: "AI assistant",
    },
    receipt: {
      slip: "Transfer slip",
      fields: [
        ["Amount", "45,000 MMK"],
        ["Date", "7 Nov, 9:14 PM"],
        ["Transaction ID", "…4821"],
      ],
      dup: "This transaction ID was used on order #1038.",
      approve: "Approve",
      reject: "Reject",
    },
    delivery: {
      order: "Order #1041 · to Mandalay",
      steps: ["Packed", "At the bus gate", "On the way", "Delivered"],
      eta: "Arrives in 2 to 3 days",
    },
    pos: {
      title: "Counter sale",
      lines: [
        ["Linen shirt × 1", "18,500"],
        ["Silk scarf × 1", "9,000"],
      ],
      total: ["Total", "27,500 MMK"],
      offline: "Offline · saved, syncs later",
      paid: "Mark paid",
      stock: "Silk scarf: 4 left",
    },
    reports: {
      title: "This week",
      profit: ["Profit", "312,000 MMK"],
      best: ["Best seller", "Black dress"],
      slow: ["Slow seller", "Red scarf"],
      days: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
  who: {
    title: "Who BingoMart is for",
    lead: "Small shops that sell through chat. Yangon and Mandalay first.",
    items: {
      "chat-sellers": [
        "Chat sellers",
        "Orders get lost between messages.",
        "Every chat order lands in one list, and the AI assistant answers while you sleep.",
      ],
      "counter-shops": [
        "Shops with a counter",
        "Stock in a notebook, sales in two places.",
        "One stock list for the counter and the web shop. The counter keeps working offline.",
      ],
      shippers: [
        "Sellers who ship",
        "“Where is my parcel?” all day.",
        "Record each step and send shoppers a tracking link with a delivery window.",
      ],
    },
    typesTitle: "First shop types",
    types: {
      fashion: ["Fashion", "Sizes and colours on every item, and new drops shared as one link."],
      beauty: ["Beauty", "Shades and sets, with best sellers and slow sellers in your reports."],
      food: ["Food", "Daily orders from chat, delivered by your own riders."],
    },
  },
  myanmar: {
    title: "Built for how Myanmar sells",
    items: [
      ["Burmese first", "Prices in kyat, in Burmese and English."],
      ["Works on weak internet", "Record sales and parcel steps offline. They sync later."],
      ["Chat where shoppers are", "Web chat and Telegram first, then Messenger and Viber."],
      ["You stay in control", "The AI says it is an AI, and you approve every receipt."],
    ],
  },
  how: {
    title: "How opening a shop will work",
    steps: [
      ["Sign up with your phone", "Pick your category: fashion, beauty or food."],
      ["Add your products", "Type them in, import a spreadsheet, or ask our team to set up for you."],
      ["Share your shop link", "Connect web chat and Telegram, then take your first order."],
    ],
  },
  pricing: {
    title: "Pricing",
    body: "We plan a free way to open your shop, with paid plans for more. Prices in kyat come after we test with real shops.",
  },
  faq: {
    title: "Questions, answered.",
    items: [
      [
        "Do I need to know computers or code?",
        "No. Sign up with your phone and pick your shop type. Add products by typing, from a spreadsheet, or ask our team to set up for you.",
      ],
      [
        "Does the AI answer shoppers without me?",
        "It answers and takes orders day and night. It says it is an AI, and it calls you when a person is needed. You approve every receipt.",
      ],
      ["What if the internet drops?", "Counter sales and parcel steps save offline and sync when you are back online."],
      ["Which chat apps does it work with?", "Web chat and Telegram first, then Messenger and Viber."],
      [
        "How much will it cost?",
        "We plan a free way to open your shop, with paid plans for more. Prices in kyat come after we test with real shops.",
      ],
      ["When can I start?", "Early access is open now. Shops in Yangon and Mandalay come first. Leave your details below."],
    ],
  },
  access: {
    title: "Be one of our first shops",
    body: "Leave your contact details, or take the short survey to tell us how you sell today. Both forms are in Burmese.",
    join: "Join early access",
    survey: "Take the seller survey",
  },
  footer: { product: "A product of Bingo", privacy: "Privacy" },
};

// Draft Burmese for the whole page. NOT reviewed by a native speaker yet: have one check the
// wording, the kyat and AI terms, and the tone (spoken style, like a shop talking to a shopper).
// Digits stay Latin so prices and order numbers match the English page.
const my: Copy = {
  meta: {
    title: "BingoMart: မြန်မာရောင်းသူတွေအတွက် အွန်လိုင်းဆိုင်",
    description:
      "ရောင်းမယ်၊ ငွေရမယ်၊ ပို့မယ် — တစ်နေရာတည်းမှာ။ BingoMart ဟာ ချတ်ကနေ အော်ဒါလက်ခံတဲ့ မြန်မာရောင်းသူတွေအတွက် အွန်လိုင်းဆိုင်ပါ။ ဖန်တီးနေဆဲဖြစ်ပြီး စောစီးစွာ ပါဝင်ခွင့် ဖွင့်ထားပါတယ်။",
  },
  topbar: { label: "BingoMart သည် Bingo ၏ ထုတ်ကုန်တစ်ခု ဖြစ်သည်", back: "Bingo သို့ ပြန်သွားရန်", switchLabel: "ဘာသာစကား" },
  nav: {
    home: "BingoMart ပင်မစာမျက်နှာ",
    label: "BingoMart",
    mobileLabel: "BingoMart မိုဘိုင်းမီနူး",
    open: "မီနူးဖွင့်ရန်",
    close: "မီနူးပိတ်ရန်",
    pricing: "ဈေးနှုန်း",
    join: "စောစီးစွာ ပါဝင်ရန်",
    menus: [
      {
        label: "လုပ်ဆောင်ချက်များ",
        groups: [
          {
            eyebrow: "ရောင်းချရန်",
            items: [
              { id: "shop", label: "ဝက်ဘ်ဆိုင်", detail: "သင့်ကိုယ်ပိုင် ဝက်ဘ်လိပ်စာနဲ့ ဆိုင်။" },
              { id: "chatOrders", label: "ချတ်အော်ဒါ", detail: "AI အကူက နေ့ညမရွေး အော်ဒါလက်ခံပေးသည်။" },
              { id: "pos", label: "ဆိုင်ရှေ့ရောင်းချမှု", detail: "အော့ဖ်လိုင်းမှာလည်း အလုပ်လုပ်သည်။" },
            ],
          },
          {
            eyebrow: "ငွေရယူပြီး ပို့ဆောင်ရန်",
            items: [
              { id: "receipts", label: "ပြေစာစစ်ဆေးမှု", detail: "ငွေလွှဲပြေစာကို ဖတ်ပြီး ထပ်နေတာကို အမှတ်အသားပြသည်။" },
              { id: "delivery", label: "ပို့ဆောင်မှု ခြေရာခံခြင်း", detail: "ဝယ်သူတွေ လိုက်ကြည့်နိုင်တဲ့ လင့်ခ်။" },
              { id: "reports", label: "အမြတ်အစီရင်ခံစာ", detail: "ရက်၊ လအလိုက် အရောင်းရဆုံးနဲ့ နှေးတာတွေ။" },
            ],
          },
        ],
        footer: { id: "demo", title: "လက်တွေ့ကြည့်ရန်", detail: "နမူနာဒေတာနဲ့ ဒီမိုစခရင်များ။", cta: "အက်ပ်ကို ကြိုကြည့်ရန်" },
      },
      {
        label: "ဖြေရှင်းချက်များ",
        groups: [
          {
            eyebrow: "ဘယ်သူတွေအတွက်လဲ",
            items: [
              { id: "chatSellers", label: "ချတ်ရောင်းသူများ", detail: "Telegram၊ Facebook၊ TikTok ကနေ အော်ဒါဝင်လာသူများ။" },
              { id: "counterShops", label: "ဆိုင်ခန်းရှိတဲ့ ဆိုင်များ", detail: "ဆိုင်ရော အွန်လိုင်းပါ ကုန်စာရင်းတစ်ခုတည်းနဲ့ ရောင်းပါ။" },
              { id: "shippers", label: "ပို့ဆောင်ရတဲ့ ရောင်းသူများ", detail: "ပို့ဆောင်ရေးသမား၊ ကိုရီယာနဲ့ ဘတ်စ်ကားဂိတ်များ။" },
            ],
          },
          {
            eyebrow: "ဆိုင်အမျိုးအစားအလိုက်",
            items: [
              { id: "fashion", label: "ဖက်ရှင်", detail: "ပစ္စည်းတိုင်း အရွယ်အစားနဲ့ အရောင်ပါ။" },
              { id: "beauty", label: "အလှကုန်", detail: "အရောင်အသွေး၊ အစုံလိုက်နဲ့ ပြန်ဝယ်သူများ။" },
              { id: "food", label: "အစားအသောက်", detail: "နေ့စဉ်အော်ဒါနဲ့ ကိုယ်ပိုင် ပို့ဆောင်ရေးသမားများ။" },
            ],
          },
        ],
        footer: { id: "myanmar", title: "မြန်မာအတွက် ရည်ရွယ်ဖန်တီးသည်", detail: "ကျပ်၊ မြန်မာဘာသာနဲ့ အင်တာနက်အားနည်းမှု။", cta: "ကြည့်ရန်" },
      },
      {
        label: "အရင်းအမြစ်များ",
        groups: [
          {
            eyebrow: "လေ့လာရန်",
            items: [
              { id: "how", label: "ဘယ်လိုအလုပ်လုပ်လဲ", detail: "ဆိုင်ကို အဆင့်သုံးဆင့်နဲ့ ဖွင့်ပါ။" },
              { id: "demo", label: "အက်ပ်ကြိုကြည့်ရန်", detail: "ဒီမိုစခရင်တွေကို နှိပ်ကြည့်ပါ။" },
              { id: "survey", label: "ရောင်းသူစစ်တမ်း", detail: "အခု ဘယ်လိုရောင်းနေလဲ ပြောပြပါ။ မြန်မာဘာသာနဲ့။" },
              { id: "faq", label: "မေးခွန်းများ", detail: "ဈေးနှုန်း၊ အော့ဖ်လိုင်းနဲ့ AI အကြောင်း အဖြေများ။" },
            ],
          },
          {
            eyebrow: "ကုမ္ပဏီ",
            items: [
              { id: "about", label: "Bingo အကြောင်း", detail: "BingoMart နောက်ကွယ်က ကုမ္ပဏီ။" },
              { id: "contact", label: "ဆက်သွယ်ရန်", detail: "ကျွန်ုပ်တို့အဖွဲ့နဲ့ စကားပြောပါ။" },
              { id: "privacy", label: "ကိုယ်ရေးအချက်အလက်မူဝါဒ", detail: "သင့်ဒေတာကို ကျွန်ုပ်တို့ ဘယ်လိုကိုင်တွယ်လဲ။" },
            ],
          },
        ],
        footer: { id: "access", title: "စောစီးစွာ ပါဝင်ခွင့်", detail: "ရန်ကုန်နဲ့ မန္တလေးဆိုင်တွေကို အရင်စတင်မည်။", cta: "ပါဝင်ရန်" },
      },
    ],
  },
  hero: {
    badge: "ဖန်တီးနေဆဲ · စောစီးစွာ ပါဝင်ခွင့် ဖွင့်ထားသည်",
    title: "ရောင်းမယ်၊ ငွေရမယ်၊ ပို့မယ် — တစ်နေရာတည်းမှာ။",
    body: "ချတ်ကနေ အော်ဒါလက်ခံတဲ့ မြန်မာရောင်းသူတွေအတွက် အွန်လိုင်းဆိုင်။ ဖက်ရှင်၊ အလှကုန်နဲ့ အစားအသောက်ဆိုင်တွေကို အရင်ဆုံး စတင်ပါမယ်။",
    join: "စောစီးစွာ ပါဝင်ရန်",
    see: "ဘာတွေလုပ်ပေးလဲ ကြည့်ရန်",
    preview: "အက်ပ်ကို ကြိုကြည့်ရန် (နမူနာ)",
    card: "ဒီနေ့ သင့်ဆိုင်မှာ",
    example: "နမူနာဒေတာ",
    orders: [
      { title: "အော်ဒါ #1042 · Telegram", detail: "45,000 ကျပ် · AI အကူက လက်ခံထားသည်", state: "ပြေစာ အတည်ပြုရန်" },
      { title: "အော်ဒါ #1041 · ဝက်ဘ်ဆိုင်", detail: "28,500 ကျပ် · မန္တလေးသို့ ဘတ်စ်ကားဂိတ်မှ", state: "2 ရက်မှ 3 ရက်" },
      { title: "အော်ဒါ #1040 · ဆိုင်ရှေ့ရောင်းချမှု", detail: "12,000 ကျပ် · အော့ဖ်လိုင်းမှာ သိမ်းပြီး နောက်မှ ချိတ်ဆက်သည်", state: "ငွေရပြီး" },
    ],
  },
  jobs: {
    title: "ဆိုင်ရှင်ရဲ့ နေ့တာကို စားသုံးနေတဲ့ အလုပ်သုံးခု",
    items: [
      ["ချတ်ထဲမှာ ပိတ်မိနေတဲ့ အော်ဒါများ", "အော်ဒါတွေက မက်ဆေ့ချ်အနေနဲ့ အချိန်မရွေး ဝင်လာပြီး တချို့ ပျောက်သွားတတ်ပါတယ်။"],
      ["လက်နဲ့ စစ်ရတဲ့ ငွေလွှဲပြေစာများ", "ငွေလွှဲပြေစာတိုင်းကို ကြည့်ရပြီး တချို့က အတု ဒါမှမဟုတ် ထပ်သုံးထားတာ ဖြစ်တတ်ပါတယ်။"],
      ["ဘယ်သူမှ မခြေရာခံနိုင်တဲ့ ပါဆယ်များ", "ပို့ဆောင်ရေးသမား၊ ကိုရီယာနဲ့ ဘတ်စ်ကားဂိတ်တွေ ကြားမှာ ဝယ်သူတွေက ဘယ်ရောက်ပြီလဲ ဆိုပြီး မေးနေတတ်ပါတယ်။"],
    ],
  },
  features: {
    title: "BingoMart က သင့်ဆိုင်အတွက် ဘာတွေလုပ်ပေးမလဲ",
    items: {
      shop: [
        "သင့်ကိုယ်ပိုင် ဝက်ဘ်လိပ်စာနဲ့ ဆိုင်",
        "သင့်ဆိုင်အမျိုးအစားအတွက် နမူနာပုံစံတွေနဲ့ တည်ဆောက်ထားတဲ့ ဆိုင်စာမျက်နှာ။ လင့်ခ်ကို ဘယ်နေရာမှာမဆို မျှဝေနိုင်ပါတယ်။",
      ],
      "chat-orders": [
        "ချတ်နဲ့ ဝက်ဘ်ကလာတဲ့ အော်ဒါများ",
        "နေ့ရောညပါ ဝယ်သူတွေကို AI အကူက ပြန်ဖြေပေးပြီး အော်ဒါလက်ခံကာ လူကိုယ်တိုင် လိုအပ်ရင် သင့်ကို အကြောင်းကြားပါတယ်။",
      ],
      receipts: [
        "ပြေစာကို စစ်ပေးပြီး ဆုံးဖြတ်ချက်က သင့်ဆီမှာ",
        "BingoMart က ငွေပမာဏ၊ ရက်စွဲနဲ့ ငွေလွှဲအမှတ်ကို ဖတ်ပြီး ထပ်နေတာတွေကို အမှတ်အသားပြပေးပါတယ်။ အတည်ပြုတာကတော့ သင်ပါ။",
      ],
      delivery: [
        "ဝယ်သူတွေ လိုက်ကြည့်နိုင်တဲ့ ပါဆယ်များ",
        "သင့်ပို့ဆောင်ရေးသမား၊ ကိုရီယာ ဒါမှမဟုတ် ဘတ်စ်ကားဂိတ် — အဆင့်တိုင်းကို မှတ်တမ်းတင်ပြီး ရောက်မည့်အချိန်ကာလကို ပြပေးပါတယ်။",
      ],
      pos: [
        "ဆိုင်ရှေ့ရောင်းချမှုနဲ့ ကုန်လက်ကျန်",
        "အင်တာနက်ပြတ်သွားရင်တောင် ဆက်အလုပ်လုပ်တဲ့ ရောင်းချမှုစနစ်။ ကုန်လက်ကျန်နဲ့ ဝယ်ဈေးကို စာရင်းတစ်ခုတည်းမှာ ထားနိုင်ပါတယ်။",
      ],
      reports: [
        "အမြတ်ကို ပြတဲ့ အစီရင်ခံစာများ",
        "ဝင်ငွေ၊ အမြတ်၊ အရောင်းရဆုံးနဲ့ အရောင်းနှေးတဲ့ ကုန်ပစ္စည်းတွေကို ရက်၊ လ၊ နှစ်အလိုက် ကြည့်နိုင်ပါတယ်။",
      ],
    },
  },
  story: {
    lead: "အလုပ်ခြောက်ခု၊ အက်ပ်တစ်ခု။ အဆင့်တစ်ခုကို နှိပ်ပြီး စခရင်ကို ကြည့်ပါ။",
    example: "နမူနာဒေတာ",
    shop: {
      url: "your-shop-name.com",
      name: "Thiri Fashion",
      items: [
        ["အနက်ရောင် ဂါဝန်", "25,000 ကျပ်"],
        ["လင်နင် ရှပ်အင်္ကျီ", "18,500 ကျပ်"],
        ["ပိုးပဝါ", "9,000 ကျပ်"],
      ],
      add: "မှာမည်",
    },
    chat: {
      shopper1: "အနက်ရောင် ဂါဝန် M ဆိုဒ် ရှိလား။",
      ai1: "ရှိပါတယ်၊ M တစ်ထည်ပဲ ကျန်ပါတော့တယ်။ 25,000 ကျပ်ပါ။ အော်ဒါ တင်ပေးရမလား။",
      shopper2: "ဟုတ်ကဲ့၊ မန္တလေးကို ပို့ပေးပါ။",
      created: "အော်ဒါ #1042 တင်ပြီး · ပြေစာ စောင့်နေသည်",
      aiTag: "AI အကူ",
    },
    receipt: {
      slip: "ငွေလွှဲပြေစာ",
      fields: [
        ["ငွေပမာဏ", "45,000 ကျပ်"],
        ["ရက်စွဲ", "7 နိုဝင်ဘာ၊ ည 9:14"],
        ["ငွေလွှဲအမှတ်", "…4821"],
      ],
      dup: "ဒီငွေလွှဲအမှတ်ကို အော်ဒါ #1038 မှာ သုံးပြီးသားပါ။",
      approve: "အတည်ပြုမည်",
      reject: "ငြင်းမည်",
    },
    delivery: {
      order: "အော်ဒါ #1041 · မန္တလေးသို့",
      steps: ["ထုပ်ပိုးပြီး", "ဘတ်စ်ကားဂိတ်ရောက်", "လမ်းမှာ", "ရောက်ပြီ"],
      eta: "2 ရက်မှ 3 ရက်အတွင်း ရောက်မည်",
    },
    pos: {
      title: "ဆိုင်ရှေ့ရောင်းချမှု",
      lines: [
        ["လင်နင် ရှပ်အင်္ကျီ × 1", "18,500"],
        ["ပိုးပဝါ × 1", "9,000"],
      ],
      total: ["စုစုပေါင်း", "27,500 ကျပ်"],
      offline: "အော့ဖ်လိုင်း · သိမ်းထားပြီး နောက်မှ ချိတ်ဆက်မည်",
      paid: "ငွေရပြီ",
      stock: "ပိုးပဝါ: 4 ထည် ကျန်",
    },
    reports: {
      title: "ဒီအပတ်",
      profit: ["အမြတ်", "312,000 ကျပ်"],
      best: ["အရောင်းရဆုံး", "အနက်ရောင် ဂါဝန်"],
      slow: ["အရောင်းနှေး", "အနီရောင် ပဝါ"],
      days: ["တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓ", "ကြာ", "သော", "စနေ", "တနင်္ဂ"],
    },
  },
  who: {
    title: "BingoMart ကို ဘယ်သူတွေအတွက် လုပ်ထားလဲ",
    lead: "ချတ်ကတစ်ဆင့် ရောင်းတဲ့ ဆိုင်ငယ်တွေအတွက်။ ရန်ကုန်နဲ့ မန္တလေးကို အရင်စတင်ပါမယ်။",
    items: {
      "chat-sellers": [
        "ချတ်ရောင်းသူများ",
        "အော်ဒါတွေ မက်ဆေ့ချ်ကြားမှာ ပျောက်သွားတတ်တယ်။",
        "ချတ်ကလာတဲ့ အော်ဒါတိုင်းဟာ စာရင်းတစ်ခုထဲ ရောက်လာပြီး သင်အိပ်နေချိန်မှာ AI အကူက ပြန်ဖြေပေးပါတယ်။",
      ],
      "counter-shops": [
        "ဆိုင်ခန်းရှိတဲ့ ဆိုင်များ",
        "ကုန်လက်ကျန်က စာအုပ်ထဲမှာ၊ အရောင်းက နှစ်နေရာမှာ။",
        "ဆိုင်ရှေ့နဲ့ ဝက်ဘ်ဆိုင်အတွက် ကုန်လက်ကျန်စာရင်း တစ်ခုတည်း။ ဆိုင်ရှေ့ရောင်းချမှုက အော့ဖ်လိုင်းမှာလည်း ဆက်အလုပ်လုပ်ပါတယ်။",
      ],
      shippers: [
        "ပို့ဆောင်ရတဲ့ ရောင်းသူများ",
        "“ပါဆယ် ဘယ်ရောက်ပြီလဲ” ဆိုပြီး တစ်နေ့လုံး မေးခံရတာ။",
        "အဆင့်တိုင်းကို မှတ်တမ်းတင်ပြီး ရောက်မည့်အချိန်ကာလပါတဲ့ ခြေရာခံလင့်ခ်ကို ဝယ်သူတွေဆီ ပို့ပေးပါတယ်။",
      ],
    },
    typesTitle: "စတင်မည့် ဆိုင်အမျိုးအစားများ",
    types: {
      fashion: ["ဖက်ရှင်", "ပစ္စည်းတိုင်းမှာ အရွယ်အစားနဲ့ အရောင်တွေ ထည့်နိုင်ပြီး ကုန်သစ်တွေကို လင့်ခ်တစ်ခုတည်းနဲ့ မျှဝေနိုင်ပါတယ်။"],
      beauty: ["အလှကုန်", "အရောင်အသွေးတွေနဲ့ အစုံလိုက်ရောင်းမှုတွေ ပါဝင်ပြီး အရောင်းရဆုံးနဲ့ နှေးတာတွေကို အစီရင်ခံစာမှာ တွေ့ရပါမယ်။"],
      food: ["အစားအသောက်", "နေ့စဉ် ချတ်ကလာတဲ့ အော်ဒါတွေကို သင့်ကိုယ်ပိုင် ပို့ဆောင်ရေးသမားတွေနဲ့ ပို့ပေးနိုင်ပါတယ်။"],
    },
  },
  myanmar: {
    title: "မြန်မာရောင်းချပုံနဲ့ ကိုက်ညီအောင် လုပ်ထားသည်",
    items: [
      ["မြန်မာဘာသာ ဦးစားပေး", "ဈေးနှုန်းတွေကို ကျပ်နဲ့၊ မြန်မာနဲ့ အင်္ဂလိပ်လို ပြပါတယ်။"],
      ["အင်တာနက်အားနည်းလည်း အလုပ်လုပ်", "ရောင်းချမှုနဲ့ ပါဆယ်အဆင့်တွေကို အော့ဖ်လိုင်းမှာ မှတ်တမ်းတင်နိုင်ပြီး နောက်မှ ချိတ်ဆက်ပါတယ်။"],
      ["ဝယ်သူတွေရှိတဲ့နေရာမှာ ချတ်", "ဝက်ဘ်ချတ်နဲ့ Telegram ကို အရင်စတင်ပြီး နောက် Messenger နဲ့ Viber ကို ထပ်ထည့်ပါမယ်။"],
      ["ထိန်းချုပ်မှုက သင့်ဆီမှာ", "AI က ကိုယ်ဟာ AI ဖြစ်ကြောင်း ပြောပြီး ပြေစာတိုင်းကို သင်က အတည်ပြုပါတယ်။"],
    ],
  },
  how: {
    title: "ဆိုင်ဖွင့်ပုံ အဆင့်များ",
    steps: [
      ["ဖုန်းနံပါတ်နဲ့ စာရင်းသွင်းပါ", "ဖက်ရှင်၊ အလှကုန် ဒါမှမဟုတ် အစားအသောက် — သင့်အမျိုးအစားကို ရွေးပါ။"],
      ["ကုန်ပစ္စည်းတွေ ထည့်ပါ", "ကိုယ်တိုင်ရိုက်ထည့်ပါ၊ စာရင်းဇယားဖိုင်ကနေ ထည့်ပါ၊ ဒါမှမဟုတ် ကျွန်ုပ်တို့အဖွဲ့ကို တည်ဆောက်ပေးခိုင်းပါ။"],
      ["ဆိုင်လင့်ခ်ကို မျှဝေပါ", "ဝက်ဘ်ချတ်နဲ့ Telegram ကို ချိတ်ဆက်ပြီး ပထမဆုံး အော်ဒါကို လက်ခံပါ။"],
    ],
  },
  pricing: {
    title: "ဈေးနှုန်း",
    body: "ဆိုင်ဖွင့်ဖို့ အခမဲ့နည်းလမ်းတစ်ခုနဲ့ ပိုမိုလိုအပ်သူတွေအတွက် ပေးချေရတဲ့ အစီအစဉ်တွေကို စီစဉ်ထားပါတယ်။ ကျပ်နဲ့ ဈေးနှုန်းတွေကို အစစ်အမှန်ဆိုင်တွေနဲ့ စမ်းသပ်ပြီးမှ ကြေညာပါမယ်။",
  },
  faq: {
    title: "မေးလေ့ရှိသော မေးခွန်းများ",
    items: [
      [
        "ကွန်ပျူတာ ဒါမှမဟုတ် ကုဒ်ရေးတာ သိဖို့ လိုသလား။",
        "မလိုပါ။ ဖုန်းနံပါတ်နဲ့ စာရင်းသွင်းပြီး ဆိုင်အမျိုးအစားကို ရွေးပါ။ ကုန်ပစ္စည်းတွေကို ကိုယ်တိုင်ရိုက်ထည့်ပါ၊ စာရင်းဇယားဖိုင်ကနေ ထည့်ပါ၊ ဒါမှမဟုတ် ကျွန်ုပ်တို့အဖွဲ့ကို တည်ဆောက်ပေးခိုင်းပါ။",
      ],
      [
        "AI က ကျွန်ုပ်မပါဘဲ ဝယ်သူတွေကို ပြန်ဖြေသလား။",
        "နေ့ရောညပါ ပြန်ဖြေပြီး အော်ဒါလက်ခံပါတယ်။ ကိုယ်ဟာ AI ဖြစ်ကြောင်း ပြောပြီး လူကိုယ်တိုင် လိုအပ်ရင် သင့်ကို အကြောင်းကြားပါတယ်။ ပြေစာတိုင်းကို သင်က အတည်ပြုပါတယ်။",
      ],
      ["အင်တာနက် ပြတ်သွားရင် ဘာဖြစ်မလဲ။", "ဆိုင်ရှေ့ရောင်းချမှုနဲ့ ပါဆယ်အဆင့်တွေကို အော့ဖ်လိုင်းမှာ သိမ်းထားပြီး အင်တာနက် ပြန်ရလာရင် ချိတ်ဆက်ပါတယ်။"],
      ["ဘယ်ချတ်အက်ပ်တွေနဲ့ သုံးလို့ရလဲ။", "ဝက်ဘ်ချတ်နဲ့ Telegram ကို အရင်စတင်ပြီး နောက် Messenger နဲ့ Viber ကို ထပ်ထည့်ပါမယ်။"],
      [
        "ဘယ်လောက် ကုန်ကျမလဲ။",
        "ဆိုင်ဖွင့်ဖို့ အခမဲ့နည်းလမ်းတစ်ခုနဲ့ ပိုမိုလိုအပ်သူတွေအတွက် ပေးချေရတဲ့ အစီအစဉ်တွေကို စီစဉ်ထားပါတယ်။ ကျပ်နဲ့ ဈေးနှုန်းတွေကို အစစ်အမှန်ဆိုင်တွေနဲ့ စမ်းသပ်ပြီးမှ ကြေညာပါမယ်။",
      ],
      ["ဘယ်တော့ စသုံးလို့ရမလဲ။", "စောစီးစွာ ပါဝင်ခွင့် အခု ဖွင့်ထားပါတယ်။ ရန်ကုန်နဲ့ မန္တလေးဆိုင်တွေကို အရင်စတင်ပါမယ်။ အောက်မှာ သင့်အချက်အလက်ကို ထားခဲ့ပါ။"],
    ],
  },
  access: {
    title: "ကျွန်ုပ်တို့ရဲ့ ပထမဆုံးဆိုင်တွေထဲက တစ်ဆိုင် ဖြစ်ပါ",
    body: "သင့်ဆက်သွယ်ရန်အချက်အလက်ကို ထားခဲ့ပါ၊ ဒါမှမဟုတ် အခုလက်ရှိ ဘယ်လိုရောင်းနေလဲဆိုတာ ပြောပြဖို့ စစ်တမ်းတို ဖြေပါ။ ပုံစံနှစ်ခုလုံးက မြန်မာဘာသာနဲ့ ဖြစ်ပါတယ်။",
    join: "စောစီးစွာ ပါဝင်ရန်",
    survey: "ရောင်းသူစစ်တမ်း ဖြေရန်",
  },
  footer: { product: "Bingo ၏ ထုတ်ကုန်", privacy: "ကိုယ်ရေးအချက်အလက်မူဝါဒ" },
};

export const copy: Record<Lang, Copy> = { en, my };
