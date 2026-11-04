"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Qty } from "@/components/kit-client";
import { readCart, writeCart } from "@/components/store";

export function AddToCart({ slug, product }: { slug: string; product: { id: string; inStock: boolean } }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  useEffect(() => setAdded(false), [product.id]);

  const add = () => {
    const cart = readCart(slug);
    cart[product.id] = (cart[product.id] ?? 0) + qty;
    writeCart(slug, cart);
    setAdded(true);
  };

  if (!product.inStock) return null;
  return (
    <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t border-line bg-card p-4">
      <Qty label="အရေအတွက်" defaultValue={1} min={1} onChange={setQty} />
      <button type="button" onClick={added ? () => router.push(`/s/${slug}/checkout`) : add} className="btn btn-primary flex-1">
        {added ? "ခြင်းထဲ ရှိပြီ — ငွေရှင်းမည်" : "ခြင်းထဲ ထည့်မည်"}
      </button>
    </div>
  );
}
