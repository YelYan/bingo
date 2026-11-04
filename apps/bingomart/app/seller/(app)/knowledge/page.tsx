import type { Metadata } from "next";
import { Icon, Notice, PageHead, Panel } from "@/components/kit";
import { noopAction } from "@/lib/mock/noop-action";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { knowledgeDocs } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "AI အသိပညာ" };

export default function KnowledgePage() {
  return (
    <>
      <PageHead title="AI အသိပညာ + test bot" />
      <Panel title="စာတမ်းများ" flush>
        <ul className="divide-y divide-[#f3efe4]">
          {knowledgeDocs.map((d) => (
            <li key={d.title} className="flex items-center gap-3 px-5 py-3.5">
              <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-[0.625rem] bg-mint text-teal"><Icon d="M4 5h16v10H9l-5 4V5z" /></span>
              <span className="min-w-0 flex-1"><span className="block font-semibold">{d.title}</span><span className="block text-[0.8125rem] text-soft">{d.updated} ပြင်ဆင်ခဲ့သည်</span></span>
              <span className="text-sm font-semibold text-teal">ပြင်ရန်</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="AI ကို စမ်းမေးကြည့်ပါ">
        <ActionForm action={noopAction} className="flex gap-2.5">
          <div className="flex-1"><Field label="မေးခွန်း"><input placeholder="ပို့ခ ဘယ်လောက်လဲ?" className="field" /></Field></div>
          <Submit>မေးမည်</Submit>
        </ActionForm>
        <Notice tone="ship">ဤစာမျက်နှာမှ အဖြေများသည် ဖောက်သည်ထံ မပို့ရသေးပါ — စမ်းသပ်ရန်သာ ဖြစ်သည်။</Notice>
      </Panel>
    </>
  );
}
