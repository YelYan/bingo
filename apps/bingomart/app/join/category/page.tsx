"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/kit";
import { onboardCategories } from "@/lib/mock/seller-core";

export default function CategoryPage() {
  const [picked, setPicked] = useState(onboardCategories[0].label);
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-card">
      <div className="px-5 pt-4 pb-2">
        <div aria-hidden="true" className="mb-4 flex gap-1.5">
          <span className="h-[5px] flex-1 rounded-full bg-teal" />
          <span className="h-[5px] flex-1 rounded-full bg-teal" />
          <span className="h-[5px] flex-1 rounded-full bg-line" />
        </div>
        <p className="text-[0.8125rem] text-soft">အဆင့် 2 / 3</p>
        <h1 className="mt-1 text-[1.4375rem] leading-snug">သင့်ဆိုင် အမျိုးအစား ရွေးပါ</h1>
        <p className="mt-1 text-sm text-soft">ရွေးလိုက်ရင် သင့်အတွက် ပုံစံ၊ ပစ္စည်းအကွက်၊ AI စကားပြော အသင့်ပြင်ပေးပါမယ်။</p>
      </div>

      <main id="main" className="flex flex-1 flex-col gap-3 px-5 py-3">
        <div role="radiogroup" aria-label="ဆိုင် အမျိုးအစား" className="flex flex-col gap-3">
          {onboardCategories.map((c) => {
            const on = picked === c.label;
            return (
              <button key={c.label} type="button" role="radio" aria-checked={on} onClick={() => setPicked(c.label)} className={`flex items-center gap-3.5 rounded-2xl p-3.5 text-left ${on ? "border-2 border-teal bg-[#f3faf8]" : "border border-line"}`}>
                <span aria-hidden="true" className="flex h-[2.875rem] w-[2.875rem] flex-none items-center justify-center rounded-xl text-deep" style={{ background: c.tint }}><Icon d={c.icon} className="h-6 w-6" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold">{c.label}</span>
                  <span className="block text-[0.8125rem] text-soft">{c.sub}</span>
                </span>
                <span aria-hidden="true" className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold text-white ${on ? "bg-teal" : "border-2 border-[#d9d3c4]"}`}>{on ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>
        <p className="pt-1 text-center text-[0.8125rem] text-soft">နောက်မှ ပြောင်းနိုင်သည် · အခြား အမျိုးအစားများ မကြာမီ</p>
      </main>

      <div className="sticky bottom-0 border-t border-[#eee9dd] bg-card p-5">
        <Link href="/seller/signup" className="btn btn-primary min-h-13 w-full text-[1.0625rem] font-bold">ဆက်သွားမည် →</Link>
      </div>
    </div>
  );
}
