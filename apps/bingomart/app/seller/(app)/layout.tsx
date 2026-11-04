import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/shells";
import { Meter } from "@/components/kit";
import { sellerApi } from "@/lib/api";
import { sellerNav } from "@/lib/nav";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SellerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shop = await sellerApi("/seller/shop");
  return (
    <AppShell
      brand={shop.name}
      subtitle={`/s/${shop.slug}`}
      groups={sellerNav}
      footer={
        <div className="flex flex-col gap-2 rounded-xl bg-ground p-3.5">
          <p className="text-[0.8125rem] font-semibold">အခမဲ့ အစီအစဉ်</p>
          <p className="text-[0.8125rem] text-soft">AI စာ 312 / 500 ရှိပြီ</p>
          <Meter value={312} max={500} />
          <Link href="/seller/plans" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">အဆင့်မြှင့်ရန် →</Link>
          <Link href={`/s/${shop.slug}`} target="_blank" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">ဆိုင်ကြည့်ရန် ↗</Link>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
