import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Photo, money } from "@/components/kit";
import { MobileScreen } from "@/components/mobile";
import { api } from "@/lib/api";
import { AddToCart } from "./add-to-cart";

type Props = { params: Promise<{ slug: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  const product = result.ok ? result.data.products.find((p: { id: string }) => p.id === id) : null;
  return { title: product?.name ?? "ပစ္စည်း" };
}

export default async function ProductPage({ params }: Props) {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const product = result.data.products.find((p: { id: string }) => p.id === id);
  if (!product) notFound();

  return (
    <MobileScreen title={product.name} back={`/s/${slug}`} right={<Link href={`/s/${slug}/checkout`} className="mr-1 flex h-11 w-11 items-center justify-center">🛒</Link>}>
      <div className="-mx-4 -mt-4"><Photo className="h-72" label={product.name} /></div>
      <h1 className="text-xl font-bold break-words">{product.name}</h1>
      <p className="text-2xl font-bold text-teal">{money(product.priceMmk)}</p>
      {product.inStock ? (
        <p className="w-fit rounded-full bg-mint px-3 py-1 text-[0.8125rem] font-semibold text-[#0a5547]">လက်ကျန် ရှိသည်</p>
      ) : (
        <p className="w-fit rounded-full bg-danger-wash px-3 py-1 text-[0.8125rem] font-semibold text-danger">ပစ္စည်းကုန်</p>
      )}
      <p className="text-[0.9375rem] leading-relaxed text-[#3b433e]">ဤပစ္စည်းအတွက် အသေးစိတ် ဖော်ပြချက် မရေးရသေးပါ — ဆိုင်ရှင် ထည့်သွင်းနိုင်ပါသည်။</p>
      <AddToCart slug={slug} product={product} />
    </MobileScreen>
  );
}
