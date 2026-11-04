import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Photo, money } from "@/components/kit";
import { Toggle } from "@/components/kit-client";
import { ShopHeader } from "@/components/mobile";
import { api } from "@/lib/api";
import { AddToCart } from "./add-to-cart";

type Props = { params: Promise<{ slug: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  const product = result.ok ? result.data.products.find((p: { id: string }) => p.id === id) : null;
  return { title: product?.name ?? "ပစ္စည်း" };
}

/** Two-column split (image | info), the standard storefront product-page layout (Shopify's Dawn theme). */
export default async function ProductPage({ params }: Props) {
  const { slug, id } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const { shop, products } = result.data;
  const product = products.find((p: { id: string }) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-[84rem]">
      <ShopHeader name={shop.name} slug={slug} products={products} />
      <main id="main" className="grid gap-6 p-4 sm:grid-cols-2 sm:items-start sm:gap-8 sm:p-6">
        <div className="sm:sticky sm:top-4">
          <Photo className="aspect-square h-auto rounded-2xl" label={product.name} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-bold break-words sm:text-2xl">{product.name}</h1>
            <p className="mt-1 text-2xl font-bold text-teal">{money(product.priceMmk)}</p>
          </div>
          {product.inStock ? (
            <p className="w-fit rounded-full bg-mint px-3 py-1 text-[0.8125rem] font-semibold text-[#0a5547]">လက်ကျန် ရှိသည်</p>
          ) : (
            <p className="w-fit rounded-full bg-danger-wash px-3 py-1 text-[0.8125rem] font-semibold text-danger">ပစ္စည်းကုန်</p>
          )}
          <AddToCart slug={slug} product={product} />
          <div className="card">
            <Toggle title="ပစ္စည်း အသေးစိတ်" defaultOpen>
              <p className="text-[0.9375rem] leading-relaxed text-[#3b433e]">ဤပစ္စည်းအတွက် အသေးစိတ် ဖော်ပြချက် မရေးရသေးပါ — ဆိုင်ရှင် ထည့်သွင်းနိုင်ပါသည်။</p>
            </Toggle>
          </div>
          <div className="card">
            <Toggle title="ပို့ဆောင်ရေးနှင့် ပြန်အမ်းမှု">
              <p className="text-[0.9375rem] leading-relaxed text-[#3b433e]">ပို့ခ — {money(shop.deliveryFeeMmk)}။ ပြန်အမ်း/ပြန်လဲ မူဝါဒကို ဆိုင်ရှင်ထံ မေးမြန်းပါ။</p>
            </Toggle>
          </div>
        </div>
      </main>
    </div>
  );
}
