import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Store, type StoreProduct } from "@/components/store";
import { ShopHeader } from "@/components/mobile";
import { api } from "@/lib/api";

type Storefront = { shop: { name: string; slug: string; deliveryFeeMmk: number }; products: StoreProduct[] };
type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const result = await api<Storefront>(`/shops/${encodeURIComponent(slug)}`);
  if (result.ok) return result.data;
  if (result.status === 404) notFound();
  throw new Error(result.code);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shop } = await load((await params).slug);
  return { title: { absolute: shop.name } };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const { shop, products } = await load(slug);
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col bg-ground">
      <ShopHeader name={shop.name} slug={slug} products={products} />
      <main className="flex flex-1 flex-col justify-between">
        <Store slug={slug} products={products} />
      </main>
    </div>
  );
}
