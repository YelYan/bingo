"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Photo, money } from "@/components/kit";
import type { StoreProduct } from "@/components/store";

export function SearchClient({ slug, products }: { slug: string; products: StoreProduct[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => (q.trim() ? products.filter((p) => p.name.includes(q.trim())) : []), [q, products]);

  return (
    <div className="flex flex-col gap-3 p-4">
      <label>
        <span className="sr-only">ပစ္စည်း ရှာရန်</span>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="ပစ္စည်းအမည် ရှာပါ…" className="field" />
      </label>
      {q.trim() === "" ? (
        <p className="py-8 text-center text-soft">ရှာလိုသော ပစ္စည်း အမည် ရိုက်ထည့်ပါ</p>
      ) : results.length === 0 ? (
        <p className="py-8 text-center text-soft">&ldquo;{q}&rdquo; နှင့် ကိုက်ညီသော ပစ္စည်း မတွေ့ပါ</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {results.map((p, i) => (
            <li key={p.id}>
              <Link href={`/s/${slug}/p/${p.id}`} className="block overflow-hidden rounded-2xl border border-line bg-card">
                <Photo i={i} className="h-28" />
                <div className="p-2.5"><p className="truncate text-sm font-semibold">{p.name}</p><p className="font-bold text-teal">{money(p.priceMmk)}</p></div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
