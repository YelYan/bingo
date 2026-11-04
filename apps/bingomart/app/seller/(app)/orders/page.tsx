import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { sellerApi } from "@/lib/api";
import { formatDateTime, formatMmk, paymentLabel, shipmentLabel } from "@/lib/copy";

export const metadata: Metadata = { title: "အော်ဒါများ" };

type Summary = {
  id: string;
  number: number;
  customerName: string;
  totalMmk: number;
  paymentStatus: string;
  shipmentStatus: string;
  createdAt: string;
};

export default async function OrdersPage() {
  const [orders, shop, products] = await Promise.all([
    sellerApi<Summary[]>("/seller/orders"),
    sellerApi("/seller/shop"),
    sellerApi<unknown[]>("/seller/products"),
  ]);
  const needsReview = orders.filter((o) => o.paymentStatus === "in_review").length;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-deep">အော်ဒါများ</h1>

      {needsReview > 0 ? (
        <p className="rounded-xl bg-cream p-3 text-sm font-semibold text-amber">စစ်ဆေးရန် စလစ် {needsReview} ခု ရှိသည်။</p>
      ) : null}
      {products.length === 0 ? (
        <p className="card text-sm">ပထမဆုံး ပစ္စည်းတင်ပါ။ <Link href="/seller/products" className="font-semibold text-teal underline">ပစ္စည်း ထည့်မည်</Link></p>
      ) : null}
      {shop.paymentAccounts.length === 0 ? (
        <p className="card text-sm">ငွေလွှဲအော်ဒါ လက်ခံရန် အကောင့်ထည့်ပါ။ <Link href="/seller/settings" className="font-semibold text-teal underline">ဆက်တင်</Link></p>
      ) : null}

      {orders.length === 0 ? (
        <div className="card text-center">
          <p className="text-soft">အော်ဒါ မရှိသေးပါ။ ဆိုင်လင့်ခ်ကို ဖောက်သည်များထံ မျှဝေပါ။</p>
          <div className="mt-3"><CopyButton text={`/s/${shop.slug}`} label="ဆိုင်လင့်ခ် ကော်ပီ" /></div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {orders.map((order) => (
            <li key={order.id}>
              <Link href={`/seller/orders/${order.id}`} className="card flex flex-wrap items-center justify-between gap-x-4 gap-y-1 transition-colors hover:border-teal">
                <span className="min-w-0">
                  <span className="block font-bold break-words">#{order.number} · {order.customerName}</span>
                  <span className="block text-[0.8125rem] text-soft">{formatDateTime(order.createdAt)}</span>
                </span>
                <span className="text-right">
                  <span className="block font-bold">{formatMmk(order.totalMmk)}</span>
                  <span className="block text-[0.8125rem] text-soft">{shipmentLabel[order.shipmentStatus]} · {paymentLabel[order.paymentStatus]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
