import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ShopHeader, ShopTabs } from "@/components/mobile";
import { SearchClient } from "./search-client";

export const metadata: Metadata = { title: "ရှာဖွေရန်" };

export default async function SearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const { shop, products } = result.data;

  return (
    <div className="mx-auto flex min-h-svh max-w-[84rem] flex-col">
      <ShopHeader name={shop.name} slug={slug} products={products} />
      <main id="main" className="flex-1">
        <SearchClient slug={slug} products={products} />
      </main>
      <ShopTabs slug={slug} active="search" />
    </div>
  );
}
