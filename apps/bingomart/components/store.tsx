"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatMmk } from "@/lib/copy";

export type Variants = { sizes?: string[]; colors?: string[] };
export type StoreProduct = { id: string; name: string; priceMmk: number; inStock: boolean; variants?: Variants };
export type Cart = Record<string, number>;

const TINTS = ["#E4EFEA", "#F3E6D3", "#E5E6F2", "#F2DFDA"];
const SORTS = { featured: "အကြံပြုချက်", "price-asc": "ဈေးနှုန်း — နည်းမှ များသို့", "price-desc": "ဈေးနှုန်း — များမှ နည်းသို့" } as const;
type Sort = keyof typeof SORTS;

const cartKey = (slug: string) => `bm_cart_${slug}`;
const CART_EVENT = "bm-cart-change";

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
  // Tells every mounted cart UI (header badge, drawer) on this page to re-read.
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: { slug } }));
}

/** Live cart state for one shop, shared by the header badge, the drawer and the grid. */
export function useCart(slug: string): [Cart, (next: Cart) => void] {
  const [cart, setCart] = useState<Cart>({});
  useEffect(() => {
    setCart(readCart(slug));
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail?.slug === slug) setCart(readCart(slug));
    };
    window.addEventListener(CART_EVENT, onChange);
    return () => window.removeEventListener(CART_EVENT, onChange);
  }, [slug]);
  return [cart, (next) => writeCart(slug, next)];
}

/** Sort bar, filters sidebar and product grid — the standard storefront layout (Shopify's Dawn theme). */
export function Store({ slug, products }: { slug: string; products: StoreProduct[] }) {
  const [cart, setCart] = useCart(slug);
  const [sort, setSort] = useState<Sort>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const maxPrice = useMemo(() => Math.max(0, ...products.map((p) => p.priceMmk)), [products]);
  const [maxFilter, setMaxFilter] = useState(maxPrice);
  useEffect(() => setMaxFilter(maxPrice), [maxPrice]);

  const change = (id: string, delta: number) => {
    const next = { ...cart, [id]: Math.max(0, (cart[id] ?? 0) + delta) };
    if (next[id] === 0) delete next[id];
    setCart(next);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.priceMmk <= maxFilter && (!inStockOnly || p.inStock));
    if (sort !== "featured") {
      const by = sort === "price-asc" ? 1 : -1;
      list = [...list].sort((a, b) => (a.priceMmk - b.priceMmk) * by);
    }
    return list;
  }, [products, sort, inStockOnly, maxFilter]);

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = Object.entries(cart).filter(([id]) => byId.has(id));
  const count = lines.reduce((sum, [, qty]) => sum + qty, 0);
  const total = lines.reduce((sum, [id, qty]) => sum + byId.get(id)!.priceMmk * qty, 0);

  if (products.length === 0) {
    return <p className="p-8 text-center text-soft">ပစ္စည်း မတင်ရသေးပါ။ နောက်မှ ပြန်လာကြည့်ပါ။</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="shrink-0 text-[0.8125rem] whitespace-nowrap text-soft">{filtered.length} / {products.length} မျိုး</span>
        <label className="flex min-w-0 items-center gap-1.5 text-[0.8125rem]">
          <span className="shrink-0">စီစဉ်ရန်</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field !min-h-9 !w-auto min-w-0 border-0 bg-transparent py-0 pr-1 font-semibold">
            {Object.entries(SORTS).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
        <aside className="flex shrink-0 flex-col gap-3 rounded-2xl border border-line bg-card p-4 sm:w-52">
          <p className="font-semibold">စစ်ထုတ်ရန်</p>
          <label className="flex items-center gap-2 text-[0.9375rem]">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-5 w-5 accent-teal" />
            လက်ကျန်ရှိသည်သာ
          </label>
          <div>
            <p className="mb-1 text-[0.8125rem] text-soft">အမြင့်ဆုံး ဈေးနှုန်း — {formatMmk(maxFilter)}</p>
            <input type="range" min={0} max={maxPrice} step={1000} value={maxFilter} onChange={(e) => setMaxFilter(Number(e.target.value))} className="w-full accent-teal" />
          </div>
        </aside>

        {filtered.length === 0 ? (
          <p className="flex-1 py-10 text-center text-soft">စစ်ထုတ်ချက်နှင့် ကိုက်ညီသော ပစ္စည်း မရှိပါ။</p>
        ) : (
          <ul className="grid flex-1 grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => {
              const i = products.indexOf(product);
              return (
                <li key={product.id}>
                  <Link href={`/s/${slug}/p/${product.id}`} className="group block">
                    <div aria-hidden="true" className="flex aspect-square items-center justify-center overflow-hidden rounded-xl font-display text-5xl font-bold text-deep/40" style={{ background: TINTS[i % TINTS.length] }}>
                      {product.name.slice(0, 1)}
                    </div>
                    <h2 className="mt-2.5 truncate text-[0.9375rem] font-semibold group-hover:text-teal">{product.name}</h2>
                  </Link>
                  <p className="font-bold text-teal">{formatMmk(product.priceMmk)}</p>
                  {!product.inStock ? (
                    <p className="mt-1.5 text-sm font-semibold text-danger">ပစ္စည်းကုန်</p>
                  ) : product.variants ? (
                    <Link href={`/s/${slug}/p/${product.id}`} className="mt-1.5 inline-block text-sm font-semibold text-teal underline-offset-2 hover:underline">ရွေးချယ်ရန်</Link>
                  ) : cart[product.id] ? (
                    <div className="mt-1.5 flex items-center justify-between">
                      <button type="button" aria-label={`${product.name} တစ်ခု လျှော့ရန်`} onClick={() => change(product.id, -1)} className="btn btn-ghost h-9 w-9 !p-0">−</button>
                      <span aria-live="polite" className="font-bold">{cart[product.id]}</span>
                      <button type="button" aria-label={`${product.name} တစ်ခု တိုးရန်`} onClick={() => change(product.id, 1)} className="btn btn-primary h-9 w-9 !p-0">+</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => change(product.id, 1)} className="mt-1.5 text-sm font-semibold text-teal underline-offset-2 hover:underline">ခြင်းထဲ လျင်မြန်စွာ ထည့်ရန်</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

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
