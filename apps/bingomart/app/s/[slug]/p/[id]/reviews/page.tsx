import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/kit";
import { MobileScreen } from "@/components/mobile";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "ပစ္စည်း သုံးသပ်ချက်များ" };

const reviews = [
  { name: "ဒေါ်သီတာ", stars: 5, text: "အရည်အသွေး ကောင်းပါတယ်၊ ပြောသလို အရွယ်အစား မှန်ပါတယ်။" },
  { name: "ကိုအောင်မင်း", stars: 4, text: "လျင်မြန်စွာ ပို့ပေးပါတယ်။ ပစ္စည်းလည်း ကောင်းပါတယ်။" },
  { name: "မမြတ်နိုး", stars: 5, text: "ဒုတိယအကြိမ် ဝယ်ပါပြီ။ အရောင် ပုံမှာထက် တောင် ပိုလှပါတယ်။" },
];

export default async function ReviewsPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const product = result.data.products.find((p: { id: string }) => p.id === id);
  if (!product) notFound();

  return (
    <MobileScreen title="သုံးသပ်ချက်များ" sub={product.name} back={`/s/${slug}/p/${id}`}>
      <div className="card flex items-center gap-4">
        <p className="font-display text-4xl font-bold text-deep">4.7</p>
        <div><p aria-hidden="true" className="text-saffron">★★★★★</p><p className="text-[0.8125rem] text-soft">သုံးသပ်ချက် 32 ခု</p></div>
      </div>
      <ul className="flex flex-col gap-3">
        {reviews.map((r) => (
          <li key={r.name} className="card">
            <div className="flex items-center gap-2.5"><Avatar name={r.name} size="h-8 w-8" /><span className="font-semibold">{r.name}</span></div>
            <p aria-label={`${r.stars} out of 5 stars`} className="mt-1 text-saffron">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</p>
            <p className="mt-1 text-[0.9375rem] text-[#3b433e]">{r.text}</p>
          </li>
        ))}
      </ul>
    </MobileScreen>
  );
}
