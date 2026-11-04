import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { randomUUID } from "node:crypto";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { CopyButton } from "@/components/copy-button";
import { api, sellerApi } from "@/lib/api";
import { eventLabel, formatDate, formatDateTime, formatMmk, paymentLabel, shipmentLabel } from "@/lib/copy";
import { approvePayment, rejectPayment, sendEvent } from "../../../actions";

export const metadata: Metadata = { title: "အော်ဒါ အသေးစိတ်" };

/** The next steps the API will accept, so the seller never sees a button that must fail. */
const NEXT_STEPS: Record<string, { type: string; label: string }[]> = {
  created: [{ type: "PACKED", label: "ပစ္စည်း ပြင်ဆင်ပြီး" }],
  with_carrier: [{ type: "OUT_FOR_DELIVERY", label: "လမ်းပေါ် ရောက်နေသည်" }, { type: "DELIVERED", label: "လက်ခံရရှိပြီး" }],
  out_for_delivery: [{ type: "DELIVERED", label: "လက်ခံရရှိပြီး" }, { type: "DELIVERY_ATTEMPTED", label: "ပို့၍ မရသေးပါ" }],
  attempted: [{ type: "OUT_FOR_DELIVERY", label: "ပြန်ပို့နေသည်" }, { type: "DELIVERED", label: "လက်ခံရရှိပြီး" }],
};

const CANCELLABLE = new Set(["created", "packed"]);

