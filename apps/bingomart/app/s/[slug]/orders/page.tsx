import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ShopHeader, ShopTabs } from "@/components/mobile";
import { paymentLabel, shipmentLabel } from "@/lib/copy";

export const metadata: Metadata = { title: "ကျွန်ုပ် အော်ဒါများ" };

export default async function MyOrdersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col">
      <ShopHeader name={result.data.shop.name} slug={slug} products={result.data.products} />
      <main id="main" className="flex-1 p-4">
        <h1 className="mb-3 text-lg font-bold">ကျွန်ုပ် အော်ဒါများ</h1>
        <p className="rounded-xl bg-[#e7f0fb] px-3.5 py-3 text-[0.8125rem] text-[#1f4e8c]">
          အော်ဒါတင်ပြီးချိန်တွင် ပေးထားသော ခြေရာခံလင့်ခ်ဖြင့်သာ အော်ဒါကို ကြည့်နိုင်ပါသည် — အကောင့်ဖြင့် ဝင်ရောက်ခြင်း မရှိသေးပါ။
        </p>
        <p className="mt-6 text-center text-soft">လင့်ခ်ကို သိမ်းထားပါ သို့မဟုတ် {" "}
          <Link href="/" className="font-semibold text-teal underline">Bingo</Link> မှတစ်ဆင့် ရှာနိုင်သည်။
        </p>
      </main>
      <ShopTabs slug={slug} active="orders" />
    </div>
  );
}
