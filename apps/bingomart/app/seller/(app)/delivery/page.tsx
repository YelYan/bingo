import type { Metadata } from "next";
import { DataTable, Icon, Notice, PageHead, Panel, Split, money } from "@/components/kit";
import { MockButton, Switch } from "@/components/kit-client";
import { couriers, deliveryZones } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ပို့ဆောင်ရေး သတ်မှတ်ချက်" };

export default function DeliveryPage() {
  return (
    <>
      <PageHead title="ပို့ဆောင်ရေး သတ်မှတ်ချက်" />
      <Split
        main={
          <>
            <Panel title="မြို့နယ်အလိုက် ပို့ခ" flush action={<MockButton done="ထည့်ပြီး" className="btn-ghost text-sm">+ မြို့နယ် ထည့်</MockButton>}>
              <DataTable
                caption="မြို့နယ်အလိုက် ပို့ခ"
                rows={deliveryZones}
                cols={[
                  { key: "name", label: "မြို့နယ် / ဇုန်", className: "font-semibold" },
                  { key: "fee", label: "ပို့ခ (ကျပ်)", render: (z) => money(z.fee) },
                  { key: "eta", label: "ETA", className: "text-soft" },
                  { key: "edit", label: "", render: () => <span className="text-sm font-semibold text-teal">ပြင်</span> },
                ]}
              />
            </Panel>
            <Panel title="အခမဲ့ ပို့ဆောင်ရေး">
              <Switch label="50,000 ကျပ် အထက် အခမဲ့" defaultChecked />
            </Panel>
          </>
        }
        side={
          <>
            <Panel title="ပို့ဆောင်ရေး ကုမ္ပဏီများ">
              <div className="flex flex-col gap-2.5">
                {couriers.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-xl border border-[#eee9dd] p-3">
                    <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-[0.5625rem] bg-mint text-teal"><Icon d="M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 100-4M17 19a2 2 0 100-4" className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{c.name}</span><span className="block text-[0.8125rem] text-soft">{c.note}</span></span>
                    <Switch label={`${c.name} ချိတ်ဆက်ရန်`} defaultChecked={c.on} />
                  </div>
                ))}
              </div>
            </Panel>
            <Notice tone="ship">AI က ETA တွက်ရာတွင် မြို့နယ်၊ ကုမ္ပဏီ၊ cut-off အချိန်နှင့် လွန်ခဲ့သော 30 ရက် ပျမ်းမျှ ပို့ဆောင်ချိန်ကို သုံးသည်။</Notice>
          </>
        }
      />
    </>
  );
}