/** Each render gets a new event id; a double tap repeats it and the API ignores the repeat. */
function StepForm({ orderId, type, label, danger }: { orderId: string; type: string; label: string; danger?: boolean }) {
  return (
    <ActionForm action={sendEvent}>
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="eventId" value={randomUUID()} />
      <input type="hidden" name="type" value={type} />
      <Submit className={danger ? "btn-danger" : "btn-primary"}>{label}</Submit>
    </ActionForm>
  );
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await api(`/seller/orders/${id}`, { seller: true });
  if (!found.ok) {
    if (found.status === 404 || found.status === 400) notFound();
    await sellerApi(`/seller/orders/${id}`); // 401 redirects to sign-in; anything else throws.
    return null;
  }
  const order = found.data;
  const { shipment } = order;
  const receipt = order.paymentMethod === "transfer" ? await sellerApi(`/seller/orders/${id}/receipt/info`) : null;
  const inReview = order.paymentStatus === "in_review";
  const steps = NEXT_STEPS[shipment.status] ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href="/seller" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">← အော်ဒါများ</Link>
        <h1 className="text-2xl text-deep">အော်ဒါ #{order.number}</h1>
        <p className="text-sm text-soft">{formatDateTime(order.createdAt)} · {shipmentLabel[shipment.status]} · {paymentLabel[order.paymentStatus]}</p>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {order.paymentMethod === "transfer" && shipment.status !== "cancelled" ? (
            <section className="card">
              <h2 className="font-bold">ငွေလွှဲ စစ်ဆေးရန်</h2>
              <p className="mt-1 text-sm">လွှဲရမည့် ပမာဏ — <strong>{formatMmk(order.totalMmk)}</strong> · ရည်ညွှန်း #{order.number}</p>
              {receipt ? (
                <>
                  <a href={`/seller/orders/${id}/receipt`} target="_blank" className="mt-3 block">
                    {/* eslint-disable-next-line @next/next/no-img-element -- private, authenticated image */}
                    <img src={`/seller/orders/${id}/receipt`} alt={`အော်ဒါ #${order.number} ၏ ငွေလွှဲ စလစ်`} className="max-h-96 w-full rounded-xl border border-line object-contain" />
                  </a>
                  {receipt.duplicateOfOrderNumber ? (
                    <p role="alert" className="mt-3 rounded-xl bg-danger-wash p-3 text-sm font-semibold text-danger">
                      သတိပြုရန် — ဤပုံကို အော်ဒါ #{receipt.duplicateOfOrderNumber} တွင် သုံးခဲ့ပြီးသား ဖြစ်သည်။
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="mt-2 text-sm text-soft">ဖောက်သည်က စလစ် မတင်ရသေးပါ။</p>
              )}
              {inReview ? (
                <>
                  <p className="mt-3 rounded-xl bg-cream p-3 text-sm text-amber">ပုံသည် ငွေဝင်ကြောင်း သက်သေ မဟုတ်ပါ။ သင့် Wallet သို့မဟုတ် ဘဏ်စာရင်းကို ကြည့်ပြီးမှ အတည်ပြုပါ။</p>
                  <ActionForm action={approvePayment} className="mt-3">
                    <input type="hidden" name="orderId" value={id} />
                    <Submit className="btn-primary w-full">ငွေဝင်ပြီး — အတည်ပြုမည်</Submit>
                  </ActionForm>
                  <ActionForm action={rejectPayment} className="mt-3 flex flex-col gap-2">
                    <input type="hidden" name="orderId" value={id} />
                    <Field label="ငြင်းပယ်ရသည့် အကြောင်းရင်း (ဖောက်သည် မြင်ရမည်)"><input name="reason" required maxLength={300} className="field" /></Field>
                    <Submit className="btn-danger">စလစ် ငြင်းပယ်မည်</Submit>
                  </ActionForm>
                </>
              ) : null}
            </section>
          ) : null}

          <section className="card">
            <h2 className="font-bold">ပို့ဆောင်မှု</h2>
            <p className="mt-1 text-sm text-soft">
              {shipmentLabel[shipment.status]}
              {shipment.carrier ? ` · ${shipment.carrier}` : ""}
              {shipment.etaLow ? ` · ${formatDate(shipment.etaLow)}${shipment.etaHigh ? ` – ${formatDate(shipment.etaHigh)}` : ""}` : ""}
            </p>

            {shipment.status === "packed" ? (
              <ActionForm action={sendEvent} className="mt-3 flex flex-col gap-2">
                <input type="hidden" name="orderId" value={id} />
                <input type="hidden" name="eventId" value={randomUUID()} />
                <input type="hidden" name="type" value="HANDED_TO_CARRIER" />
                <Field label="ပို့ဆောင်သူ" hint="ဥပမာ — ကိုယ်ပိုင် Rider၊ ကားဂိတ် သို့မဟုတ် ကုမ္ပဏီအမည်"><input name="carrier" required maxLength={100} className="field" /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="အစောဆုံး ရောက်ရက်"><input name="etaLow" type="date" className="field" /></Field>
                  <Field label="အနောက်ဆုံး ရောက်ရက်"><input name="etaHigh" type="date" className="field" /></Field>
                </div>
                <Submit>ပို့ဆောင်ရေးသို့ ပေးပြီး</Submit>
              </ActionForm>
            ) : null}

            {steps.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {steps.map((step) => <StepForm key={step.type} orderId={id} type={step.type} label={step.label} />)}
              </div>
            ) : null}

            {CANCELLABLE.has(shipment.status) ? (
              <div className="mt-3 border-t border-line pt-3">
                <StepForm orderId={id} type="CANCELLED" label="အော်ဒါ ပယ်ဖျက်မည်" danger />
              </div>
            ) : null}

            <ol className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
              {shipment.events.map((event: { type: string; occurredAt: string }, i: number) => (
                <li key={i} className="flex flex-wrap justify-between gap-x-3">
                  <span>{eventLabel[event.type] ?? event.type}</span>
                  <span className="text-soft">{formatDateTime(event.occurredAt)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="card text-[0.9375rem]">
            <h2 className="font-bold">ဖောက်သည်</h2>
            <p className="mt-1 break-words">{order.customerName}</p>
            <a href={`tel:${order.customerPhone}`} className="inline-flex min-h-11 items-center font-semibold text-teal underline">{order.customerPhone}</a>
            <p className="break-words whitespace-pre-line text-soft">{order.region} · {order.township}{"\n"}{order.address}</p>
          </section>

          <section className="card text-[0.9375rem]">
            <h2 className="font-bold">ပစ္စည်းများ</h2>
            <ul className="mt-2 space-y-1">
              {order.items.map((item: { name: string; qty: number; unitPriceMmk: number }) => (
                <li key={item.name} className="flex justify-between gap-3">
                  <span className="min-w-0 break-words">{item.name} × {item.qty}</span>
                  <span className="shrink-0">{(item.unitPriceMmk * item.qty).toLocaleString("en-US")}</span>
                </li>
              ))}
              <li className="flex justify-between gap-3 text-soft"><span>ပို့ခ</span><span>{order.deliveryFeeMmk.toLocaleString("en-US")}</span></li>
            </ul>
            <p className="mt-2 flex justify-between border-t border-line pt-2 font-bold"><span>စုစုပေါင်း</span><span>{formatMmk(order.totalMmk)}</span></p>
          </section>

          <section className="card flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>ဖောက်သည်အတွက် ခြေရာခံလင့်ခ်</span>
            <CopyButton text={`/t/${shipment.trackingToken}`} label="လင့်ခ် ကော်ပီ" />
          </section>
        </div>
      </div>
    </div>
  );
}
