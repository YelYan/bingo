import type { Metadata } from "next";
import { Chip, Notice, PageHead, Panel } from "@/components/kit";
import { noopAction } from "@/lib/mock/noop-action";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { owner } from "@/lib/mock/seller-core";

export const metadata: Metadata = { title: "Domain" };

export default function DomainPage() {
  return (
    <>
      <PageHead title="Domain" />
      <Panel title="လက်ရှိ လိပ်စာ">
        <p className="flex flex-wrap items-center gap-2.5 text-lg font-bold break-all">{owner.domain}<Chip tone="ok">ချိတ်ပြီး · SSL ✓</Chip></p>
      </Panel>
      <Panel title="သင့် domain ကိုယ်ပိုင် သုံးမည်">
        <ActionForm action={noopAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1"><Field label="Domain name"><input placeholder="www.myshop.com" className="field" /></Field></div>
          <Submit className="btn-primary">ချိတ်ဆက်မည်</Submit>
        </ActionForm>
        <Notice tone="ship">DNS CNAME တစ်ကြောင်း ထည့်ရန် လိုအပ်မည်။ ချိတ်ဆက်ပြီးနောက် 24 နာရီအထိ ကြာနိုင်သည်။</Notice>
      </Panel>
    </>
  );
}
