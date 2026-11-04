import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/kit";
import { ShopHeader } from "@/components/mobile";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "ပစ္စည်း သုံးသပ်ချက်များ" };

const reviews = [
  { name: "ဒေါ်သီတာ", stars: 5, verified: true, text: "အရည်အသွေး ကောင်းပါတယ်၊ ပြောသလို အရွယ်အစား မှန်ပါတယ်။" },
  { name: "ကိုအောင်မင်း", stars: 4, verified: true, text: "လျင်မြန်စွာ ပို့ပေးပါတယ်။ ပစ္စည်းလည်း ကောင်းပါတယ်။" },
  { name: "မမြတ်နိုး", stars: 5, verified: false, text: "ဒုတိယအကြိမ် ဝယ်ပါပြီ။ အရောင် ပုံမှာထက် တောင် ပိုလှပါတယ်။" },
];

// Mock rating breakdown — averages to the 4.7 shown, matches Shopify/Payhip's distribution-bar pattern.
const breakdown = [
  { stars: 5, count: 24 },
  { stars: 4, count: 6 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];
const totalReviews = breakdown.reduce((sum, b) => sum + b.count, 0);

/** Rating-summary sidebar + review list, the standard desktop reviews layout (Shopify's rating breakdown bars, Payhip's verified-buyer review cards). */
export default async function ReviewsPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const { shop, products } = result.data;
  const product = products.find((p: { id: string }) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-[84rem]">
      <ShopHeader name={shop.name} slug={slug} products={products} />
      <main id="main" className="p-4 sm:p-6">
        <Link href={`/s/${slug}/p/${id}`} className="mb-4 inline-block text-[0.9375rem] font-semibold text-teal underline-offset-2 hover:underline">← {product.name}</Link>
        <div className="grid gap-6 sm:grid-cols-[18rem_1fr] sm:items-start sm:gap-8">
          <div className="card flex flex-col gap-4 sm:sticky sm:top-4">
            <div className="flex items-center gap-4">
              <p className="font-display text-4xl font-bold text-deep">4.7</p>
              <div><p aria-hidden="true" className="text-saffron">★★★★★</p><p className="text-[0.8125rem] text-soft">သုံးသပ်ချက် {totalReviews} ခု</p></div>
            </div>
            <ul className="flex flex-col gap-1.5">
              {breakdown.map((b) => (
                <li key={b.stars} className="flex items-center gap-2 text-[0.8125rem]">
                  <span className="w-5 shrink-0 text-soft">{b.stars}★</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#e7e2d4]">
                    <span className="block h-full rounded-full bg-saffron" style={{ width: `${totalReviews ? (b.count / totalReviews) * 100 : 0}%` }} />
                  </span>
                  <span className="w-6 shrink-0 text-right text-soft">{b.count}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-ghost w-full">သုံးသပ်ချက် ရေးရန်</button>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name} className="card">
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.name} size="h-8 w-8" />
                  <span className="font-semibold">{r.name}</span>
                  {r.verified ? <span className="rounded-full bg-mint px-2 py-0.5 text-[0.6875rem] font-semibold text-[#0a5547]">ဝယ်ယူသူ အတည်ပြု</span> : null}
                </div>
                <p aria-label={`${r.stars} out of 5 stars`} className="mt-1 text-saffron">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</p>
                <p className="mt-1 text-[0.9375rem] text-[#3b433e]">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
