"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { money } from "@/components/kit";
import { readCart, writeCart, type Cart, type StoreProduct } from "@/components/store";

export function CartClient({ slug, products, deliveryFeeMmk }: { slug: string; products: StoreProduct[]; deliveryFeeMmk: number }) {
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => setCart(readCart(slug)), [slug]);
  if (!cart) return null;

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = Object.entries(cart).filter(([id]) => byId.has(id));

  const change = (id: string, delta: number) => {
    const next = { ...cart, [id]: Math.max(0, (cart[id] ?? 0) + delta) };
    if (next[id] === 0) delete next[id];
    setCart(next);
    writeCart(slug, next);
  };

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 p-10 text-center">
        <p className="text-5xl" aria-hidden="true">🛒</p>
        <p className="text-soft">ခြင်းတောင်းထဲမှာ ပစ္စည်း မရှိသေးပါ။</p>
        <Link href={`/s/${slug}`} className="btn btn-primary">ဆိုင်သို့ သွားမည်</Link>
      </div>
    );
  }

  const subtotal = lines.reduce((sum, [id, qty]) => sum + byId.get(id)!.priceMmk * qty, 0);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 p-4 sm:grid-cols-[1fr_20rem] sm:items-start sm:gap-8 sm:p-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">ခြင်းတောင်း ({lines.length} မျိုး)</h1>
        <ul className="flex flex-col gap-3">
          {lines.map(([id, qty]) => {
            const p = byId.get(id)!;
            return (
              <li key={id} className="card flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold break-words">{p.name}</p>
                  <p className="text-sm text-soft">{money(p.priceMmk)}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" aria-label={`${p.name} လျှော့ရန်`} onClick={() => change(id, -1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d9d3c4] font-bold">−</button>
                  <span className="min-w-5 text-center font-semibold">{qty}</span>
                  <button type="button" aria-label={`${p.name} တိုးရန်`} onClick={() => change(id, 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d9d3c4] font-bold">+</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <dl className="card flex flex-col gap-1.5 text-sm sm:sticky sm:top-4">
        <div className="flex justify-between"><dt className="text-soft">ပစ္စည်း</dt><dd>{money(subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-soft">ပို့ခ</dt><dd>{money(deliveryFeeMmk)}</dd></div>
        <div className="flex justify-between border-t border-line pt-1.5 text-lg font-bold"><dt>စုစုပေါင်း</dt><dd>{money(subtotal + deliveryFeeMmk)}</dd></div>
        <Link href={`/s/${slug}/checkout`} className="btn btn-primary mt-1">ငွေရှင်းမည်</Link>
      </dl>
    </div>
  );
}
