import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Store, type StoreProduct } from "@/components/store";
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
      <header className="flex items-center gap-2.5 border-b border-line bg-card px-4 py-3">
        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal font-bold text-white">{shop.name.slice(0, 1)}</span>
        <h1 className="text-lg break-words">{shop.name}</h1>
      </header>
      <main className="flex flex-1 flex-col justify-between">
        <Store slug={slug} products={products} />
      </main>
    </div>
  );
}
