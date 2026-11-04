import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo, money } from "@/components/kit";
import { api } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  return { title: result.ok ? { absolute: result.data.shop.name } : "BingoMart" };
}

/**
 * A link-in-bio landing page (Stan Store's structure: profile, then one big tappable
 * card per offer, full-bleed on a phone, no header chrome) for sharing on social media —
 * separate from the full shop at /s/[slug], which keeps Shopify's grid and cart.
 */
export default async function BioPage({ params }: Props) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const { shop, products } = result.data;
  const featured = products.filter((p: { inStock: boolean }) => p.inStock).slice(0, 4);

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-center gap-6 bg-ground px-5 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <span aria-hidden="true" className="flex h-20 w-20 items-center justify-center rounded-full bg-teal font-display text-3xl font-bold text-white">
          {Array.from(String(shop.name))[0]}
        </span>
        <h1 className="text-xl font-bold break-words">{shop.name}</h1>
        <p className="text-[0.9375rem] text-soft">BingoMart ပေါ်ရှိ အွန်လိုင်းဆိုင်</p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Link href={`/s/${slug}`} className="btn btn-primary min-h-14 w-full text-[1.0625rem] font-bold">ဆိုင်သို့ ဝင်ကြည့်ရန်</Link>

        {featured.map((p: { id: string; name: string; priceMmk: number }, i: number) => (
          <Link key={p.id} href={`/s/${slug}/p/${p.id}`} className="flex items-center gap-3 overflow-hidden rounded-2xl border border-line bg-card p-3 transition-colors hover:border-teal">
            <Photo i={i} className="h-14 w-14 flex-none rounded-xl" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{p.name}</span>
              <span className="block font-bold text-teal">{money(p.priceMmk)}</span>
            </span>
          </Link>
        ))}

        <Link href={`/s/${slug}/chat`} className="btn btn-ghost min-h-14 w-full">AI အကူအညီ ဖြင့် မေးမြန်းရန်</Link>
      </div>

      <p className="mt-auto pt-6 text-center text-[0.8125rem] text-soft">BingoMart ဖြင့် ဖန်တီးထားသည်</p>
    </div>
  );
}
