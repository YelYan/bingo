"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Field, keepValuesOnSubmit, PendingProvider, Submit } from "@/components/action-form";
import { readCart, writeCart, type Cart, type StoreProduct } from "@/components/store";
import { formatMmk, regions } from "@/lib/copy";
import { placeOrder } from "./actions";

export function CheckoutForm({ slug, products, deliveryFeeMmk }: { slug: string; products: StoreProduct[]; deliveryFeeMmk: number }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(placeOrder, null);
  const [cart, setCart] = useState<Cart | null>(null);
  // One key per checkout: a retry after a dropped connection repeats the same order.
  const [idempotencyKey, setKey] = useState("");

  useEffect(() => {
    setCart(readCart(slug));
    setKey(crypto.randomUUID());
  }, [slug]);

  useEffect(() => {
    if (!state?.trackingToken) return;
    writeCart(slug, {});
    router.replace(`/t/${state.trackingToken}`);
  }, [state, slug, router]);

  if (!cart) return null;

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = Object.entries(cart).filter(([id]) => byId.has(id));
  if (lines.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-soft">ခြင်းတောင်းထဲမှာ ပစ္စည်း မရှိသေးပါ။</p>
        <Link href={`/s/${slug}`} className="btn btn-ghost mt-4">ဆိုင်သို့ ပြန်သွားမည်</Link>
      </div>
    );
  }

  const subtotal = lines.reduce((sum, [id, qty]) => sum + byId.get(id)!.priceMmk * qty, 0);

  return (
    <form action={action} onSubmit={keepValuesOnSubmit(action)} className="grid gap-6 p-4 sm:grid-cols-[1fr_20rem] sm:items-start sm:gap-8 sm:p-6">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
      <input type="hidden" name="items" value={JSON.stringify(lines.map(([productId, qty]) => ({ productId, qty })))} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Field label="အမည်"><input name="name" required maxLength={100} autoComplete="name" className="field" /></Field>
          <Field label="ဖုန်းနံပါတ်"><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="09 ___ ___ ___" className="field" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="တိုင်း / ပြည်နယ်">
              <select name="region" required defaultValue="ရန်ကုန်" className="field">
                {regions.map((region) => <option key={region}>{region}</option>)}
              </select>
            </Field>
            <Field label="မြို့နယ်"><input name="township" required maxLength={60} className="field" /></Field>
          </div>
          <Field label="လမ်း / ရပ်ကွက် နှင့် အမှတ်အသား">
            <textarea name="address" required minLength={3} maxLength={500} rows={2} placeholder="ဥပမာ — ၅ လမ်း၊ (၃) ရပ်ကွက်၊ ဘုရားရှေ့" className="field" />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 font-semibold">ငွေပေးချေမည့်နည်း</legend>
          <div className="grid grid-cols-2 gap-2">
            {[["cod", "အိမ်ရောက်ငွေချေ (COD)"], ["transfer", "ငွေလွှဲ (KBZPay၊ Wave၊ ဘဏ်)"]].map(([value, label], i) => (
              <label key={value} className="flex min-h-14 cursor-pointer items-center justify-center rounded-xl border border-[#d9d3c4] bg-card px-3 py-2 text-center text-sm font-semibold has-checked:border-2 has-checked:border-teal has-checked:bg-mint has-focus-visible:outline-2 has-focus-visible:outline-teal">
                <input type="radio" name="paymentMethod" value={value} defaultChecked={i === 0} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <section className="card flex flex-col gap-3 sm:sticky sm:top-4">
        <h2 className="font-bold">အော်ဒါ ({lines.length} မျိုး)</h2>
        <ul className="space-y-1 text-[0.9375rem]">
          {lines.map(([id, qty]) => (
            <li key={id} className="flex justify-between gap-3">
              <span className="min-w-0 break-words">{byId.get(id)!.name} × {qty}</span>
              <span className="shrink-0">{(byId.get(id)!.priceMmk * qty).toLocaleString("en-US")}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1.5 border-t border-line pt-2 text-sm">
          <div className="flex justify-between text-soft"><span>ပစ္စည်း</span><span>{formatMmk(subtotal)}</span></div>
          <div className="flex justify-between text-soft"><span>ပို့ခ</span><span>{formatMmk(deliveryFeeMmk)}</span></div>
          <div className="flex justify-between text-lg font-bold"><span>စုစုပေါင်း</span><span>{formatMmk(subtotal + deliveryFeeMmk)}</span></div>
        </div>
        {state?.error ? <p role="alert" className="rounded-xl bg-danger-wash px-3 py-2 text-sm font-semibold text-danger">{state.error}</p> : null}
        <PendingProvider value={pending}>
          <Submit className="btn-primary w-full">အော်ဒါ တင်မည်</Submit>
        </PendingProvider>
      </section>
    </form>
  );
}
