"use client";

import { MobileScreen } from "@/components/mobile";
import { Segmented } from "@/components/kit-client";

export default function LanguagePage() {
  return (
    <MobileScreen title="ဘာသာစကား">
      <div className="card">
        <p className="mb-2.5 font-semibold">UI ဘာသာစကား</p>
        <Segmented label="ဘာသာစကား" options={["မြန်မာ", "English"]} />
      </div>
      <div className="card">
        <p className="mb-2.5 font-semibold">ဇော်ဂျီ / ယူနီကုဒ်</p>
        <p className="text-[0.8125rem] text-soft">ဇော်ဂျီ font ဖြင့် ရိုက်ထည့်ပါက ယူနီကုဒ်သို့ အလိုအလျောက် ပြောင်းပေးမည်။</p>
      </div>
    </MobileScreen>
  );
}
