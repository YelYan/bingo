"use client";

import { useState } from "react";
import { WideScreen } from "@/components/mobile";
import { MockButton } from "@/components/kit-client";

const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const TAKEN = new Set(["10:00", "14:00"]);

export default function BookServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const [slot, setSlot] = useState("09:00");
  return (
    <WideScreen title="ဝန်ဆောင်မှု ဘွတ်ကင်" back="../" width="max-w-3xl" footer={<MockButton done="ဘွတ်ကင်ပြီး (နမူနာ)" className="btn-primary w-full">ဘွတ်ကင် အတည်ပြုမည်</MockButton>}>
      <div className="card">
        <p className="mb-1 font-semibold">ဆံပင်ညှပ်</p>
        <p className="text-sm text-soft">30 မိနစ် · 8,000 ကျပ်</p>
      </div>
      <fieldset>
        <legend className="mb-2 font-semibold">ရက်ရွေးရန်</legend>
        <input type="date" defaultValue="2026-11-05" className="field" />
      </fieldset>
      <fieldset>
        <legend className="mb-2 font-semibold">အချိန် ရွေးရန်</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {SLOTS.map((s) => (
            <button key={s} type="button" disabled={TAKEN.has(s)} aria-pressed={slot === s} onClick={() => setSlot(s)} className={`min-h-11 rounded-xl text-sm font-semibold disabled:cursor-not-allowed disabled:text-[#cfc8b5] disabled:line-through ${slot === s ? "bg-teal text-white" : "border border-[#d9d3c4]"}`}>{s}</button>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-semibold">ဖုန်းနံပါတ်<input type="tel" placeholder="09 ___ ___ ___" className="field mt-1" /></label>
    </WideScreen>
  );
}
