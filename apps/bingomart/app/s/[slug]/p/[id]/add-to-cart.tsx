"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Qty } from "@/components/kit-client";
import { readCart, writeCart, type Variants } from "@/components/store";

export function AddToCart({ slug, product }: { slug: string; product: { id: string; inStock: boolean; variants?: Variants } }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  useEffect(() => {
    setAdded(false);
    setSize(null);
    setColor(null);
  }, [product.id]);

  const needsSize = !!product.variants?.sizes?.length;
  const needsColor = !!product.variants?.colors?.length;
  const ready = (!needsSize || size) && (!needsColor || color);

  const add = () => {
    // shortcut: the cart only tracks qty per product id, not the chosen size/colour — upgrade
    // when checkout needs per-variant stock or price.
    const cart = readCart(slug);
    cart[product.id] = (cart[product.id] ?? 0) + qty;
    writeCart(slug, cart);
    setAdded(true);
  };

  if (!product.inStock) return null;
  return (
    <div className="flex flex-col gap-3">
      {needsSize ? (
        <fieldset>
          <legend className="mb-1.5 text-[0.8125rem] font-semibold text-soft">အရွယ်အစား</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants!.sizes!.map((s) => (
              <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${size === s ? "border-teal bg-teal text-white" : "border-[#d9d3c4] bg-card"}`}>{s}</button>
            ))}
          </div>
        </fieldset>
      ) : null}
      {needsColor ? (
        <fieldset>
          <legend className="mb-1.5 text-[0.8125rem] font-semibold text-soft">အရောင်</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants!.colors!.map((c) => (
              <button key={c} type="button" aria-pressed={color === c} onClick={() => setColor(c)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${color === c ? "border-teal bg-teal text-white" : "border-[#d9d3c4] bg-card"}`}>{c}</button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t border-line bg-card p-4">
        <Qty label="အရေအတွက်" defaultValue={1} min={1} onChange={setQty} />
        <button type="button" disabled={!ready} onClick={added ? () => router.push(`/s/${slug}/checkout`) : add} className="btn btn-primary flex-1 disabled:opacity-50">
          {!ready ? "ရွေးချယ်ပါ" : added ? "ခြင်းထဲ ရှိပြီ — ငွေရှင်းမည်" : "ခြင်းထဲ ထည့်မည်"}
        </button>
      </div>
    </div>
  );
}
