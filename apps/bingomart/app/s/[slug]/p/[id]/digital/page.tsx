import type { Metadata } from "next";
import { MobileScreen } from "@/components/mobile";
import { MockButton } from "@/components/kit-client";

export const metadata: Metadata = { title: "ဒစ်ဂျစ်တယ် ပစ္စည်း" };

export default async function DigitalDeliveryPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug } = await params;
  return (
    <MobileScreen title="ဒစ်ဂျစ်တယ် ပစ္စည်း ရယူရန်" back={`/s/${slug}`}>
      <section className="card flex flex-col items-center gap-2.5 text-center">
        <p aria-hidden="true" className="text-4xl">📦</p>
        <p className="font-semibold">ငွေပေးချေမှု အတည်ပြုပြီးပါပြီ</p>
        <p className="text-[0.8125rem] text-soft">ဒေါင်းလုဒ် လင့်ခ် သို့မဟုတ် ကုဒ်ကို အောက်တွင် ရယူနိုင်ပါသည်။</p>
      </section>
      <section className="card">
        <p className="mb-1 text-[0.8125rem] text-soft">သင့် ကုဒ်</p>
        <p className="font-display text-2xl font-bold tracking-wider">BM-7X2K-9QF1</p>
        <MockButton done="ကော်ပီ ကူးပြီး" className="btn-ghost mt-2.5 w-full">ကုဒ် ကော်ပီကူးမည်</MockButton>
      </section>
      <MockButton done="ဒေါင်းလုဒ် စတင်ပြီး" className="btn-primary w-full">ဒေါင်းလုဒ် ရယူမည်</MockButton>
    </MobileScreen>
  );
}
