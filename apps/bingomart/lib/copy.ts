/**
 * All Burmese wording in one place, so a native speaker can review it in one file.
 * Screen wording comes from the UI/UX design canvas where it exists; the rest is a draft.
 */

export const formatMmk = (amount: number) => `${amount.toLocaleString("en-US")} ကျပ်`;

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Yangon" }).format(new Date(value));

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Yangon" }).format(new Date(value));

export const shipmentLabel: Record<string, string> = {
  created: "အော်ဒါ လက်ခံပြီး",
  packed: "ပစ္စည်း ပြင်ဆင်ပြီး",
  with_carrier: "ပို့ဆောင်ရေးသို့ ပေးပြီး",
  out_for_delivery: "လမ်းပေါ် ရောက်နေသည်",
  attempted: "ပို့ရန် ကြိုးစားခဲ့သည်",
  delivered: "လက်ခံရရှိပြီး",
  cancelled: "ပယ်ဖျက်ပြီး",
};

export const eventLabel: Record<string, string> = {
  CREATED: shipmentLabel.created,
  PACKED: shipmentLabel.packed,
  HANDED_TO_CARRIER: shipmentLabel.with_carrier,
  OUT_FOR_DELIVERY: shipmentLabel.out_for_delivery,
  DELIVERY_ATTEMPTED: shipmentLabel.attempted,
  DELIVERED: shipmentLabel.delivered,
  CANCELLED: shipmentLabel.cancelled,
};

export const paymentLabel: Record<string, string> = {
  cod_due: "အိမ်ရောက်ငွေချေ (COD)",
  cod_collected: "COD ငွေ ရရှိပြီး",
  awaiting_slip: "ငွေလွှဲ စလစ် စောင့်နေသည်",
  in_review: "စလစ် စစ်ဆေးနေသည်",
  approved: "ငွေ အတည်ပြုပြီး",
  rejected: "စလစ် ပြန်ပို့ရန် လိုသည်",
};

const errors: Record<string, string> = {
  INVALID_INPUT: "အချက်အလက်တချို့ မှန်ကန်မှု မရှိပါ။ ပြန်စစ်ပေးပါ။",
  OUT_OF_STOCK: "ခြင်းတောင်းထဲက ပစ္စည်းတစ်ခု ကုန်သွားပါပြီ။ ပြန်စစ်ပြီး ထပ်ကြိုးစားပါ။",
  SHOP_NOT_FOUND: "ဤဆိုင်ကို ရှာမတွေ့ပါ။",
  ORDER_NOT_FOUND: "ဤအော်ဒါကို ရှာမတွေ့ပါ။",
  ORDER_CANCELLED: "ဤအော်ဒါကို ပယ်ဖျက်ပြီး ဖြစ်သည်။",
  NOT_AN_IMAGE: "JPG၊ PNG သို့မဟုတ် WEBP ပုံကိုသာ တင်နိုင်ပါသည်။",
  NO_FILE: "စလစ် ပုံကို အရင် ရွေးပါ။",
  FILE_TOO_BIG: "ပုံသည် 5 MB ထက် ကြီးနေပါသည်။ ပုံငယ်ငယ် ရွေးပါ။",
  SLIP_NOT_EXPECTED: "ဤအော်ဒါအတွက် စလစ် တင်ရန် မလိုတော့ပါ။",
  NOTHING_TO_REVIEW: "စစ်ဆေးရန် စလစ် မရှိတော့ပါ။ စာမျက်နှာကို ပြန်ဖွင့်ပါ။",
  PAYMENT_NOT_CLEARED: "ငွေ အတည်မပြုရသေးပါ။ စလစ် အရင် စစ်ဆေးပါ။",
  ILLEGAL_TRANSITION: "ဤအဆင့်ကို ယခု လုပ်၍ မရပါ။ စာမျက်နှာကို ပြန်ဖွင့်ပါ။",
  SLUG_TAKEN: "ဤဆိုင်လိပ်စာကို အသုံးပြုပြီးသား ဖြစ်သည်။ အခြားတစ်ခု ရွေးပါ။",
  PHONE_TAKEN: "ဤဖုန်းနံပါတ်ဖြင့် ဆိုင်ဖွင့်ပြီးသား ဖြစ်သည်။ ဝင်ရောက်ပါ။",
  BAD_LOGIN: "ဖုန်းနံပါတ် သို့မဟုတ် စကားဝှက် မှားနေပါသည်။",
  LOCKED: "အကြိမ်များစွာ မှားသဖြင့် ၁၅ မိနစ် ပိတ်ထားပါသည်။ ခဏနေမှ ပြန်ကြိုးစားပါ။",
  API_DOWN: "ချိတ်ဆက်၍ မရသေးပါ။ ခဏနေမှ ပြန်ကြိုးစားပါ။",
};

export const errorText = (code: string) => errors[code] ?? "တစ်ခုခု မှားယွင်းသွားပါသည်။ ထပ်ကြိုးစားပါ။";

export const regions = [
  "ရန်ကုန်", "မန္တလေး", "နေပြည်တော်", "ကချင်", "ကယား", "ကရင်", "ချင်း", "စစ်ကိုင်း",
  "တနင်္သာရီ", "ပဲခူး", "မကွေး", "မွန်", "ရခိုင်", "ရှမ်း", "ဧရာဝတီ",
];
