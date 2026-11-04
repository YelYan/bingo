import type { Metadata } from "next";
import { Icon, PageHead, Panel, Split, type Tone } from "@/components/kit";
import { MockButton, Switch } from "@/components/kit-client";
import { promoStatus, promos, segments } from "@/lib/mock/more";

export const metadata: Metadata = { title: "မားကက်တင်း" };
const CHIP = { live: "ok", draft: "wait", end: "mute" } as const;

export default function MarketingPage() {
  return (
    <>
      <PageHead title="မားကက်တင်း" actions={<MockButton done="ကမ်ပိန်း ဖန်တီးပြီး">+ ကမ်ပိန်း အသစ်</MockButton>} />
      <Split
        main={
          <Panel title="ကူပွန် နှင့် ပရိုမိုးရှင်း" flush>
            <ul className="divide-y divide-[#f3efe4]">
              {promos.map((p) => {
                const [label, tone] = promoStatus[p.status as keyof typeof promoStatus];
                return (
                  <li key={p.name} className="flex items-center gap-3.5 px-5 py-3.5">
                    <span aria-hidden="true" className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-mint text-[#0a5547]"><Icon d="M3 12V4h8l10 10-8 8z" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-[0.8125rem] text-soft">{p.detail}</span>
                    </span>
                    <span className="text-right">
                      <span className="block font-bold">{p.used}</span>
                      <span className="block text-[0.8125rem] text-soft">သုံးပြီး</span>
                    </span>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ${tone === "ok" ? "bg-mint text-[#0a5547]" : tone === "wait" ? "bg-cream text-amber" : "bg-[#ece8de] text-[#4a524d]"}`}>{label}</span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        }
        side={
          <>
            <Panel title="Broadcast ပို့ရန်">
              <p className="mb-3 text-[0.8125rem] text-soft">သဘောတူထားသော ဖောက်သည်များထံသာ၊ ချန်နယ်စည်းမျဉ်းအတွင်း ပို့မည်။</p>
              <ul className="flex flex-col gap-2 text-sm">
                {segments.map((s) => (
                  <li key={s.label} className="flex items-center justify-between rounded-xl border border-[#eee9dd] px-3.5 py-2.5">
                    <span>{s.label}</span><span className="text-soft">{s.count} ဦး</span>
                  </li>
                ))}
              </ul>
              <a href="/seller/broadcast" className="btn btn-primary mt-3 w-full">ချန်နယ် ရွေး၍ ပို့မည်</a>
            </Panel>
            <Panel title="ခြင်းစွန့်ခွာ ပြန်ခေါ်">
              <Switch label="အလိုအလျောက်" defaultChecked hint="ငွေမရှင်းသေးသော ခြင်းကို 2 နာရီကြာ AI က သတိပေးမည်။" />
            </Panel>
          </>
        }
      />
    </>
  );
}
