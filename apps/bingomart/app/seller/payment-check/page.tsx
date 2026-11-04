"use client";

import { useState } from "react";
import { Chip } from "@/components/kit";
import { MobileScreen } from "@/components/mobile";
import { slipChecks } from "@/lib/mock/seller-core";

const SHORT = ["118,500 ကျပ်", "ကိုက်ညီ", "ဆိုင်အကောင့်", "အသစ်", "မတွေ့"];

export default function PaymentCheckPage() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <MobileScreen
      title="ငွေပေးချေမှု စစ်ဆေးရန်"
      sub="အော်ဒါ #1047 · ကိုအောင်မင်း"
      back="/seller/payments"
      right={<Chip tone={result ? "ok" : "bad"}>{result ? "ဆောင်ရွက်ပြီး" : "စစ်ရန် ကျန်"}</Chip>}
      footer={
        result ? (
          <p role="status" className="rounded-xl bg-mint p-3 text-center font-semibold text-[#0a4f43]">{result} (နမူနာ)</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            <button type="button" onClick={() => setResult("ကျန်ငွေ 10,000 တောင်းပြီး")} className="btn btn-primary min-h-13 font-bold">ကျန်ငွေ 10,000 တောင်းရန်</button>
            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" onClick={() => setResult("ဤအတိုင်း လက်ခံပြီး")} className="btn btn-ghost">ဤအတိုင်း လက်ခံ</button>
              <button type="button" onClick={() => setResult("ငြင်းပယ်ပြီး")} className="btn btn-danger">ငြင်းပယ်</button>
            </div>
          </div>
        )
      }
    >
      <section className="card flex items-center gap-3.5">
        <div aria-hidden="true" className="flex h-[7.5rem] w-[5.75rem] flex-none items-center justify-center rounded-[0.625rem] bg-[#e2ecf3] text-center text-xs text-[#4a524d]">[ငွေလွှဲ<br />စလစ် ပုံ]</div>
        <dl className="flex flex-col gap-1.5 text-sm">
          <dt className="text-[0.8125rem] text-soft">AI ဖတ်ယူထားသည်</dt>
          <dd><b>118,500</b> ကျပ်</dd>
          <dd>31 Oct 10:42</dd>
          <dd>KBZPay · 09xxx…</dd>
        </dl>
      </section>

      <section className="card flex flex-col gap-3">
        <h2 className="text-[0.9375rem]">AI စစ်ဆေးချက်</h2>
        <ul className="flex flex-col gap-2.5 text-sm">
          {slipChecks.map((k, i) => (
            <li key={k.label} className="flex items-center gap-2.5">
              <span aria-hidden="true" className={`flex h-[1.375rem] w-[1.375rem] flex-none items-center justify-center rounded-full text-[0.8125rem] font-bold ${k.ok ? "bg-mint text-[#0a5547]" : "bg-danger-wash text-danger"}`}>{k.ok ? "✓" : "!"}</span>
              <span className="flex-1 text-[#3b433e]">{k.label}</span>
              <span className={`font-semibold ${k.ok ? "" : "text-danger"}`}>{SHORT[i]}</span>
            </li>
          ))}
        </ul>
        <p className="rounded-[0.625rem] bg-danger-wash px-3 py-2.5 text-[0.8125rem] text-danger"><b>ပမာဏ မကိုက်ပါ</b> — အော်ဒါ 128,500၊ လွှဲငွေ 118,500။ 10,000 ကျပ် လိုနေသည်။</p>
      </section>

      <p className="rounded-[0.875rem] bg-[#e7f0fb] px-3.5 py-3 text-[0.8125rem] text-[#1f4e8c]">သင်သတ်မှတ်ထားသည်: <b>50,000 ကျပ်အောက်</b> အလိုအလျောက် အတည်ပြု။ အထက်ကို သင်ကိုယ်တိုင် စစ်ရန်။</p>
    </MobileScreen>
  );
}
