"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Photo, money } from "@/components/kit";
import type { StoreProduct } from "@/components/store";

/** Live suggestion dropdown (Shopify's instant search) + popular-search chips (Amazon) + a wide results grid. */
export function SearchClient({ slug, products }: { slug: string; products: StoreProduct[] }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const trimmed = q.trim();
  const results = useMemo(() => (trimmed ? products.filter((p) => p.name.includes(trimmed)) : []), [trimmed, products]);
  const suggestions = results.slice(0, 5);
  const popular = products.slice(0, 6);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <div className="relative">
        <label>
          <span className="sr-only">ပစ္စည်း ရှာရန်</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="ပစ္စည်းအမည် ရှာပါ…"
            className="field"
          />
        </label>
        {focused && trimmed && suggestions.length > 0 ? (
          <ul className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-line bg-card shadow-lg">
            {suggestions.map((p) => (
              <li key={p.id}>
                <Link href={`/s/${slug}/p/${p.id}`} className="flex items-center gap-3 px-3 py-2 hover:bg-ground">
                  <Photo i={products.indexOf(p)} className="h-10 w-10 shrink-0 rounded-lg" />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{p.name}</span>
                  <span className="shrink-0 text-sm font-bold text-teal">{money(p.priceMmk)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {trimmed === "" ? (
        <div className="flex flex-col gap-2">
          <p className="text-[0.8125rem] font-semibold text-soft">လူကြိုက်များသော ရှာဖွေမှုများ</p>
          <div className="flex flex-wrap gap-2">
            {popular.map((p) => (
              <button key={p.id} type="button" onClick={() => setQ(p.name)} className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold hover:border-teal">
                {p.name}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="py-8 text-center text-soft">&ldquo;{trimmed}&rdquo; နှင့် ကိုက်ညီသော ပစ္စည်း မတွေ့ပါ</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[0.8125rem] text-soft">{results.length} ခု တွေ့ရှိသည်</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <li key={p.id}>
                <Link href={`/s/${slug}/p/${p.id}`} className="block overflow-hidden rounded-2xl border border-line bg-card">
                  <Photo i={products.indexOf(p)} className="h-28" />
                  <div className="p-2.5"><p className="truncate text-sm font-semibold">{p.name}</p><p className="font-bold text-teal">{money(p.priceMmk)}</p></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
