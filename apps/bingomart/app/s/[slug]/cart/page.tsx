import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ShopHeader, ShopTabs } from "@/components/mobile";
import { CartClient } from "./cart-client";

export const metadata: Metadata = { title: "ခြင်းတောင်း" };

export default async function CartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) notFound();
  const { shop, products } = result.data;

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col">
      <ShopHeader name={shop.name} slug={slug} products={products} />
      <main id="main" className="flex-1">
        <CartClient slug={slug} products={products} deliveryFeeMmk={shop.deliveryFeeMmk} />
      </main>
      <ShopTabs slug={slug} active="" />
    </div>
  );
}
