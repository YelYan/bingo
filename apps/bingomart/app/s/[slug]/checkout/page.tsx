import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = { title: "ငွေရှင်းရန်", robots: { index: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await api(`/shops/${encodeURIComponent(slug)}`);
  if (!result.ok) {
    if (result.status === 404) notFound();
    throw new Error(result.code);
  }
  const { shop, products } = result.data;
  return (
    <div className="mx-auto min-h-svh max-w-5xl">
      <header className="flex items-center gap-3 border-b border-line bg-card px-4 py-3 sm:px-6">
        <Link href={`/s/${slug}`} aria-label="ဆိုင်သို့ ပြန်သွားရန်" className="btn !min-h-11 !p-2 text-lg">←</Link>
        <h1 className="text-base">ငွေရှင်းရန်</h1>
      </header>
      <CheckoutForm slug={slug} products={products.filter((p: { inStock: boolean }) => p.inStock)} deliveryFeeMmk={shop.deliveryFeeMmk} />
    </div>
  );
}
