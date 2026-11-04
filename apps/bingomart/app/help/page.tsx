import type { Metadata } from "next";
import { MobileScreen } from "@/components/mobile";
import { Toggle } from "@/components/kit-client";

export const metadata: Metadata = { title: "အကူအညီနှင့် စည်းကမ်းချက်" };

const faqs = [
  ["BingoMart က ဘာလဲ?", "မြန်မာ အွန်လိုင်းဆိုင်များအတွက် အော်ဒါ၊ ငွေပေးချေမှု နှင့် ပို့ဆောင်ရေးကို တစ်နေရာတည်းမှာ စီမံနိုင်သော ဝန်ဆောင်မှု ဖြစ်သည်။"],
  ["ငွေပေးချေနည်း ဘာတွေ ရှိလဲ?", "အိမ်ရောက်ငွေချေ (COD) နှင့် ငွေလွှဲ (KBZPay, Wave, ဘဏ်) ဖြင့် ပေးချေနိုင်သည်။"],
  ["ပို့ဆောင်ချိန် ဘယ်လောက်လဲ?", "ဆိုင်ရှင် သတ်မှတ်ထားသော ခန့်မှန်းချိန် ဖြစ်ပြီး အာမခံချက် မဟုတ်ပါ။"],
];

export default function HelpPage() {
  return (
    <MobileScreen title="အကူအညီနှင့် စည်းကမ်းချက်">
      <div className="flex flex-col gap-2.5">
        {faqs.map(([q, a]) => (
          <div key={q} className="card">
            <Toggle title={q}><p className="text-[0.9375rem] text-soft">{a}</p></Toggle>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[0.8125rem] text-soft">ပြဿနာ ရှိပါက ဆိုင်ရှင်ကို တိုက်ရိုက် ဆက်သွယ်ပါ။ BingoMart သည် ဆိုင်ရှင်များအတွက် ကိရိယာသာ ဖြစ်ပြီး၊ ဝယ်ယူမှုအတွက် ဆိုင်ရှင်က တာဝန်ယူသည်။</p>
    </MobileScreen>
  );
}
