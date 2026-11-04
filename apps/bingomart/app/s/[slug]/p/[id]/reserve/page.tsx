"use client";

import { useState } from "react";
import { MockButton } from "@/components/kit-client";
import { MobileScreen } from "@/components/mobile";

export default function ReservePage() {
  const [offer, setOffer] = useState("");
  return (
    <MobileScreen title="ယူဆောင်ထား / ဈေးဆစ်ရန်" footer={<MockButton done="ပို့ပြီး (နမူနာ)" className="btn-primary w-full">ဆိုင်ရှင်ထံ ပို့မည်</MockButton>}>
      <section className="card">
        <p className="font-semibold">ဆောင်းရာသီ အင်္ကျီ (အသုံးပြုဖူးသည်)</p>
        <p className="text-sm text-soft">ရောင်းစျေး — 35,000 ကျပ်</p>
      </section>
      <label className="block text-sm font-semibold">သင့် အဆိုပြုဈေး (ရွေးချယ်ခွင့်)
        <input value={offer} onChange={(e) => setOffer(e.target.value)} type="number" inputMode="numeric" placeholder="30,000" className="field mt-1" />
      </label>
      <p className="rounded-xl bg-cream px-3.5 py-2.5 text-[0.8125rem] text-amber">24 နာရီ ယူဆောင်ထားပေးပါမည်။ ဆိုင်ရှင်က အဆိုပြုဈေးကို လက်ခံ/ငြင်း နိုင်သည်။</p>
    </MobileScreen>
  );
}
