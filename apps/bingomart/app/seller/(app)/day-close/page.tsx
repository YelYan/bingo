import type { Metadata } from "next";
import { KV, Notice, PageHead, Panel } from "@/components/kit";
import { MockButton } from "@/components/kit-client";

export const metadata: Metadata = { title: "နေ့ပိတ်" };

export default function DayClosePage() {
  return (
    <>
      <PageHead title="နေ့ပိတ် — 31 အောက်တိုဘာ 2026" />
      <Panel title="ယနေ့ အနှစ်ချုပ်">
        <KV
          items={[
            { k: "POS ရောင်းရငွေ", v: "809,000 ကျပ်" },
            { k: "အွန်လိုင်း ရောင်းရငွေ", v: "475,500 ကျပ်" },
            { k: "ငွေသား ရလဒ်", v: "3.6M ကျပ်" },
            { k: "COD ကောက်ရန် ကျန်", v: "128,500 ကျပ်" },
          ]}
        />
      </Panel>
      <Panel title="ငွေသား ရေတွက်ရန်">
        <label className="block text-[0.8125rem] text-soft">ငွေသားအိတ်ထဲ တကယ်ရှိသည့် ပမာဏ<input type="number" placeholder="3,600,000" className="field mt-1" /></label>
        <MockButton done="ပိတ်ပြီး — ရှင်းတမ်း ပုံနှိပ်နိုင်သည်" className="btn-primary mt-3.5">နေ့ပိတ်မည်</MockButton>
      </Panel>
      <Notice>နေ့ပိတ်ပြီးနောက် ယနေ့ စာရင်းများကို ပြင်ဆင်၍ မရတော့ပါ။</Notice>
    </>
  );
}
