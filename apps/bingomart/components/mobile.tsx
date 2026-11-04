"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { CartDrawer } from "./cart-drawer";
import { useCart, type StoreProduct } from "./store";

/** A phone-width screen, centred on wider displays. Used for shopper, rider and owner-phone pages. */
export function MobileScreen({
  title,
  sub,
  back,
  right,
  children,
  footer,
  tone = "light",
}: {
  title: string;
  sub?: string;
  back?: string;
  right?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "teal" | "dark";
}) {
  const head = tone === "teal" ? "bg-teal text-white" : tone === "dark" ? "bg-ink text-white" : "border-b border-line bg-card";
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-ground">
      <header className={`sticky top-0 z-10 flex items-center gap-3 px-4 py-2.5 ${head}`}>
        {back ? (
          <Link href={back} aria-label="နောက်သို့" className="flex h-11 w-11 flex-none items-center justify-center text-xl">
            ←
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="text-base leading-snug break-words">{title}</h1>
          {sub ? <p className={`text-[0.8125rem] break-words ${tone === "light" ? "text-soft" : "opacity-80"}`}>{sub}</p> : null}
        </div>
        {right}
      </header>
      <main id="main" className="flex flex-1 flex-col gap-4 p-4">
        {children}
      </main>
      {footer ? <div className="sticky bottom-0 border-t border-line bg-card p-4">{footer}</div> : null}
    </div>
  );
}

/** Same chrome as MobileScreen but wider — shopper utility/confirmation pages stay centred on desktop (Amazon's own account pages do too), just not phone-width. */
export function WideScreen({
  title,
  sub,
  back,
  right,
  children,
  footer,
  tone = "light",
  width = "max-w-2xl",
}: {
  title: string;
  sub?: string;
  back?: string;
  right?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "teal" | "dark";
  width?: string;
}) {
  const head = tone === "teal" ? "bg-teal text-white" : tone === "dark" ? "bg-ink text-white" : "border-b border-line bg-card";
  return (
    <div className={`mx-auto flex min-h-svh ${width} flex-col bg-ground`}>
      <header className={`sticky top-0 z-10 flex items-center gap-3 px-4 py-2.5 sm:px-6 ${head}`}>
        {back ? (
          <Link href={back} aria-label="နောက်သို့" className="flex h-11 w-11 flex-none items-center justify-center text-xl">
            ←
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="text-base leading-snug break-words sm:text-lg">{title}</h1>
          {sub ? <p className={`text-[0.8125rem] break-words ${tone === "light" ? "text-soft" : "opacity-80"}`}>{sub}</p> : null}
        </div>
        {right}
      </header>
      <main id="main" className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        {children}
      </main>
      {footer ? <div className="sticky bottom-0 border-t border-line bg-card p-4 sm:p-6">{footer}</div> : null}
    </div>
  );
}

/** The shop header: logo, search, and a cart button that opens a slide-in drawer (the default storefront pattern). */
export function ShopHeader({ name, slug, products = [] }: { name: string; slug: string; products?: StoreProduct[] }) {
  const [open, setOpen] = useState(false);
  const [cart] = useCart(slug);
  const count = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <header className="flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-2.5">
      <Link href={`/s/${slug}`} className="flex min-h-11 min-w-0 items-center gap-2.5">
        <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-teal text-[0.8125rem] font-bold text-white">{Array.from(name)[0]}</span>
        <span className="truncate font-display font-bold">{name}</span>
      </Link>
      <nav aria-label="ဆိုင်" className="flex items-center">
        <Link href={`/s/${slug}/search`} aria-label="ရှာရန်" className="flex h-11 w-11 items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5" /></svg>
        </Link>
        <button type="button" aria-label={`ခြင်းတောင်း ဖွင့်ရန် (${count})`} onClick={() => setOpen(true)} className="relative flex h-11 w-11 items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 7h12l1 13H5zM9 7a3 3 0 016 0" /></svg>
          {count > 0 ? <span className="absolute top-1.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.6875rem] font-bold text-white">{count}</span> : null}
        </button>
      </nav>
      <CartDrawer slug={slug} products={products} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

const TABS = [
  { key: "", label: "ပင်မ", d: "M3 11l9-8 9 8M5 10v10h14V10" },
  { key: "search", label: "ရှာရန်", d: "M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5" },
  { key: "orders", label: "အော်ဒါ", d: "M6 7h12l1 13H5zM9 7a3 3 0 016 0" },
  { key: "saved", label: "သိမ်းထား", d: "M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" },
];

/** The shopper's bottom tab bar. */
export function ShopTabs({ slug, active }: { slug: string; active: string }) {
  return (
    <nav aria-label="ဆိုင် မီနူး" className="sticky bottom-0 grid grid-cols-4 border-t border-line bg-card px-2 pb-2">
      {TABS.map((t) => (
        <Link key={t.key} href={`/s/${slug}${t.key ? `/${t.key}` : ""}`} aria-current={active === t.key ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-semibold ${active === t.key ? "text-teal" : "text-[#9ca39e]"}`}>
          <svg viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.d} /></svg>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
