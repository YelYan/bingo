import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { FormState } from "@/components/action-form";
import { CopyButton } from "@/components/copy-button";
import { api } from "@/lib/api";
import { errorText, eventLabel, formatDate, formatDateTime, formatMmk, paymentLabel, shipmentLabel } from "@/lib/copy";
import { ReceiptForm } from "./receipt-form";

export const metadata: Metadata = { title: "အော်ဒါ ခြေရာခံ", robots: { index: false, follow: false } };

const JOURNEY = ["CREATED", "PACKED", "HANDED_TO_CARRIER", "OUT_FOR_DELIVERY", "DELIVERED"];

export default async function TrackPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await api(`/track/${encodeURIComponent(token)}`);
  if (!result.ok) {
    if (result.status === 404) notFound();
    throw new Error(result.code);
  }
  const order = result.data;
  const cancelled = order.status === "cancelled";
  const happened = new Map<string, string>(order.events.map((e: { type: string; occurredAt: string }) => [e.type, e.occurredAt]));
  const needsSlip = !cancelled && (order.paymentStatus === "awaiting_slip" || order.paymentStatus === "rejected");
  const showEstimate = order.etaLow && order.status !== "delivered";

  async function upload(_: FormState, form: FormData): Promise<FormState> {
    "use server";
    const outgoing = new FormData();
    outgoing.append("receipt", form.get("receipt") as File);
    const sent = await api(`/track/${encodeURIComponent(token)}/receipt`, { form: outgoing });
    if (!sent.ok) return { error: errorText(sent.code) };
    revalidatePath(`/t/${token}`);
    return null;
  }

  return (
    <div className="mx-auto min-h-svh max-w-md">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-3">
        <div className="min-w-0">
          <h1 className="text-base">အော်ဒါ ခြေရာခံ</h1>
          <p className="text-[0.8125rem] break-words text-soft">#{order.number} · {order.shopName}</p>
        </div>
        <CopyButton label="လင့်ခ် ကော်ပီ" />
      </header>

      <main className="flex flex-col gap-4 p-4">
        {needsSlip ? (
          <>
            {order.paymentStatus === "rejected" ? (
              <p role="alert" className="rounded-xl bg-danger-wash p-3 text-sm font-semibold text-danger">
                စလစ်ကို ပြန်ပို့ပေးပါ{order.paymentRejectReason ? ` — ${order.paymentRejectReason}` : ""}
              </p>
            ) : null}
            <section className="rounded-2xl bg-teal p-4 text-white">
              <p className="text-[0.8125rem]">လွှဲရမည့် ပမာဏ (အတိအကျ)</p>
              <p className="font-display text-3xl font-bold">{formatMmk(order.totalMmk)}</p>
              <p className="text-[0.8125rem]">ရည်ညွှန်း — #{order.number} ကို မှတ်စုထဲ ရေးပါ</p>
            </section>
            {order.paymentAccounts.length ? (
              <ul className="flex flex-col gap-2">
                {order.paymentAccounts.map((account: { provider: string; name: string; number: string }) => (
                  <li key={account.provider + account.number} className="card flex items-center justify-between gap-3">
                    <div className="min-w-0 text-sm">
                      <p className="font-semibold break-words">{account.provider} · {account.name}</p>
                      <p className="break-all text-soft">{account.number}</p>
                    </div>
                    <CopyButton text={account.number} label="နံပါတ် ကော်ပီ" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card text-sm text-soft">ငွေလွှဲအကောင့်ကို ဆိုင်ရှင်ထံ မေးမြန်းပါ။</p>
            )}
            <ReceiptForm action={upload} />
          </>
        ) : null}

        {cancelled ? (
          <p className="rounded-2xl bg-danger-wash p-4 font-semibold text-danger">ဤအော်ဒါကို ပယ်ဖျက်ပြီး ဖြစ်သည်။</p>
        ) : (
          <section className="rounded-2xl bg-deep p-4 text-white">
            <p className="text-[0.8125rem] text-mist">လက်ရှိ အခြေအနေ</p>
            <p className="font-display text-2xl font-bold">{shipmentLabel[order.status]}</p>
            {showEstimate ? (
              <p className="mt-1 text-sm">
                ခန့်မှန်း ပို့ဆောင်ချိန် — {formatDate(order.etaLow)}
                {order.etaHigh && order.etaHigh !== order.etaLow ? ` – ${formatDate(order.etaHigh)}` : ""}
              </p>
            ) : null}
            {order.carrier ? <p className="text-[0.8125rem] break-words text-mist">{order.carrier}</p> : null}
          </section>
        )}

        <section className="card">
          <ol>
            {JOURNEY.map((type, i) => {
              const at = happened.get(type);
              return (
                <li key={type} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span aria-hidden="true" className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${at ? "bg-teal text-white" : "bg-line text-soft"}`}>{at ? "✓" : ""}</span>
                    {i < JOURNEY.length - 1 ? <span aria-hidden="true" className={`min-h-6 w-0.5 flex-1 ${at ? "bg-teal" : "bg-line"}`} /> : null}
                  </div>
                  <div className="pb-3">
                    <p className={`text-[0.9375rem] font-semibold ${at ? "" : "text-soft"}`}>
                      {eventLabel[type]}<span className="sr-only">{at ? "" : " (မရောက်သေးပါ)"}</span>
                    </p>
                    {at ? <p className="text-[0.8125rem] text-soft">{formatDateTime(at)}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="card text-[0.9375rem]">
          <h2 className="font-bold">အော်ဒါ အသေးစိတ်</h2>
          <ul className="mt-2 space-y-1">
            {order.items.map((item: { name: string; qty: number; unitPriceMmk: number }) => (
              <li key={item.name} className="flex justify-between gap-3">
                <span className="min-w-0 break-words">{item.name} × {item.qty}</span>
                <span className="shrink-0">{(item.unitPriceMmk * item.qty).toLocaleString("en-US")}</span>
              </li>
            ))}
            <li className="flex justify-between gap-3 text-soft"><span>ပို့ခ</span><span>{order.deliveryFeeMmk.toLocaleString("en-US")}</span></li>
          </ul>
          <p className="mt-2 flex justify-between gap-3 border-t border-line pt-2 font-bold"><span>စုစုပေါင်း</span><span>{formatMmk(order.totalMmk)}</span></p>
          <p className="mt-1 text-sm text-soft">{paymentLabel[order.paymentStatus]}</p>
        </section>

        {showEstimate ? (
          <p className="rounded-xl bg-cream p-3 text-center text-[0.8125rem] text-amber">ဤအချိန်သည် ခန့်မှန်းချက်သာ ဖြစ်ပြီး အာမခံချက် မဟုတ်ပါ။</p>
        ) : null}
        <Link href={`/s/${order.shopSlug}`} className="btn btn-ghost">ဆိုင်သို့ ပြန်သွားမည်</Link>
      </main>
    </div>
  );
}
