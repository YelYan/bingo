import type { Metadata } from "next";
import { Notice, PageHead, Panel } from "@/components/kit";
import { MockButton } from "@/components/kit-client";

export const metadata: Metadata = { title: "Excel တင်ရန်" };

export default function ImportPage() {
  return (
    <>
      <PageHead title="Excel မှ ပစ္စည်း တင်ရန်" />
      <Panel title="ဖိုင် တင်ရန်">
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#bfb8a6] bg-ground text-center text-sm text-soft">
          <input type="file" accept=".xlsx,.csv" className="sr-only" />
          <span>.xlsx သို့မဟုတ် .csv ဖိုင်ကို ဆွဲချထည့်ပါ</span>
          <MockButton done="ရွေးပြီး" className="btn-ghost">ဖိုင် ရွေးရန်</MockButton>
        </label>
      </Panel>
      <Panel title="ပုံစံ ဒေါင်းလုဒ်ရန်">
        <p className="text-sm text-soft">ကော်လံများ — အမည်, ဈေးနှုန်း, အရင်းဈေး, လက်ကျန်, အမျိုးအစား</p>
        <MockButton done="ဒေါင်းလုဒ်ပြီး" className="btn-ghost mt-2.5">နမူနာ Excel ဒေါင်းလုဒ်ရန်</MockButton>
      </Panel>
      <Notice>ဆိုင်ရှင် သို့မဟုတ် အဖွဲ့က စီစဉ်ပေးနိုင်သည် (managed setup)။ ဆက်သွယ်ရန် လင့်ခ်— [TBD]</Notice>
    </>
  );
}
