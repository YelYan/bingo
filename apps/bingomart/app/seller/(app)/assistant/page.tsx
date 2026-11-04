import type { Metadata } from "next";
import { PageHead, Panel } from "@/components/kit";
import { noopAction } from "@/lib/mock/noop-action";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { assistantSuggestions } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "AI လက်ထောက်" };

export default function AssistantPage() {
  return (
    <>
      <PageHead title="AI ပိုင်ရှင် လက်ထောက်" sub="သင့်ဆိုင်အကြောင်း မေးနိုင်သည်" />
      <Panel>
        <p className="rounded-2xl bg-ground px-4 py-3 text-[0.9375rem]">မင်္ဂလာပါ 🙏 သင့်ဆိုင်အကြောင်း ဘာသိလိုပါသလဲ? အရောင်း၊ ကုန်လက်ကျန်၊ ဖောက်သည် အချက်အလက်တွေ မေးနိုင်ပါတယ်။</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {assistantSuggestions.map((s) => <button key={s} type="button" className="min-h-11 rounded-full border border-teal bg-card px-3.5 text-sm font-semibold text-teal">{s}</button>)}
        </div>
        <ActionForm action={noopAction} className="mt-4 flex gap-2.5">
          <div className="flex-1"><Field label="မေးခွန်း"><input placeholder="စာရိုက်ပါ…" className="field" /></Field></div>
          <Submit>မေးမည်</Submit>
        </ActionForm>
      </Panel>
    </>
  );
}
