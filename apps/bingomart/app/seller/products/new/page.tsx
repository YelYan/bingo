"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileScreen } from "@/components/mobile";
import { MockButton } from "@/components/kit-client";

const SIZES = ["S", "M", "L", "XL"];
const COLORS = [["အဖြူ", "#ffffff"], ["အနက်", "#1e2420"]];

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold ${on ? "bg-teal text-white" : "border border-[#d9d3c4] bg-card"}`}>
      {children}
    </button>
  );
}

export default function AddProductPage() {
  const [sizes, setSizes] = useState(["S", "M", "L"]);
  const [colors, setColors] = useState(["အဖြူ"]);
  const flip = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <MobileScreen
      title="ပစ္စည်း အသစ်"
      back="/seller/products"
      right={<span className="text-[0.8125rem] font-semibold text-teal">AI ဖြည့်ပေးမည်</span>}
      footer={
        <div className="flex gap-2.5">
          <MockButton done="သိမ်းပြီး" className="btn-ghost">မူကြမ်း သိမ်း</MockButton>
          <Link href="/seller/products" className="btn btn-primary min-h-13 flex-1 font-bold">တင်မည်</Link>
        </div>
      }
    >
      <div className="flex gap-2.5">
        <label className="flex h-[5.75rem] w-[5.75rem] flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.875rem] border-2 border-dashed border-[#bfb8a6] bg-card text-xs text-soft">
          <input type="file" accept="image/*" className="sr-only" />
          ပုံထည့်
        </label>
        <div aria-hidden="true" className="h-[5.75rem] w-[5.75rem] flex-none rounded-[0.875rem] bg-[#e4efea]" />
        <p className="flex flex-1 items-center rounded-[0.875rem] bg-mint px-3 py-2.5 text-[0.8125rem] text-[#0a4f43]">ပုံရိုက်ထည့်ရင် AI က အမည်၊ ဖော်ပြချက် အကြမ်း ရေးပေးမယ်</p>
      </div>

      <label className="block text-[0.8125rem] text-soft">အမည် (မြန်မာ)<input defaultValue="ရှပ်အင်္ကျီ အဖြူ ချည်သား" className="field mt-1 text-ink" /></label>
      <div className="grid grid-cols-2 gap-2.5">
        <label className="block text-[0.8125rem] text-soft">ဈေးနှုန်း (ကျပ်)<input type="number" min={1} defaultValue={28000} inputMode="numeric" className="field mt-1 text-ink" /></label>
        <label className="block text-[0.8125rem] text-soft">လက်ကျန်<input type="number" min={0} defaultValue={24} inputMode="numeric" className="field mt-1 text-ink" /></label>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-[0.8125rem] text-soft">အရွယ်အစား</legend>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => <Toggle key={s} on={sizes.includes(s)} onClick={() => setSizes(flip(sizes, s))}>{s}</Toggle>)}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-1.5 text-[0.8125rem] text-soft">အရောင်</legend>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(([name, hex]) => (
            <Toggle key={name} on={colors.includes(name)} onClick={() => setColors(flip(colors, name))}>
              <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border border-[#ccc]" style={{ background: hex }} />{name}
            </Toggle>
          ))}
        </div>
      </fieldset>
      <label className="block text-[0.8125rem] text-soft">အမျိုးအစား
        <select className="field mt-1 text-ink" defaultValue="အင်္ကျီ"><option>အင်္ကျီ</option><option>လုံချည် / ထမီ</option><option>ဘောင်းဘီ</option><option>အိတ် / ဖိနပ်</option></select>
      </label>
    </MobileScreen>
  );
}
