import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, Split } from "@/components/kit";
import { MockButton, Segmented } from "@/components/kit-client";
import { broadcastSegments, broadcasts } from "@/lib/mock/more";

export const metadata: Metadata = { title: "Broadcast" };

export default function BroadcastPage() {
  return (
    <>
      <PageHead title="Broadcast ပို့ရန်" />
      <Split
        main={
          <Panel title="မက်ဆေ့ချ် ရေးရန်">
            <div className="flex flex-col gap-3.5">
              <label className="block text-[0.8125rem] font-semibold">ချန်နယ်
                <Segmented label="ချန်နယ်" options={["Messenger", "Viber", "Telegram", "Web chat"]} />
              </label>
              <label className="block text-[0.8125rem] font-semibold">ပရိသတ်
                <Segmented label="ပရိသတ်" options={broadcastSegments.map((s) => s.label)} />
              </label>
              <label className="block text-[0.8125rem] font-semibold">မက်ဆေ့ချ်
                <textarea rows={4} defaultValue="ဆောင်းဦး promo! ယနေ့မှ 3 ရက် အတွင်း ဝယ်ယူပါက 10% လျှော့ပေးပါသည်။" className="field mt-1 font-normal" />
              </label>
              <MockButton done="ပို့ပြီး">ပို့မည်</MockButton>
            </div>
          </Panel>
        }
        side={
          <Panel title="ယခင် ပို့ပြီးသား">
            <DataTable
              caption="ယခင် broadcast များ"
              rows={broadcasts}
              cols={[
                { key: "name", label: "အမည်", className: "font-semibold" },
                { key: "audience", label: "ပရိသတ်", className: "text-soft" },
                { key: "sent", label: "ပို့ပြီး" },
                { key: "status", label: "", render: (b) => <Chip tone={b.status === "live" ? "ok" : "mute"}>{b.status === "live" ? "လက်ရှိ" : "ပြီး"}</Chip> },
              ]}
            />
          </Panel>
        }
      />
    </>
  );
}
