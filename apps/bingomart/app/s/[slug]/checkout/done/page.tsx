import type { Metadata } from "next";
import Link from "next/link";
import { WideScreen } from "@/components/mobile";
import { KV, Notice, Steps, money } from "@/components/kit";

export const metadata: Metadata = { title: "အော်ဒါ တင်ပြီးပါပြီ", robots: { index: false } };

/** Design 20: shown after checkout. Mock values; the real flow sends the shopper to their tracking link. */
export default async function OrderPlacedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <WideScreen
      title="အော်ဒါ တင်ပြီးပါပြီ"
      footer={
        <div className="flex flex-col gap-2">
          <Link href={`/s/${slug}/pay`} className="btn btn-primary min-h-13 w-full font-bold">ငွေလွှဲ စလစ် တင်မည်</Link>
          <Link href={`/s/${slug}`} className="btn btn-ghost w-full">ဈေးဆက်ဝယ်မည်</Link>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-3xl text-white">✓</span>
        <h2 className="text-xl">ကျေးဇူးတင်ပါတယ်</h2>
        <p className="text-soft">အော်ဒါ <b>#1049</b> ကို ဆိုင်ကို ပို့ပြီးပါပြီ</p>
      </div>
      <Notice tone="wait">ငွေလွှဲ ပေးချေမှု စောင့်ဆိုင်းနေသည် — စလစ် ပို့ပြီးမှ ဆိုင်က ပစ္စည်း ပြင်ဆင်မည်။</Notice>
      <section className="card">
        <KV
          items={[
            { k: "စုစုပေါင်း", v: money(47000) },
            { k: "ပေးချေနည်း", v: "KBZPay ငွေလွှဲ" },
            { k: "ပို့မည့်လိပ်စာ", v: "အမှတ် 12၊ ဗိုလ်ချုပ်လမ်း၊ ရန်ကုန်" },
            { k: "ခန့်မှန်း ရောက်ချိန်", v: "မနက်ဖြန် 10:00 – 14:00" },
          ]}
        />
      </section>
      <section className="card">
        <h3 className="mb-2 text-base">နောက်ထပ် ဘာဖြစ်မလဲ</h3>
        <Steps
          steps={[
            { title: "အော်ဒါ လက်ခံပြီး", state: "done" },
            { title: "စလစ် တင်ပြီး ငွေစစ်ခြင်း", state: "now" },
            { title: "ပစ္စည်း ပြင်ဆင်ခြင်း", state: "todo" },
            { title: "ပို့ဆောင်ခြင်း", state: "todo" },
          ]}
        />
      </section>
    </WideScreen>
  );
}
