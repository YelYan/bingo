import type { featureIds, Lang } from "./copy";

// One page per feature, Foundable-style: hook, a looping walk-through, the pain sellers stopped noticing,
// three steps, six tiles, a short FAQ. Every claim repeats one the landing page already makes.
// Burmese: unreviewed draft, same as copy.ts.

export const featureSlugs = [
  "web-shop",
  "chat-orders",
  "receipt-checks",
  "counter-sales",
  "delivery-tracking",
  "profit-reports",
] as const;
export type Slug = (typeof featureSlugs)[number];

// Landing-page anchor -> feature page, so the product story can link each step to its page.
export const slugByAnchor: Record<(typeof featureIds)[number], Slug> = {
  shop: "web-shop",
  "chat-orders": "chat-orders",
  receipts: "receipt-checks",
  pos: "counter-sales",
  delivery: "delivery-tracking",
  reports: "profit-reports",
};

type Pair = readonly [string, string];

export type SceneCopy = {
  "web-shop": {
    pick: string;
    types: string[];
    building: string;
    url: string;
    shopName: string;
    items: Pair[];
    add: string;
    copied: string;
    share: string;
    newOrder: string;
  };
  "chat-orders": {
    time: string;
    shopper1: string;
    typing: string;
    ai1: string;
    shopper2: string;
    created: string;
    handover: string;
    aiTag: string;
  };
  "receipt-checks": {
    slip: string;
    scanning: string;
    fields: Pair[];
    dup: string;
    approve: string;
    reject: string;
    approved: string;
  };
  "counter-sales": {
    title: string;
    lines: Pair[];
    total: Pair;
    offline: string;
    saved: string;
    online: string;
    synced: string;
    paid: string;
    stockBefore: string;
    stockAfter: string;
  };
  "delivery-tracking": {
    chatQ: string;
    chatA: string;
    order: string;
    steps: string[];
    eta: string;
  };
  "profit-reports": {
    title: string;
    profit: Pair;
    days: string[];
    best: Pair;
    slow: Pair;
    restock: string;
  };
};

export type FeatureCopy<S extends Slug = Slug> = {
  name: string;
  title: Pair; // second half gets the accent colour
  lead: string;
  description: string; // meta description
  pain: Pair[];
  how: Pair[];
  handles: Pair[];
  faq: Pair[];
  scene: SceneCopy[S];
};

export type FeatureShared = {
  painTitle: string;
  howTitle: string;
  handlesTitle: string;
  faqTitle: string;
  closing: string;
  closingLead: string;
  join: string;
  demo: string;
  more: string;
  all: string;
  play: string;
  pause: string;
  example: string;
  watch: string;
  seeHow: string;
};

type FeatureSet = { shared: FeatureShared; items: { [S in Slug]: FeatureCopy<S> } };

