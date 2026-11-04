"use client";

import { useState } from "react";
import { Photo, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { MobileScreen } from "@/components/mobile";

const MENU = [
  { name: "ကြက်ဆီထမင်း", price: 4500 },
  { name: "ရှမ်းခေါက်ဆွဲ", price: 3800 },
  { name: "ထမင်းကြော်", price: 4000 },
];

export default function TableOrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const total = Object.entries(cart).reduce((s, [n, q]) => s + (MENU.find((m) => m.name === n)?.price ?? 0) * q, 0);

  return (
    <MobileScreen
      title="မီနူး — စားပွဲ 4"
      footer={Object.keys(cart).length ? <MockButton done="ပို့ပြီး" className="btn-primary w-full">မှာမည် · {money(total)}</MockButton> : null}
    >
      <ul className="grid grid-cols-2 gap-3">
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
    </MobileScreen>
  );
}
