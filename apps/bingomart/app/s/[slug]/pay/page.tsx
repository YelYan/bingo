"use client";

import { useState } from "react";
import { use } from "react";
import { CopyButton } from "@/components/copy-button";
import { WideScreen } from "@/components/mobile";
import { Notice, money } from "@/components/kit";

const accounts = [
  { provider: "KBZPay", name: "Daw Aye Aye", number: "09111222333" },
  { provider: "Wave Pay", name: "Daw Aye Aye", number: "09111222333" },
];
const MAX_BYTES = 5 * 1024 * 1024;

/** Design 68: pay and upload a slip. Mock: nothing is sent. The real upload lives on the tracking page. */
export default function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const tooBig = (file?.size ?? 0) > MAX_BYTES;

  return (
    <WideScreen
      title="ငွေလွှဲ ပေးချေရန်"
      sub="အော်ဒါ #1049"
      back={`/s/${slug}/checkout/done`}
      footer={
        sent ? (
          <p role="status" className="text-center font-semibold text-teal">✓ စလစ် ပို့ပြီးပါပြီ — ဆိုင်က စစ်ဆေးနေပါပြီ</p>
        ) : (
          <button type="button" disabled={!file || tooBig} onClick={() => setSent(true)} className="btn btn-primary min-h-13 w-full font-bold disabled:opacity-50">စလစ် ပို့မည်</button>
        )
      }
    >
      <div className="card text-center">
        <p className="text-sm text-soft">လွှဲရမည့် ပမာဏ</p>
        <p className="text-3xl font-bold text-deep">{money(47000)}</p>
      </div>
      <section className="flex flex-col gap-2" aria-label="ဆိုင်၏ ငွေလက်ခံ အကောင့်များ">
        {accounts.map((a) => (
          <div key={a.provider} className="card flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{a.provider}</p>
              <p className="text-sm text-soft">{a.name}</p>
              <p className="text-lg font-bold tracking-wide">{a.number}</p>
            </div>
            <CopyButton text={a.number} label="နံပါတ် ကူးမည်" />
          </div>
        ))}
      </section>
      <label className="card block border-2 border-dashed border-[#bfb8a6]">
        <span className="font-semibold">ငွေလွှဲ စလစ် ပုံ တင်ပါ</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="field mt-2 !min-h-0 text-sm" />
        {file && !tooBig ? <span className="mt-2 block text-sm text-soft">ရွေးထားသည် — {file.name}</span> : null}
        {tooBig ? <span role="alert" className="mt-2 block text-sm font-semibold text-danger">ဖိုင် 5 MB ထက် ကြီးနေသည်</span> : null}
      </label>
      <Notice tone="ship">စလစ်ထဲတွင် ပမာဏ၊ ရက်စွဲနှင့် လွှဲသူ အမည် ပေါ်နေရန် လိုသည်။ ဆိုင်ရှင်က စစ်ပြီးမှ အတည်ပြုပါမည်။</Notice>
    </WideScreen>
  );
}