const en: FeatureSet = {
  shared: {
    painTitle: "What it costs you today",
    howTitle: "How it works",
    handlesTitle: "What it handles",
    faqTitle: "Questions",
    closing: "Ready when your shop is.",
    closingLead: "Early access is open. Shops in Yangon and Mandalay come first.",
    join: "Join early access",
    demo: "Preview the app",
    more: "More of BingoMart",
    all: "All features",
    play: "Play",
    pause: "Pause",
    example: "Example data",
    watch: "Watch it work",
    seeHow: "See how it works",
  },
  items: {
    "web-shop": {
      name: "Web shop",
      title: ["Your shop,", "open all night."],
      lead: "A real shop on your own web address. Shoppers browse, pick a size and order without sending you a single message.",
      description: "A BingoMart web shop: your own address, products in kyat, orders in one list. For Myanmar sellers.",
      pain: [
        ["The same “how much?” all day", "Every post brings the same questions. Each answer is a minute you never get back."],
        ["Your best photos sink in the feed", "Yesterday's post is already buried. Shoppers can't find what you sold last week."],
        ["Shoppers who never message", "Some people won't message a stranger. They scroll past, and you never know they were there."],
      ],
      how: [
        ["Pick your shop type", "Fashion, beauty or food. The layout fits it."],
        ["Add your products", "Type them, import a sheet, or ask our team."],
        ["Share one link", "In your bio, your posts and your chats."],
      ],
      handles: [
        ["Sizes and colours", "on every item"],
        ["Prices in kyat", "in Burmese and English"],
        ["One link", "for every post"],
        ["One order list", "web and chat together"],
        ["Built for phones", "where shoppers are"],
        ["Set up for you", "if you ask our team"],
      ],
      faq: [
        ["Do I need to design anything?", "No. Pick your shop type and the layout is done. Add products and share the link."],
        ["Can I still sell in chat?", "Yes. Web orders and chat orders land in the same list."],
        ["Can your team set it up for me?", "Yes. Ask our team to add your products for you."],
      ],
      scene: {
        pick: "Pick your shop type",
        types: ["Fashion", "Beauty", "Food"],
        building: "Building your shop…",
        url: "your-shop-name.com",
        shopName: "Thiri Fashion",
        items: [
          ["Black dress", "25,000 MMK"],
          ["Linen shirt", "18,500 MMK"],
          ["Silk scarf", "9,000 MMK"],
        ],
        add: "Order",
        copied: "Link copied",
        share: "Share to Telegram",
        newOrder: "New order · 25,000 MMK",
      },
    },
    "chat-orders": {
      name: "Chat orders",
      title: ["Orders at 3 a.m.,", "taken while you sleep."],
      lead: "An AI assistant answers your shoppers, takes the order and calls you in when a person is needed. It always says it is an AI.",
      description: "BingoMart's AI assistant answers shoppers in chat day and night, takes the order and hands over to you.",
      pain: [
        ["The order you read too late", "A shopper asked at midnight. By morning they had bought from the shop that answered."],
        ["Addresses lost in scrolling", "Name, phone, township: spread over ten messages, copied out by hand."],
        ["A phone that never rests", "Every ping might be an order, so you check it at dinner, in bed, everywhere."],
      ],
      how: [
        ["Connect your chat", "Web chat and Telegram first."],
        ["The AI answers", "Price, size and stock questions, from your product list."],
        ["You step in when needed", "It hands the chat to you with the order ready."],
      ],
      handles: [
        ["Day and night", "no shopper left waiting"],
        ["Says it is an AI", "no pretending"],
        ["Takes the order", "name, phone, address"],
        ["Hands over to you", "when a person is needed"],
        ["One order list", "chat and web together"],
        ["Telegram first", "Messenger and Viber next"],
      ],
      faq: [
        ["Will shoppers know it is an AI?", "Yes. It says so. Trust matters more than a trick."],
        ["What if a shopper asks something unusual?", "It calls you in, and you take over the chat."],
        ["Which chat apps?", "Web chat and Telegram first, then Messenger and Viber."],
      ],
      scene: {
        time: "03:12",
        shopper1: "Is the black dress in size M?",
        typing: "AI assistant is typing…",
        ai1: "Yes, one left in M. 25,000 MMK. Shall I take your order?",
        shopper2: "Yes. Ma Thida, Chanayethazan, Mandalay.",
        created: "Order #1042 made",
        handover: "Shopper asks for a bulk price · your turn",
        aiTag: "AI assistant",
      },
    },
    "receipt-checks": {
      name: "Receipt checks",
      title: ["Every slip read.", "You just say yes."],
      lead: "BingoMart reads the amount, date and transaction ID on each transfer slip and flags any slip it has seen before. You approve.",
      description: "BingoMart reads transfer slips, flags repeats and waits for your approval. For Myanmar sellers.",
      pain: [
        ["The same slip, sent twice", "A screenshot can be sent again for a second order. Spotting it by eye is hard."],
        ["Zooming into blurry numbers", "Amounts and IDs checked one by one at the end of a long day."],
        ["“Did you pay?” feels rude", "When you're not sure, you have to ask, and the shopper hears doubt."],
      ],
      how: [
        ["Shopper sends the slip", "In chat or at checkout."],
        ["BingoMart reads it", "Amount, date and transaction ID, next to the order total."],
        ["You approve", "One tap, and the order moves on."],
      ],
      handles: [
        ["Amount", "read from the slip"],
        ["Date and time", "read from the slip"],
        ["Transaction ID", "read and remembered"],
        ["Repeats flagged", "before you approve"],
        ["You decide", "never automatic"],
        ["Kept with the order", "easy to find later"],
      ],
      faq: [
        ["Does it approve payments by itself?", "No. It reads and flags. You approve every receipt."],
        ["Can it spot an edited slip?", "It flags slips it has seen before. Check anything that looks wrong, as you do now."],
        ["Which payment apps?", "Slips from the transfer apps your shoppers already use. We are testing which read best."],
      ],
      scene: {
        slip: "Transfer slip",
        scanning: "Reading the slip…",
        fields: [
          ["Amount", "45,000 MMK"],
          ["Date", "7 Nov, 9:14 PM"],
          ["Transaction ID", "…4821"],
        ],
        dup: "This transaction ID was used on order #1038.",
        approve: "Approve",
        reject: "Reject",
        approved: "New slip approved · Order #1042 paid",
      },
    },
    "counter-sales": {
      name: "Counter sales",
      title: ["The internet dropped.", "Your till didn't."],
      lead: "A point of sale for your counter that keeps working offline, with stock and cost price in the same list as your web shop.",
      description: "BingoMart's point of sale works offline, syncs later and shares one stock list with your web shop.",
      pain: [
        ["Two stock counts that never match", "The counter sells the last one while the web shop still shows it."],
        ["Sales lost to a dropped signal", "No internet, so the sale goes in a notebook and never gets typed in."],
        ["Profit you can't see", "You know what came in, not what it cost you."],
      ],
      how: [
        ["Tap the items", "Pick from your product list."],
        ["Take payment", "Cash or transfer, marked paid."],
        ["It syncs itself", "Offline sales upload when the signal is back."],
      ],
      handles: [
        ["Works offline", "syncs later"],
        ["One stock list", "counter and web"],
        ["Cost price", "so profit is real"],
        ["Stock left", "on every item"],
        ["Paid or not", "marked at the counter"],
        ["Daily totals", "in your reports"],
      ],
      faq: [
        ["What happens to offline sales?", "They stay saved on your device and sync when you are back online."],
        ["Does it share stock with my web shop?", "Yes. One list for the counter and the web shop."],
        ["Can I record cost price?", "Yes, next to stock, so reports can show profit."],
      ],
      scene: {
        title: "Counter sale",
        lines: [
          ["Linen shirt × 1", "18,500"],
          ["Silk scarf × 1", "9,000"],
        ],
        total: ["Total", "27,500 MMK"],
        offline: "Offline",
        saved: "Saved on this phone",
        online: "Back online",
        synced: "Synced",
        paid: "Paid",
        stockBefore: "Silk scarf: 5 left",
        stockAfter: "Silk scarf: 4 left",
      },
    },
    "delivery-tracking": {
      name: "Delivery tracking",
      title: ["“Where is my parcel?”", "Answered before they ask."],
      lead: "Record each step, from packing to the bus gate to the door, and give shoppers a link that shows where their parcel is.",
      description: "BingoMart tracks parcels by rider, courier or bus gate and gives shoppers a link with a delivery window.",
      pain: [
        ["The same question, all day", "Every shopper asks where their parcel is, and you check three places to answer."],
        ["Bus gates nobody can see", "Once a parcel leaves for another city, it disappears until it arrives."],
        ["Trust lost in the wait", "Silence makes shoppers nervous, and nervous shoppers don't come back."],
      ],
      how: [
        ["Record the step", "Packed, at the bus gate, on the way. One tap each, even offline."],
        ["Shopper gets a link", "One link, always up to date."],
        ["Show a window", "“Arrives in 2 to 3 days”, not a guess in chat."],
      ],
      handles: [
        ["Your own riders", "in town"],
        ["Couriers", "across the country"],
        ["Bus gates", "to other cities"],
        ["Offline steps", "sync later"],
        ["One link", "per order"],
        ["Delivery window", "shown to the shopper"],
      ],
      faq: [
        ["Does it connect to my courier?", "Today you record the steps yourself. Courier links are something we are exploring."],
        ["What does the shopper see?", "A page with the order, each step, and when it should arrive."],
        ["Can I record steps without internet?", "Yes. They sync later."],
      ],
      scene: {
        chatQ: "Where is my parcel??",
        chatA: "Here is your tracking link",
        order: "Order #1041 · to Mandalay",
        steps: ["Packed", "At the bus gate", "On the way", "Delivered"],
        eta: "Arrives in 2 to 3 days",
      },
    },
    "profit-reports": {
      name: "Profit reports",
      title: ["Busy is not", "the same as profitable."],
      lead: "See income, profit, best sellers and slow sellers by day, month or year, worked out from your sales and cost prices.",
      description: "BingoMart reports show income, profit, best sellers and slow sellers by day, month or year.",
      pain: [
        ["A full day, a thin margin", "Lots of orders can still leave little after costs."],
        ["Money stuck in slow stock", "The item nobody buys is cash you can't use."],
        ["Restocking from memory", "Without numbers, you reorder what you remember, not what sells."],
      ],
      how: [
        ["Sell as usual", "Web, chat and counter sales all count."],
        ["Add cost prices", "Once per product."],
        ["Read the numbers", "Profit, best and slow sellers, by day, month or year."],
      ],
      handles: [
        ["Income", "by day, month, year"],
        ["Profit", "after cost price"],
        ["Best sellers", "to restock"],
        ["Slow sellers", "to rethink"],
        ["All channels", "web, chat, counter"],
        ["In Burmese", "and English"],
      ],
      faq: [
        ["Where do the numbers come from?", "From your orders and the cost prices you enter."],
        ["Do I need to know accounting?", "No. It shows plain numbers: what came in, what it cost, what is left."],
        ["Does it count counter sales?", "Yes, including offline ones once they sync."],
      ],
      scene: {
        title: "This week",
        profit: ["Profit", "312,000 MMK"],
        days: ["M", "T", "W", "T", "F", "S", "S"],
        best: ["Best seller", "Black dress"],
        slow: ["Slow seller", "Red scarf"],
        restock: "Restock the black dress",
      },
    },
  },
};

