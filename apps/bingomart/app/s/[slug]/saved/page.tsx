import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ShopHeader, ShopTabs } from "@/components/mobile";

export const metadata: Metadata = { title: "သိမ်းထားသည်များ" };

export default async function SavedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col">
      <ShopHeader name={result.data.shop.name} slug={slug} products={result.data.products} />
      <main id="main" className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
        <p className="text-5xl" aria-hidden="true">♡</p>
        <p className="text-soft">သိမ်းထားသော ပစ္စည်း မရှိသေးပါ။ နှစ်သက်သော ပစ္စည်းကို ♡ နှိပ်၍ သိမ်းနိုင်သည်။</p>
      </main>
      <ShopTabs slug={slug} active="saved" />
    </div>
  );
}
