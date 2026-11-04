"use client";

import Link from "next/link";
import { useState } from "react";
import { tint } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { brandColors, builderBlocks, builderTemplates, owner, posProducts } from "@/lib/mock/seller-core";

export function BuilderClient() {
  const [phone, setPhone] = useState(true);
  const [template, setTemplate] = useState(builderTemplates[0]);
  const [title, setTitle] = useState("မြန်မာ့ဒီဇိုင်း အသစ်များ");
  const [cta, setCta] = useState("ယခုဝယ်ရန်");
  const [accent, setAccent] = useState(brandColors[0]);
  const [blocks, setBlocks] = useState<string[]>([]);

  return (
    <div className="-m-4 flex flex-col sm:-m-6 lg:-m-8">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-ink px-4 py-2.5 text-white sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3.5">
          <Link href="/seller" className="inline-flex min-h-11 items-center text-sm text-[#c9d6d1]">← ပင်မ</Link>
          <h1 className="text-base">ဝက်ဘ်ဆိုက် တည်ဆောက်ကိရိယာ</h1>
          <span className="text-[0.8125rem] break-all text-[#9cb0a9]">{owner.domain}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="မြင်ကွင်း" className="flex rounded-[0.625rem] bg-[#333a35] p-1">
            {[["ဖုန်း", true], ["ကွန်ပျူတာ", false]].map(([label, value]) => (
              <button key={String(label)} type="button" aria-pressed={phone === value} onClick={() => setPhone(value as boolean)} className={`min-h-10 rounded-lg px-3 text-sm font-semibold ${phone === value ? "bg-teal text-white" : "text-[#9cb0a9]"}`}>{label}</button>
            ))}
          </div>
          <Link href="/s/aye-fashion" target="_blank" className="btn min-h-10 border border-[#4a524d] text-sm text-white">အစမ်းကြည့်</Link>
          <MockButton done="ထုတ်ဝေပြီး (နမူနာ)" className="btn-primary text-sm">ထုတ်ဝေမည်</MockButton>
        </div>
      </header>

      <div className="grid items-stretch xl:grid-cols-[16rem_minmax(0,1fr)_18rem]">
        <aside className="flex flex-col gap-5 border-r border-[#ded8ca] bg-ground p-4">
          <div>
            <h2 className="mb-2 text-[0.8125rem] font-bold text-soft">အပိုင်း ထည့်ရန်</h2>
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {builderBlocks.map((b) => (
                <li key={b}>
                  <button type="button" onClick={() => setBlocks((x) => (x.includes(b) ? x : [...x, b]))} className="flex min-h-11 w-full items-center justify-between gap-2 rounded-[0.625rem] border border-line bg-card px-3 text-left text-sm hover:border-teal">
                    {b}<span aria-hidden="true" className="text-lg text-[#b0a890]">{blocks.includes(b) ? "✓" : "+"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-[0.8125rem] font-bold text-soft">ပုံစံခွက်</h2>
            <div className="grid grid-cols-2 gap-2">
              {builderTemplates.map((t) => (
                <button key={t} type="button" aria-pressed={template === t} onClick={() => setTemplate(t)} className={`min-h-12 rounded-[0.625rem] bg-card p-2 text-[0.8125rem] ${template === t ? "border-2 border-teal font-semibold" : "border border-line"}`}>{t}</button>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 justify-center overflow-x-auto bg-[#ede9df] p-4 sm:p-6">
          <div className={`w-full overflow-hidden bg-white shadow-xl ${phone ? "max-w-80 rounded-[1.75rem] border-8 border-ink" : "max-w-3xl rounded-xl border border-line"}`}>
            <div className="flex items-center gap-2 p-4 pb-3">
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg text-[0.8125rem] font-bold text-white" style={{ background: accent }}>အ</span>
              <b className="text-[0.9375rem]">{owner.shop}</b>
            </div>
            <div className="mx-3 flex min-h-40 flex-col justify-end rounded-2xl p-4 text-white" style={{ background: accent }}>
              <p className="text-xs opacity-85">{template} · ဆောင်းရာသီ အထူး</p>
              <p className="text-[1.375rem] leading-snug font-bold break-words">{title || " "}</p>
              <span className="mt-2 self-start rounded-lg bg-saffron px-3.5 py-1.5 text-[0.8125rem] font-bold text-[#2b2000]">{cta || " "}</span>
            </div>
            <div className="p-3">
              <p className="mx-0.5 my-2 text-[0.9375rem] font-bold">ရောင်းအားအကောင်းဆုံး</p>
              <div className={`grid gap-2.5 ${phone ? "grid-cols-2" : "grid-cols-4"}`}>
                {posProducts.slice(0, 4).map((p, i) => (
                  <div key={p.id} className="overflow-hidden rounded-xl border border-[#eee9dd]">
                    <div aria-hidden="true" className="h-[5.5rem]" style={{ background: tint(i) }} />
                    <div className="px-2.5 py-2"><p className="text-[0.8125rem] font-semibold">{p.name}</p><p className="text-[0.8125rem] font-bold" style={{ color: accent }}>{p.price.toLocaleString("en-US")} ကျပ်</p></div>
                  </div>
                ))}
              </div>
            </div>
            {blocks.map((b) => <div key={b} className="mx-3 mb-3 rounded-xl border border-dashed border-[#bfb8a6] p-4 text-center text-sm text-soft">{b}</div>)}
          </div>
        </section>

        <aside className="flex flex-col gap-4 border-l border-line bg-card p-4">
          <h2 className="text-base">အပိုင်း ပြင်ဆင်ရန် · ဟီးရိုး</h2>
          <label className="block text-[0.8125rem] text-soft">ခေါင်းစဉ်<input value={title} onChange={(e) => setTitle(e.target.value)} className="field mt-1 text-ink" /></label>
          <fieldset>
            <legend className="mb-2 text-[0.8125rem] text-soft">ပင်မအရောင် (ဘရန်း)</legend>
            <div className="flex gap-2.5">
              {brandColors.map((c) => (
                <button key={c} type="button" aria-label={c} aria-pressed={accent === c} onClick={() => setAccent(c)} className={`h-11 w-11 rounded-[0.625rem] ${accent === c ? "ring-3 ring-ink ring-offset-1" : ""}`} style={{ background: c }} />
              ))}
            </div>
          </fieldset>
          <label className="block text-[0.8125rem] text-soft">ဖောင့် (မြန်မာ)
            <select className="field mt-1 text-ink" defaultValue="Noto Sans Myanmar"><option>Noto Sans Myanmar</option><option>Pyidaungsu</option></select>
          </label>
          <label className="block text-[0.8125rem] text-soft">ခလုတ် စာသား<input value={cta} onChange={(e) => setCta(e.target.value)} className="field mt-1 text-ink" /></label>
          <p className="rounded-xl bg-ground px-3.5 py-3 text-[0.8125rem] text-soft">ဖုန်းတွင် မည်သို့မြင်ရမည်ကို အမြဲ စစ်ဆေးပါ — ဝယ်သူအများစုမှာ ဖုန်းသုံးသူများ ဖြစ်သည်။</p>
        </aside>
      </div>
    </div>
  );
}