const my: FeatureSet = {
  shared: {
    painTitle: "ဒီနေ့ သင် ပေးနေရတဲ့ အရာ",
    howTitle: "ဘယ်လို အလုပ်လုပ်လဲ",
    handlesTitle: "ဘာတွေ လုပ်ပေးလဲ",
    faqTitle: "မေးခွန်းများ",
    closing: "သင့်ဆိုင် အဆင်သင့်ဖြစ်တာနဲ့ စလို့ရပါပြီ။",
    closingLead: "စောစီးစွာ ပါဝင်ခွင့် ဖွင့်ထားပါတယ်။ ရန်ကုန်နဲ့ မန္တလေးဆိုင်တွေကို အရင်စတင်ပါမယ်။",
    join: "စောစီးစွာ ပါဝင်ရန်",
    demo: "အက်ပ်ကို ကြိုကြည့်ရန်",
    more: "BingoMart ၏ အခြားလုပ်ဆောင်ချက်များ",
    all: "လုပ်ဆောင်ချက်အားလုံး",
    play: "ဖွင့်ရန်",
    pause: "ခဏရပ်ရန်",
    example: "နမူနာဒေတာ",
    watch: "အလုပ်လုပ်ပုံ ကြည့်ပါ",
    seeHow: "အလုပ်လုပ်ပုံ ကြည့်ရန်",
  },
  items: {
    "web-shop": {
      name: "ဝက်ဘ်ဆိုင်",
      title: ["သင့်ဆိုင်က", "ညလုံးပေါက် ဖွင့်ထားမယ်။"],
      lead: "သင့်ကိုယ်ပိုင် ဝက်ဘ်လိပ်စာပေါ်က ဆိုင်အစစ်။ ဝယ်သူတွေ ကြည့်၊ ဆိုဒ်ရွေးပြီး မက်ဆေ့ချ် တစ်စောင်မှ မပို့ဘဲ မှာလို့ရပါတယ်။",
      description: "BingoMart ဝက်ဘ်ဆိုင် — ကိုယ်ပိုင်လိပ်စာ၊ ကျပ်နဲ့ ဈေးနှုန်း၊ အော်ဒါအားလုံး စာရင်းတစ်ခုထဲမှာ။",
      pain: [
        ["တစ်နေ့လုံး “ဘယ်လောက်လဲ” ချည်းပဲ", "ပို့စ်တိုင်းမှာ မေးခွန်းတူတူ ပြန်လာတယ်။ ဖြေရတဲ့ မိနစ်တိုင်း ပြန်မရတော့ဘူး။"],
        ["အကောင်းဆုံးပုံတွေ ဖိဒ်ထဲ မြုပ်သွား", "မနေ့က ပို့စ်တောင် အောက်ရောက်သွားပြီ။ အရင်အပတ်က ရောင်းခဲ့တာကို ဝယ်သူ ရှာမတွေ့တော့ဘူး။"],
        ["မက်ဆေ့ချ် မပို့တဲ့ ဝယ်သူတွေ", "တချို့က မသိတဲ့သူကို စာမပို့ချင်ကြဘူး။ ဖြတ်ကျော်သွားပြီး သူတို့ရောက်ခဲ့မှန်းတောင် သင်မသိလိုက်ဘူး။"],
      ],
      how: [
        ["ဆိုင်အမျိုးအစား ရွေးပါ", "ဖက်ရှင်၊ အလှကုန် ဒါမှမဟုတ် အစားအသောက်။ ပုံစံက လိုက်ဖက်အောင် ပြင်ပြီးသား။"],
        ["ကုန်ပစ္စည်း ထည့်ပါ", "ရိုက်ထည့်ပါ၊ ဖိုင်ကနေ ထည့်ပါ၊ ဒါမှမဟုတ် ကျွန်ုပ်တို့အဖွဲ့ကို ခိုင်းပါ။"],
        ["လင့်ခ်တစ်ခု မျှဝေပါ", "ပရိုဖိုင်၊ ပို့စ်နဲ့ ချတ်တွေထဲမှာ။"],
      ],
      handles: [
        ["ဆိုဒ်နဲ့ အရောင်", "ပစ္စည်းတိုင်းမှာ"],
        ["ကျပ်နဲ့ ဈေးနှုန်း", "မြန်မာ၊ အင်္ဂလိပ် နှစ်မျိုးလုံး"],
        ["လင့်ခ်တစ်ခု", "ပို့စ်တိုင်းအတွက်"],
        ["အော်ဒါစာရင်း တစ်ခု", "ဝက်ဘ်ရော ချတ်ပါ"],
        ["ဖုန်းအတွက် လုပ်ထား", "ဝယ်သူတွေ ရှိရာမှာ"],
        ["တည်ဆောက်ပေးမယ်", "ကျွန်ုပ်တို့အဖွဲ့ကို ခိုင်းရင်"],
      ],
      faq: [
        ["ဒီဇိုင်း ကိုယ်တိုင် လုပ်ရမလား။", "မလိုပါ။ ဆိုင်အမျိုးအစား ရွေးလိုက်ရင် ပုံစံက ပြီးသွားပြီ။ ကုန်ပစ္စည်းထည့်ပြီး လင့်ခ်ကို မျှဝေရုံပါပဲ။"],
        ["ချတ်ထဲမှာ ဆက်ရောင်းလို့ ရသေးလား။", "ရပါတယ်။ ဝက်ဘ်အော်ဒါနဲ့ ချတ်အော်ဒါ စာရင်းတစ်ခုတည်းထဲ ရောက်ပါတယ်။"],
        ["သင်တို့အဖွဲ့က တည်ဆောက်ပေးနိုင်လား။", "ရပါတယ်။ ကုန်ပစ္စည်းတွေကို ကျွန်ုပ်တို့အဖွဲ့က ထည့်ပေးပါမယ်။"],
      ],
      scene: {
        pick: "ဆိုင်အမျိုးအစား ရွေးပါ",
        types: ["ဖက်ရှင်", "အလှကုန်", "အစားအသောက်"],
        building: "ဆိုင်ကို တည်ဆောက်နေသည်…",
        url: "your-shop-name.com",
        shopName: "Thiri Fashion",
        items: [
          ["အနက်ရောင် ဂါဝန်", "25,000 ကျပ်"],
          ["လင်နင် ရှပ်အင်္ကျီ", "18,500 ကျပ်"],
          ["ပိုးပဝါ", "9,000 ကျပ်"],
        ],
        add: "မှာမည်",
        copied: "လင့်ခ် ကူးပြီး",
        share: "Telegram သို့ မျှဝေရန်",
        newOrder: "အော်ဒါအသစ် · 25,000 ကျပ်",
      },
    },
    "chat-orders": {
      name: "ချတ်အော်ဒါ",
      title: ["မနက် 3 နာရီ အော်ဒါ၊", "သင်အိပ်နေချိန် လက်ခံပြီးသား။"],
      lead: "AI အကူက ဝယ်သူတွေကို ပြန်ဖြေ၊ အော်ဒါလက်ခံပြီး လူကိုယ်တိုင် လိုအပ်ရင် သင့်ကို ခေါ်ပါတယ်။ AI ဖြစ်ကြောင်း အမြဲ ပြောပါတယ်။",
      description: "BingoMart AI အကူက ချတ်ထဲမှာ နေ့ရောညပါ ဝယ်သူတွေကို ပြန်ဖြေ၊ အော်ဒါလက်ခံပြီး သင့်ဆီ လွှဲပေးပါတယ်။",
      pain: [
        ["နောက်ကျမှ ဖတ်မိတဲ့ အော်ဒါ", "ဝယ်သူက ညသန်းခေါင်မှာ မေးခဲ့တယ်။ မနက်ရောက်တော့ ပြန်ဖြေတဲ့ ဆိုင်ဆီမှာ ဝယ်သွားပြီ။"],
        ["စာတွေကြားမှာ ပျောက်တဲ့ လိပ်စာ", "နာမည်၊ ဖုန်း၊ မြို့နယ် — မက်ဆေ့ချ် ဆယ်စောင်ကြားမှာ ပြန့်နေပြီး လက်နဲ့ ပြန်ကူးရတယ်။"],
        ["အနားမယူရတဲ့ ဖုန်း", "အသံမြည်တိုင်း အော်ဒါဖြစ်နိုင်လို့ ထမင်းစားရင်း၊ အိပ်ရာထဲမှာပါ စစ်နေရတယ်။"],
      ],
      how: [
        ["ချတ်ကို ချိတ်ပါ", "ဝက်ဘ်ချတ်နဲ့ Telegram ကို အရင်။"],
        ["AI က ပြန်ဖြေတယ်", "ဈေး၊ ဆိုဒ်နဲ့ လက်ကျန် မေးခွန်းတွေကို သင့်ကုန်စာရင်းကနေ ဖြေတယ်။"],
        ["လိုအပ်မှ သင်ဝင်ပါ", "အော်ဒါ အဆင်သင့်နဲ့ ချတ်ကို သင့်ဆီ လွှဲပေးတယ်။"],
      ],
      handles: [
        ["နေ့ရော ညပါ", "ဘယ်ဝယ်သူမှ မစောင့်ရ"],
        ["AI ဖြစ်ကြောင်း ပြောတယ်", "ဟန်မဆောင်ဘူး"],
        ["အော်ဒါ လက်ခံတယ်", "နာမည်၊ ဖုန်း၊ လိပ်စာ"],
        ["သင့်ဆီ လွှဲပေးတယ်", "လူလိုအပ်တဲ့အခါ"],
        ["အော်ဒါစာရင်း တစ်ခု", "ချတ်ရော ဝက်ဘ်ပါ"],
        ["Telegram အရင်", "နောက် Messenger နဲ့ Viber"],
      ],
      faq: [
        ["ဝယ်သူတွေက AI မှန်း သိမလား။", "သိပါတယ်။ AI က ကိုယ်တိုင် ပြောပါတယ်။ ယုံကြည်မှုက လှည့်ကွက်ထက် အရေးကြီးပါတယ်။"],
        ["ဝယ်သူက ထူးထူးဆန်းဆန်း မေးရင်ရော။", "သင့်ကို ခေါ်ပြီး ချတ်ကို သင်ဆက်ကိုင်ပါတယ်။"],
        ["ဘယ်ချတ်အက်ပ်တွေလဲ။", "ဝက်ဘ်ချတ်နဲ့ Telegram ကို အရင်၊ နောက် Messenger နဲ့ Viber ပါ။"],
      ],
      scene: {
        time: "03:12",
        shopper1: "အနက်ရောင် ဂါဝန် M ဆိုဒ် ရှိလား။",
        typing: "AI အကူ စာရိုက်နေသည်…",
        ai1: "ရှိပါတယ်၊ M တစ်ထည်ပဲ ကျန်ပါတော့တယ်။ 25,000 ကျပ်ပါ။ အော်ဒါ တင်ပေးရမလား။",
        shopper2: "ဟုတ်ကဲ့။ မသီတာ၊ ချမ်းအေးသာစံ၊ မန္တလေး။",
        created: "အော်ဒါ #1042 တင်ပြီး",
        handover: "ဝယ်သူက လက်ကားဈေး မေးနေသည် · သင့်အလှည့်",
        aiTag: "AI အကူ",
      },
    },
    "receipt-checks": {
      name: "ပြေစာစစ်ဆေးမှု",
      title: ["ပြေစာတိုင်း ဖတ်ပြီးသား။", "သင်က အတည်ပြုရုံပဲ။"],
      lead: "BingoMart က ငွေလွှဲပြေစာတိုင်းရဲ့ ငွေပမာဏ၊ ရက်စွဲနဲ့ ငွေလွှဲအမှတ်ကို ဖတ်ပြီး အရင်တွေ့ဖူးတဲ့ ပြေစာကို အမှတ်အသားပြပါတယ်။ အတည်ပြုတာက သင်ပါ။",
      description: "BingoMart က ငွေလွှဲပြေစာကို ဖတ်၊ ထပ်နေတာကို အမှတ်အသားပြပြီး သင့်အတည်ပြုချက်ကို စောင့်ပါတယ်။",
      pain: [
        ["ပြေစာတစ်ခုတည်း နှစ်ခါ", "စခရင်ရှော့ တစ်ပုံကို နောက်အော်ဒါအတွက် ထပ်ပို့လို့ရတယ်။ မျက်စိနဲ့ ရှာဖို့ ခက်တယ်။"],
        ["ဝါးနေတဲ့ ဂဏန်းတွေကို ချဲ့ကြည့်", "ပင်ပန်းတဲ့ နေ့ရဲ့အဆုံးမှာ ငွေပမာဏနဲ့ အမှတ်တွေကို တစ်ခုချင်း စစ်ရတယ်။"],
        ["“ငွေလွှဲပြီးပြီလား” မေးရတာ အားနာ", "မသေချာရင် မေးရတယ်၊ ဝယ်သူက မယုံလို့လို့ ထင်သွားတယ်။"],
      ],
      how: [
        ["ဝယ်သူ ပြေစာပို့", "ချတ်ထဲ ဒါမှမဟုတ် ငွေချေချိန်မှာ။"],
        ["BingoMart ဖတ်", "ငွေပမာဏ၊ ရက်စွဲ၊ ငွေလွှဲအမှတ်ကို အော်ဒါစုစုပေါင်းဘေးမှာ ပြတယ်။"],
        ["သင် အတည်ပြု", "တစ်ချက်နှိပ်ရုံနဲ့ အော်ဒါ ဆက်သွားတယ်။"],
      ],
      handles: [
        ["ငွေပမာဏ", "ပြေစာကနေ ဖတ်"],
        ["ရက်စွဲနဲ့ အချိန်", "ပြေစာကနေ ဖတ်"],
        ["ငွေလွှဲအမှတ်", "ဖတ်ပြီး မှတ်ထား"],
        ["ထပ်နေတာ အမှတ်အသားပြ", "မအတည်ပြုခင်"],
        ["သင် ဆုံးဖြတ်", "အလိုအလျောက် မဟုတ်"],
        ["အော်ဒါနဲ့ အတူ သိမ်း", "နောက်မှ ပြန်ရှာလွယ်"],
      ],
      faq: [
        ["ငွေပေးချေမှုကို သူ့ဘာသာ အတည်ပြုသလား။", "မပြုပါ။ ဖတ်ပြီး အမှတ်အသားပြရုံပါ။ ပြေစာတိုင်းကို သင်က အတည်ပြုပါတယ်။"],
        ["ပြင်ထားတဲ့ ပြေစာကို သိနိုင်လား။", "အရင်တွေ့ဖူးတဲ့ ပြေစာကို အမှတ်အသားပြပါတယ်။ မှားနေပုံရတာကို အခုလိုပဲ စစ်ပါ။"],
        ["ဘယ်ငွေလွှဲအက်ပ်တွေလဲ။", "ဝယ်သူတွေ သုံးနေကျ ငွေလွှဲအက်ပ်တွေရဲ့ ပြေစာပါ။ ဘယ်ဟာ အကောင်းဆုံး ဖတ်နိုင်လဲ စမ်းသပ်နေပါတယ်။"],
      ],
      scene: {
        slip: "ငွေလွှဲပြေစာ",
        scanning: "ပြေစာကို ဖတ်နေသည်…",
        fields: [
          ["ငွေပမာဏ", "45,000 ကျပ်"],
          ["ရက်စွဲ", "7 နိုဝင်ဘာ၊ ည 9:14"],
          ["ငွေလွှဲအမှတ်", "…4821"],
        ],
        dup: "ဒီငွေလွှဲအမှတ်ကို အော်ဒါ #1038 မှာ သုံးပြီးသားပါ။",
        approve: "အတည်ပြုမည်",
        reject: "ငြင်းမည်",
        approved: "ပြေစာအသစ် အတည်ပြုပြီး · အော်ဒါ #1042 ငွေရပြီ",
      },
    },
    "counter-sales": {
      name: "ဆိုင်ရှေ့ရောင်းချမှု",
      title: ["အင်တာနက် ပြတ်သွားတယ်။", "သင့်ရောင်းချမှု မရပ်ဘူး။"],
      lead: "အော့ဖ်လိုင်းမှာလည်း ဆက်အလုပ်လုပ်တဲ့ ဆိုင်ရှေ့ ရောင်းချမှုစနစ်။ ကုန်လက်ကျန်နဲ့ ဝယ်ဈေးကို ဝက်ဘ်ဆိုင်နဲ့ စာရင်းတစ်ခုတည်းမှာ ထားပါတယ်။",
      description: "BingoMart ရောင်းချမှုစနစ်က အော့ဖ်လိုင်းမှာ အလုပ်လုပ်၊ နောက်မှ ချိတ်ဆက်ပြီး ဝက်ဘ်ဆိုင်နဲ့ ကုန်စာရင်း တစ်ခုတည်း သုံးပါတယ်။",
      pain: [
        ["ဘယ်တော့မှ မကိုက်တဲ့ လက်ကျန်နှစ်ခု", "ဆိုင်ရှေ့မှာ နောက်ဆုံးတစ်ခု ရောင်းပြီးပြီ၊ ဝက်ဘ်ဆိုင်မှာ ရှိသေးတယ်လို့ ပြနေတုန်း။"],
        ["လိုင်းပြတ်လို့ ပျောက်တဲ့ အရောင်း", "အင်တာနက်မရှိလို့ စာအုပ်ထဲ ရေးထားတာ ဘယ်တော့မှ ပြန်မရိုက်ဖြစ်ဘူး။"],
        ["မမြင်ရတဲ့ အမြတ်", "ဘယ်လောက် ဝင်လဲ သိတယ်၊ ဘယ်လောက် ကုန်လဲ မသိဘူး။"],
      ],
      how: [
        ["ပစ္စည်းကို နှိပ်ပါ", "ကုန်စာရင်းထဲကနေ ရွေးပါ။"],
        ["ငွေယူပါ", "ငွေသား ဒါမှမဟုတ် ငွေလွှဲ၊ ငွေရပြီလို့ မှတ်ပါ။"],
        ["သူ့ဘာသာ ချိတ်ဆက်", "လိုင်းပြန်ရရင် အော့ဖ်လိုင်း အရောင်းတွေ တင်ပေးတယ်။"],
      ],
      handles: [
        ["အော့ဖ်လိုင်း အလုပ်လုပ်", "နောက်မှ ချိတ်ဆက်"],
        ["ကုန်စာရင်း တစ်ခု", "ဆိုင်ရော ဝက်ဘ်ပါ"],
        ["ဝယ်ဈေး", "အမြတ် အမှန်ပြဖို့"],
        ["ကျန်တဲ့ လက်ကျန်", "ပစ္စည်းတိုင်းမှာ"],
        ["ငွေရ/မရ", "ဆိုင်ရှေ့မှာ မှတ်"],
        ["နေ့စဉ် စုစုပေါင်း", "အစီရင်ခံစာထဲမှာ"],
      ],
      faq: [
        ["အော့ဖ်လိုင်း အရောင်းတွေ ဘာဖြစ်မလဲ။", "သင့်စက်ထဲမှာ သိမ်းထားပြီး အင်တာနက် ပြန်ရရင် ချိတ်ဆက်ပါတယ်။"],
        ["ဝက်ဘ်ဆိုင်နဲ့ လက်ကျန် မျှသုံးလား။", "ဟုတ်ကဲ့။ ဆိုင်ရှေ့နဲ့ ဝက်ဘ်ဆိုင်အတွက် စာရင်းတစ်ခုတည်းပါ။"],
        ["ဝယ်ဈေး မှတ်လို့ရလား။", "ရပါတယ်၊ လက်ကျန်ဘေးမှာ မှတ်ထားလို့ အစီရင်ခံစာမှာ အမြတ်ပြနိုင်ပါတယ်။"],
      ],
      scene: {
        title: "ဆိုင်ရှေ့ရောင်းချမှု",
        lines: [
          ["လင်နင် ရှပ်အင်္ကျီ × 1", "18,500"],
          ["ပိုးပဝါ × 1", "9,000"],
        ],
        total: ["စုစုပေါင်း", "27,500 ကျပ်"],
        offline: "အော့ဖ်လိုင်း",
        saved: "ဒီဖုန်းထဲ သိမ်းပြီး",
        online: "အွန်လိုင်း ပြန်ရပြီ",
        synced: "ချိတ်ဆက်ပြီး",
        paid: "ငွေရပြီ",
        stockBefore: "ပိုးပဝါ: 5 ထည် ကျန်",
        stockAfter: "ပိုးပဝါ: 4 ထည် ကျန်",
      },
    },
    "delivery-tracking": {
      name: "ပို့ဆောင်မှု ခြေရာခံခြင်း",
      title: ["“ပါဆယ် ဘယ်ရောက်ပြီလဲ”", "မမေးခင် ဖြေပြီးသား။"],
      lead: "ထုပ်ပိုးတာကနေ ဘတ်စ်ကားဂိတ်၊ အိမ်ရှေ့အထိ အဆင့်တိုင်းကို မှတ်ပြီး ပါဆယ်ဘယ်ရောက်လဲ ပြတဲ့ လင့်ခ်ကို ဝယ်သူဆီ ပေးပါ။",
      description: "BingoMart က ပို့ဆောင်ရေးသမား၊ ကိုရီယာ ဒါမှမဟုတ် ဘတ်စ်ကားဂိတ်နဲ့ ပါဆယ်ကို ခြေရာခံပြီး ဝယ်သူကို လင့်ခ်ပေးပါတယ်။",
      pain: [
        ["တစ်နေ့လုံး မေးခွန်းတစ်ခုတည်း", "ဝယ်သူတိုင်း ပါဆယ်ဘယ်ရောက်ပြီလဲ မေးတယ်၊ ဖြေဖို့ သုံးနေရာ စစ်ရတယ်။"],
        ["ဘယ်သူမှ မမြင်ရတဲ့ ဘတ်စ်ကားဂိတ်", "တခြားမြို့ကို ထွက်သွားတာနဲ့ ရောက်တဲ့အထိ ပါဆယ်က ပျောက်နေသလိုပဲ။"],
        ["စောင့်ရင်း ပျောက်တဲ့ ယုံကြည်မှု", "တိတ်ဆိတ်နေရင် ဝယ်သူ စိတ်ပူတယ်၊ စိတ်ပူတဲ့ ဝယ်သူ ပြန်မလာဘူး။"],
      ],
      how: [
        ["အဆင့်ကို မှတ်ပါ", "ထုပ်ပိုးပြီး၊ ဂိတ်ရောက်၊ လမ်းမှာ။ တစ်ချက်စီ နှိပ်ရုံ၊ အော့ဖ်လိုင်းမှာတောင်။"],
        ["ဝယ်သူ လင့်ခ်ရ", "အမြဲ နောက်ဆုံးအခြေအနေ ပြတဲ့ လင့်ခ်တစ်ခု။"],
        ["အချိန်ကာလ ပြပါ", "ချတ်ထဲမှာ ခန့်မှန်းတာမဟုတ်ဘဲ “2 ရက်မှ 3 ရက်အတွင်း ရောက်မည်”။"],
      ],
      handles: [
        ["ကိုယ်ပိုင် ပို့ဆောင်ရေးသမား", "မြို့ထဲမှာ"],
        ["ကိုရီယာ", "တစ်နိုင်ငံလုံး"],
        ["ဘတ်စ်ကားဂိတ်", "တခြားမြို့တွေကို"],
        ["အော့ဖ်လိုင်း အဆင့်", "နောက်မှ ချိတ်ဆက်"],
        ["လင့်ခ်တစ်ခု", "အော်ဒါတိုင်းအတွက်"],
        ["ရောက်မည့် အချိန်ကာလ", "ဝယ်သူကို ပြ"],
      ],
      faq: [
        ["ကိုရီယာနဲ့ ချိတ်ဆက်ထားလား။", "အခုလောလောဆယ် အဆင့်တွေကို ကိုယ်တိုင် မှတ်ရပါတယ်။ ကိုရီယာနဲ့ ချိတ်ဖို့ လေ့လာနေပါတယ်။"],
        ["ဝယ်သူက ဘာမြင်ရမလဲ။", "အော်ဒါ၊ အဆင့်တိုင်းနဲ့ ဘယ်တော့ ရောက်မလဲဆိုတာ ပြတဲ့ စာမျက်နှာ။"],
        ["အင်တာနက်မရှိဘဲ အဆင့် မှတ်လို့ရလား။", "ရပါတယ်။ နောက်မှ ချိတ်ဆက်ပါတယ်။"],
      ],
      scene: {
        chatQ: "ပါဆယ် ဘယ်ရောက်ပြီလဲ??",
        chatA: "ဒီမှာ ခြေရာခံ လင့်ခ်ပါ",
        order: "အော်ဒါ #1041 · မန္တလေးသို့",
        steps: ["ထုပ်ပိုးပြီး", "ဘတ်စ်ကားဂိတ်ရောက်", "လမ်းမှာ", "ရောက်ပြီ"],
        eta: "2 ရက်မှ 3 ရက်အတွင်း ရောက်မည်",
      },
    },
    "profit-reports": {
      name: "အမြတ်အစီရင်ခံစာ",
      title: ["အလုပ်များတာနဲ့", "အမြတ်ရတာ မတူဘူး။"],
      lead: "အရောင်းနဲ့ ဝယ်ဈေးကနေ တွက်ထားတဲ့ ဝင်ငွေ၊ အမြတ်၊ အရောင်းရဆုံးနဲ့ အရောင်းနှေးတာတွေကို ရက်၊ လ၊ နှစ်အလိုက် ကြည့်ပါ။",
      description: "BingoMart အစီရင်ခံစာက ဝင်ငွေ၊ အမြတ်၊ အရောင်းရဆုံးနဲ့ အရောင်းနှေးတာတွေကို ရက်၊ လ၊ နှစ်အလိုက် ပြပါတယ်။",
      pain: [
        ["နေ့တာပြည့်၊ အမြတ်ပါး", "အော်ဒါ များပေမဲ့ ကုန်ကျစရိတ် နုတ်ပြီးရင် နည်းနည်းပဲ ကျန်နိုင်တယ်။"],
        ["နှေးတဲ့ ကုန်ထဲ ပိတ်မိနေတဲ့ ငွေ", "ဘယ်သူမှ မဝယ်တဲ့ ပစ္စည်းက သုံးမရတဲ့ ငွေသားပဲ။"],
        ["မှတ်မိသလောက်နဲ့ ပြန်ဖြည့်", "ဂဏန်းမရှိရင် ရောင်းရတာ မဟုတ်ဘဲ မှတ်မိတာကို ပြန်မှာတယ်။"],
      ],
      how: [
        ["ပုံမှန်အတိုင်း ရောင်းပါ", "ဝက်ဘ်၊ ချတ်နဲ့ ဆိုင်ရှေ့ အရောင်းအားလုံး ပါတယ်။"],
        ["ဝယ်ဈေး ထည့်ပါ", "ကုန်ပစ္စည်းတစ်ခုကို တစ်ခါပဲ။"],
        ["ဂဏန်းတွေ ဖတ်ပါ", "အမြတ်၊ အရောင်းရဆုံးနဲ့ နှေးတာ — ရက်၊ လ၊ နှစ်အလိုက်။"],
      ],
      handles: [
        ["ဝင်ငွေ", "ရက်၊ လ၊ နှစ်"],
        ["အမြတ်", "ဝယ်ဈေး နုတ်ပြီး"],
        ["အရောင်းရဆုံး", "ပြန်ဖြည့်ဖို့"],
        ["အရောင်းနှေး", "ပြန်စဉ်းစားဖို့"],
        ["လမ်းကြောင်းအားလုံး", "ဝက်ဘ်၊ ချတ်၊ ဆိုင်ရှေ့"],
        ["မြန်မာဘာသာ", "အင်္ဂလိပ်လည်း ရ"],
      ],
      faq: [
        ["ဂဏန်းတွေက ဘယ်ကလာလဲ။", "သင့်အော်ဒါတွေနဲ့ သင်ထည့်တဲ့ ဝယ်ဈေးကနေပါ။"],
        ["စာရင်းကိုင် သိဖို့ လိုလား။", "မလိုပါ။ ဝင်ငွေ၊ ကုန်ကျငွေ၊ ကျန်ငွေကို ရိုးရိုးလေး ပြပါတယ်။"],
        ["ဆိုင်ရှေ့ အရောင်းတွေ ပါလား။", "ပါပါတယ်၊ အော့ဖ်လိုင်း အရောင်းတွေလည်း ချိတ်ဆက်ပြီးတာနဲ့ ပါလာပါတယ်။"],
      ],
      scene: {
        title: "ဒီအပတ်",
        profit: ["အမြတ်", "312,000 ကျပ်"],
        days: ["တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓ", "ကြာ", "သော", "စနေ", "တနင်္ဂ"],
        best: ["အရောင်းရဆုံး", "အနက်ရောင် ဂါဝန်"],
        slow: ["အရောင်းနှေး", "အနီရောင် ပဝါ"],
        restock: "အနက်ရောင် ဂါဝန် ပြန်ဖြည့်ပါ",
      },
    },
  },
};

export const featureCopy: Record<Lang, FeatureSet> = { en, my };
