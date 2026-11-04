import type { Metadata } from "next";
import { Notice, PageHead, Panel, Split } from "@/components/kit";
import { Pills, Switch } from "@/components/kit-client";
import { aiChannels, aiFaqs, aiPerms } from "@/lib/mock/more";

export const metadata: Metadata = { title: "AI ဆက်တင်" };

export default function AiSettingsPage() {
  return (
    <>
      <PageHead title="AI စကားပြော အသင့်ပြင်ရန်" />
      <Split
        main={
          <>
            <Panel title="AI က ကိုယ်တိုင် လုပ်နိုင်သည့် အရာများ">
              <p className="mb-3 text-[0.8125rem] text-soft">သင့်ခွင့်ပြုချက်ဖြင့်သာ လုပ်ဆောင်မည်။ ကျန်တာ သင့်ထံ လွှဲပေးမည်။</p>
              <div className="flex flex-col divide-y divide-[#f3efe4]">
                {aiPerms.map((p) => (
                  <div key={p.label} className="py-3 first:pt-0 last:pb-0">
                    <Switch label={p.label} hint={p.sub} defaultChecked={p.on} />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Notice>ငွေ အတည်ပြုခြင်းကို <b>50,000 ကျပ်အောက်</b> သာ AI လုပ်မည်။ အထက်ကို သင်ကိုယ်တိုင် စစ်ရန်။</Notice>
              </div>
            </Panel>

            <Panel title="မေးလေ့ရှိသော မေးခွန်းများ (FAQ)">
              <div className="flex flex-col gap-2.5">
                {aiFaqs.map((f) => (
                  <div key={f.q} className="rounded-xl border border-[#eee9dd] p-3.5">
                    <p className="font-semibold">{f.q}</p>
                    <p className="mt-0.5 text-[0.8125rem] text-soft">{f.a}</p>
                  </div>
                ))}
                <button type="button" className="btn btn-ghost self-start !border-dashed">+ မေးခွန်း ထည့်ရန်</button>
              </div>
            </Panel>
          </>
        }
        side={
          <>
            <Panel title="လေသံ">
              <Pills label="AI လေသံ" options={["ယဉ်ကျေး သိမ်မွေ့", "ရင်းနှီး", "တိုတို"]} />
              <p className="mt-2.5 text-[0.8125rem] text-soft">ဘာသာစကား — မြန်မာ + အင်္ဂလိပ် (ဖောက်သည်အလိုက် အလိုအလျောက်)</p>
            </Panel>
            <Panel title="ချန်နယ်အလိုက် AI">
              <div className="flex flex-col gap-2.5">
                {aiChannels.map((c) => <Switch key={c.label} label={c.label} defaultChecked={c.on} />)}
              </div>
              <p className="mt-2.5 text-[0.8125rem] text-soft">လူ တာဝန်ယူချိန် — နံနက် 9 မှ ည 9</p>
            </Panel>
            <Notice tone="ship">AI က အဖြေမသေချာလျှင် သို့မဟုတ် ဒေါသထွက်သော ဖောက်သည်ကို တွေ့လျှင် သင့်ထံ ချက်ချင်း လွှဲပေးမည်။</Notice>
          </>
        }
      />
    </>
  );
}
