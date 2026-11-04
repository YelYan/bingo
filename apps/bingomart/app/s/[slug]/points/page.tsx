import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Meter } from "@/components/kit";
import { MobileScreen } from "@/components/mobile";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "ကျွန်ုပ် အမှတ်များ" };

export default async function LoyaltyShopperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();

  return (
    <MobileScreen title="ကျွန်ုပ် အမှတ်များ" back={`/s/${slug}`}>
      <section className="card bg-deep text-white">
        <p className="text-[0.8125rem] text-mist">လက်ရှိ အမှတ်</p>
        <p className="font-display text-4xl font-bold">1,240</p>
        <p className="mt-1 text-[0.8125rem] text-mist">Silver အဆင့် · Gold ရရန် 760 မှတ် လိုသေးသည်</p>
        <div className="mt-2"><Meter value={1240} max={2000} /></div>
      </section>
      <section className="card">
        <p className="font-semibold">အမှတ် ဘယ်လို ရလဲ</p>
        <p className="mt-1 text-[0.9375rem] text-soft">ဝယ်ယူတိုင်း 1 ကျပ် = 1 point။ Silver အဆင့်မှ 1.5× ရရှိသည်။</p>
      </section>
    </MobileScreen>
  );
}
