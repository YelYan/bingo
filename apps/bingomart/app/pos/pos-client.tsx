"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chip, money, tint, type Tone } from "@/components/kit";
import { Pills } from "@/components/kit-client";
import { posCategories, posMethods, posProducts } from "@/lib/mock/seller-core";

const COUPON = 5000;

export function PosClient() {
  const [cart, setCart] = useState<Record<string, number>>({ p1: 2, p2: 1 });
  const [method, setMethod] = useState("KBZPay");
  const [pickup, setPickup] = useState(true);
  const [search, setSearch] = useState("");
  const [paid, setPaid] = useState<number | null>(null);

  const shown = useMemo(() => posProducts.filter((p) => p.name.includes(search.trim())), [search]);
  const lines = posProducts.filter((p) => cart[p.id]);
  const subtotal = lines.reduce((s, p) => s + p.price * cart[p.id], 0);
  const total = Math.max(0, subtotal - (subtotal > 0 ? COUPON : 0));

  const change = (id: string, delta: number) => {
    const product = posProducts.find((p) => p.id === id)!;
    setPaid(null);
    setCart((c) => {
      const next = { ...c, [id]: Math.min(product.stock, Math.max(0, (c[id] ?? 0) + delta)) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-card px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[0.625rem] bg-teal text-sm font-bold text-white">Bm</span>
          <div>
            <h1 className="text-[1.0625rem] leading-snug">POS · ဆိုင်ခွဲ 1</h1>
            <p className="text-[0.8125rem] text-soft">ကက်ရှီယာ မအေးအေး · ရှစ်ဖ် 09:00 မှ စတင်</p>
          </div>
        </div>
        <label className="order-last w-full sm:order-none sm:w-auto sm:min-w-72 sm:flex-1 lg:max-w-md">
          <span className="sr-only">ဘားကုဒ် စကင်ဖတ်ပါ သို့မဟုတ် ပစ္စည်းအမည် ရှာပါ</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ဘားကုဒ် စကင်ဖတ်ပါ သို့မဟုတ် ပစ္စည်းအမည် ရှာပါ" className="field !bg-ground" />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Chip tone="ok">● အွန်လိုင်း ချိတ်ထားသည်</Chip>
          <Link href="/pos/offline" className="inline-flex min-h-11 items-center text-[0.8125rem] text-soft underline">အင်တာနက်ပြတ်လျှင်လည်း ရောင်းနိုင်သည်</Link>
          <Link href="/seller" className="inline-flex min-h-11 items-center font-semibold text-teal">ပင်မသို့ ပြန်</Link>
        </div>
      </header>

      <div className="grid flex-1 items-start lg:grid-cols-[minmax(0,1fr)_27rem]">
        <section className="flex min-w-0 flex-col gap-4 p-4 sm:p-6">
          <Pills label="အမျိုးအစား" options={posCategories} />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {shown.map((p, i) => {
              const tone: Tone = p.stock === 0 ? "bad" : p.stock <= 4 ? "wait" : "ok";
              return (
                <li key={p.id}>
                  <button type="button" disabled={p.stock === 0} onClick={() => change(p.id, 1)} className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition-colors hover:border-teal disabled:opacity-60">
                    <span aria-hidden="true" className="flex h-24 w-full items-center justify-center text-[0.8125rem] text-[#4a524d]" style={{ background: tint(i) }}>[ဓာတ်ပုံ]</span>
                    <span className="flex flex-1 flex-col gap-0.5 p-3">
                      <span className="text-[0.9375rem] font-semibold">{p.name}</span>
                      <span className="text-[0.8125rem] text-soft">{p.variant}</span>
                      <span className="mt-auto flex flex-wrap items-center justify-between gap-1 pt-1.5">
                        <span className="font-bold">{money(p.price)}</span>
                        <Chip tone={tone}>{p.stock === 0 ? "ကုန်သွားပြီ" : `ကျန် ${p.stock}`}</Chip>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="flex flex-col gap-4 border-line bg-card p-4 sm:p-6 lg:sticky lg:top-0 lg:min-h-svh lg:border-l">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">လက်ရှိ အော်ဒါ</h2>
            <span className="text-[0.8125rem] text-soft">#POS-0207</span>
          </div>
          <label>
            <span className="sr-only">ဖောက်သည် ဖုန်းနံပါတ်</span>
            <input type="tel" placeholder="ဖောက်သည် ဖုန်းနံပါတ်ဖြင့် ရှာရန် (ရွေးချယ်ခွင့်)" className="field !border-dashed" />
          </label>

          {lines.length === 0 ? <p className="py-4 text-center text-sm text-soft">ပစ္စည်း ရွေးပါ</p> : (
            <ul>
              {lines.map((p) => (
                <li key={p.id} className="flex items-center gap-3 border-b border-[#eee9dd] py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-semibold break-words">{p.name}</p>
                    <p className="text-[0.8125rem] text-soft">{p.price.toLocaleString("en-US")}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" aria-label={`${p.name} လျှော့ရန်`} onClick={() => change(p.id, -1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c4] text-lg font-semibold">−</button>
                    <span className="min-w-5 text-center font-semibold">{cart[p.id]}</span>
                    <button type="button" aria-label={`${p.name} တိုးရန်`} onClick={() => change(p.id, 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c4] text-lg font-semibold">+</button>
                  </div>
                  <span className="w-20 text-right font-bold">{(p.price * cart[p.id]).toLocaleString("en-US")}</span>
                </li>
              ))}
            </ul>
          )}

          <div role="group" aria-label="ရယူမည့်နည်း" className="grid grid-cols-2 gap-2">
            {[["ဆိုင်တွင်ယူ", true], ["ပို့ပေးရန်", false]].map(([label, value]) => (
              <button key={String(label)} type="button" aria-pressed={pickup === value} onClick={() => setPickup(value as boolean)} className={`min-h-12 rounded-xl text-sm font-semibold ${pickup === value ? "border-2 border-teal bg-mint text-[#0a4f43]" : "border border-[#d9d3c4]"}`}>{label}</button>
            ))}
          </div>

          <dl className="flex flex-col gap-1.5 text-[0.9375rem]">
            <div className="flex justify-between"><dt className="text-soft">စုစုပေါင်း (ပစ္စည်း)</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-soft">ကူပွန် WELCOME5</dt><dd className="text-[#0a5547]">− {money(subtotal > 0 ? COUPON : 0)}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-xl font-bold"><dt>ပေးရန်</dt><dd>{money(total)}</dd></div>
          </dl>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">ငွေပေးချေမည့်နည်း</legend>
            <div className="grid grid-cols-3 gap-2">
              {posMethods.map((m) => (
                <button key={m} type="button" aria-pressed={method === m} onClick={() => setMethod(m)} className={`min-h-12 rounded-xl text-sm font-semibold ${method === m ? "border-2 border-teal bg-mint text-[#0a4f43]" : "border border-[#d9d3c4]"}`}>{m}</button>
              ))}
            </div>
          </fieldset>

          {method !== "ငွေသား" && method !== "COD" ? (
            <div className="flex items-center gap-3 rounded-xl bg-mint p-3 text-[0.8125rem] text-[#0a4f43]">
              <span aria-hidden="true" className="flex h-[4.5rem] w-[4.5rem] flex-none items-center justify-center rounded-lg border border-[#bfd9d1] bg-white text-xs text-[#4a524d]">[QR]</span>
              <p>{method} QR ကို ဖောက်သည်အား ပြပါ။ ငွေဝင်ကြောင်း စနစ်က စစ်ပေးမည်။ လက်ဖြင့်လည်း အတည်ပြုနိုင်သည်။</p>
            </div>
          ) : null}

          {paid !== null ? <p role="status" className="rounded-xl bg-mint p-3 text-center font-semibold text-[#0a4f43]">ငွေရှင်းပြီး · {money(paid)} · {method} (နမူနာ)</p> : null}

          <div className="mt-auto flex gap-2.5">
            <button type="button" onClick={() => { setCart({}); setPaid(null); }} className="btn btn-ghost min-h-14">ခဏထားရန်</button>
            <button type="button" disabled={lines.length === 0} onClick={() => { setPaid(total); setCart({}); }} className="btn btn-primary min-h-14 flex-1 text-[1.0625rem] font-bold">ငွေရှင်းမည် · {money(total)}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
