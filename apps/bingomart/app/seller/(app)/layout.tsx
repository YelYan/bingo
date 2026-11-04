import type { Metadata } from "next";
import Link from "next/link";
import { sellerApi } from "@/lib/api";
import { logout } from "../actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SellerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shop = await sellerApi("/seller/shop");
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 border-b border-line bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2">
          <Link href="/seller" className="flex min-h-11 min-w-0 items-center gap-2 font-display font-bold text-deep">
            <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-deep text-xs text-saffron">Bm</span>
            <span className="truncate">{shop.name}</span>
          </Link>
          <nav aria-label="ဆိုင်စီမံရန်" className="flex flex-wrap items-center gap-x-4 text-[0.9375rem] font-medium">
            <Link href="/seller" className="inline-flex min-h-11 items-center hover:text-teal">အော်ဒါများ</Link>
            <Link href="/seller/products" className="inline-flex min-h-11 items-center hover:text-teal">ပစ္စည်းများ</Link>
            <Link href="/seller/settings" className="inline-flex min-h-11 items-center hover:text-teal">ဆက်တင်</Link>
            <Link href={`/s/${shop.slug}`} target="_blank" className="inline-flex min-h-11 items-center hover:text-teal">ဆိုင်ကြည့်ရန်</Link>
            <form action={logout}><button type="submit" className="inline-flex min-h-11 items-center text-soft hover:text-ink">ထွက်မည်</button></form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">{children}</main>
    </div>
  );
}
