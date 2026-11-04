"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMmk } from "@/lib/copy";

export type StoreProduct = { id: string; name: string; priceMmk: number; inStock: boolean };
export type Cart = Record<string, number>;

const TINTS = ["#E4EFEA", "#F3E6D3", "#E5E6F2", "#F2DFDA"];

const cartKey = (slug: string) => `bm_cart_${slug}`;

export function readCart(slug: string): Cart {
  try {
    return JSON.parse(localStorage.getItem(cartKey(slug)) ?? "{}");
  } catch {
    return {};
  }
}

export function writeCart(slug: string, cart: Cart) {
  try {
    localStorage.setItem(cartKey(slug), JSON.stringify(cart));
  } catch {
    // Private browsing can refuse storage; the cart then lasts only for this page.
  }
}

export function Store({ slug, products }: { slug: string; products: StoreProduct[] }) {
  const [cart, setCart] = useState<Cart>({});
  useEffect(() => setCart(readCart(slug)), [slug]);

  const change = (id: string, delta: number) => {
    const next = { ...cart, [id]: Math.max(0, (cart[id] ?? 0) + delta) };
    if (next[id] === 0) delete next[id];
    setCart(next);
    writeCart(slug, next);
  };

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = Object.entries(cart).filter(([id]) => byId.has(id));
  const count = lines.reduce((sum, [, qty]) => sum + qty, 0);
  const total = lines.reduce((sum, [id, qty]) => sum + byId.get(id)!.priceMmk * qty, 0);

  if (products.length === 0) {
    return <p className="p-8 text-center text-soft">ပစ္စည်း မတင်ရသေးပါ။ နောက်မှ ပြန်လာကြည့်ပါ။</p>;
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <li key={product.id} className="overflow-hidden rounded-2xl border border-line bg-card">
            <div aria-hidden="true" className="flex h-32 items-center justify-center font-display text-4xl font-bold text-deep/40" style={{ background: TINTS[i % TINTS.length] }}>
              {product.name.slice(0, 1)}
            </div>
            <div className="p-3">
              <h2 className="text-[0.9375rem] font-semibold break-words">{product.name}</h2>
              <p className="font-bold text-teal">{formatMmk(product.priceMmk)}</p>
              {!product.inStock ? (
                <p className="mt-2 text-sm font-semibold text-danger">ပစ္စည်းကုန်</p>
              ) : cart[product.id] ? (
                <div className="mt-2 flex items-center justify-between">
                  <button type="button" aria-label={`${product.name} တစ်ခု လျှော့ရန်`} onClick={() => change(product.id, -1)} className="btn btn-ghost h-11 w-11 !p-0">−</button>
                  <span aria-live="polite" className="font-bold">{cart[product.id]}</span>
                  <button type="button" aria-label={`${product.name} တစ်ခု တိုးရန်`} onClick={() => change(product.id, 1)} className="btn btn-primary h-11 w-11 !p-0">+</button>
                </div>
              ) : (
                <button type="button" onClick={() => change(product.id, 1)} className="btn btn-primary mt-2 w-full">ခြင်းထဲ ထည့်မည်</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {count > 0 ? (
        <div className="sticky bottom-0 border-t border-line bg-card p-3">
          <Link href={`/s/${slug}/checkout`} className="btn btn-primary mx-auto w-full max-w-md justify-between">
            <span>ငွေရှင်းမည် ({count})</span>
            <span>{formatMmk(total)}</span>
          </Link>
        </div>
      ) : null}
    </>
  );
}
