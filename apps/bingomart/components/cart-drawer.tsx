"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatMmk } from "@/lib/copy";
import { useCart, type StoreProduct } from "./store";

/** A slide-in cart, the default storefront pattern (Shopify's Dawn theme) instead of a full-page nav. */
export function CartDrawer({ slug, products, open, onClose }: { slug: string; products: StoreProduct[]; open: boolean; onClose: () => void }) {
  const [cart, setCart] = useCart(slug);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = Object.entries(cart).filter(([id]) => byId.has(id));
  const total = lines.reduce((sum, [id, qty]) => sum + byId.get(id)!.priceMmk * qty, 0);

  const change = (id: string, delta: number) => {
    const next = { ...cart, [id]: Math.max(0, (cart[id] ?? 0) + delta) };
    if (next[id] === 0) delete next[id];
    setCart(next);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="ခြင်းတောင်း ပိတ်ရန်" onClick={onClose} className="absolute inset-0 bg-ink/40" />
      <div role="dialog" aria-label="ခြင်းတောင်း" className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="text-lg font-bold">ခြင်းတောင်း ({lines.reduce((s, [, q]) => s + q, 0)})</h2>
          <button type="button" aria-label="ပိတ်ရန်" onClick={onClose} className="flex h-10 w-10 items-center justify-center text-xl">×</button>
        </div>

        {lines.length === 0 ? (
          <p className="flex flex-1 items-center justify-center text-soft">ခြင်းတောင်းထဲမှာ ပစ္စည်း မရှိသေးပါ။</p>
        ) : (
          <ul className="flex-1 overflow-y-auto p-4">
            {lines.map(([id, qty]) => {
              const p = byId.get(id)!;
              return (
                <li key={id} className="flex items-center gap-3 border-b border-[#eee9dd] py-3 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold break-words">{p.name}</p>
                    <p className="text-sm text-soft">{formatMmk(p.priceMmk)}</p>
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
        )}

        {lines.length > 0 ? (
          <div className="flex flex-col gap-2.5 border-t border-line p-4">
            <p className="flex justify-between text-lg font-bold"><span>ပေါင်း</span><span>{formatMmk(total)}</span></p>
            <Link href={`/s/${slug}/checkout`} className="btn btn-primary">ငွေရှင်းမည်</Link>
            <Link href={`/s/${slug}/cart`} onClick={onClose} className="text-center text-sm font-semibold text-teal underline-offset-2 hover:underline">ခြင်းတောင်း စာမျက်နှာ အပြည့်အစုံ</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
