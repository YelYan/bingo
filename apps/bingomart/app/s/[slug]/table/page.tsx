"use client";

import { useState } from "react";
import { Photo, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";

const MENU = [
  { name: "ကြက်ဆီထမင်း", price: 4500 },
  { name: "ရှမ်းခေါက်ဆွဲ", price: 3800 },
  { name: "ထမင်းကြော်", price: 4000 },
];

/** Menu grid + a sticky order-summary sidebar, the same cart pattern Shopify/Amazon use for multi-item ordering. */
export default function TableOrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const lines = Object.entries(cart).filter(([, qty]) => qty > 0);
  const total = lines.reduce((s, [n, q]) => s + (MENU.find((m) => m.name === n)?.price ?? 0) * q, 0);

  return (
    <div className="mx-auto min-h-svh max-w-5xl">
      <header className="border-b border-line bg-card px-4 py-3 sm:px-6"><h1 className="text-base">မီနူး — စားပွဲ 4</h1></header>
      <div className="grid gap-6 p-4 sm:grid-cols-[1fr_20rem] sm:items-start sm:gap-8 sm:p-6">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MENU.map((m, i) => (
            <li key={m.name}>
              <button type="button" onClick={() => add(m.name)} className="block w-full overflow-hidden rounded-2xl border border-line bg-card text-left">
                <Photo i={i} className="h-24" />
                <span className="block p-2.5">
                  <span className="block text-sm font-semibold">{m.name}</span>
                  <span className="flex items-center justify-between"><span className="font-bold text-teal">{money(m.price)}</span>{cart[m.name] ? <span className="rounded-full bg-teal px-2 text-xs font-bold text-white">{cart[m.name]}</span> : null}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {lines.length > 0 ? (
          <section className="card flex flex-col gap-3 sm:sticky sm:top-4">
            <h2 className="font-bold">မှာထားသည် ({lines.length} မျိုး)</h2>
            <ul className="space-y-1 text-sm">
              {lines.map(([n, q]) => (
                <li key={n} className="flex justify-between gap-3"><span className="min-w-0 break-words">{n} × {q}</span><span className="shrink-0">{money((MENU.find((m) => m.name === n)?.price ?? 0) * q)}</span></li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-line pt-2 text-lg font-bold"><span>စုစုပေါင်း</span><span>{money(total)}</span></div>
            <MockButton done="ပို့ပြီး" className="btn-primary w-full">မှာမည်</MockButton>
          </section>
        ) : null}
      </div>
    </div>
  );
}
