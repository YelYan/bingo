import type { Metadata } from "next";
import { Avatar, Chip, DataTable, PageHead, Panel } from "@/components/kit";
import { MockButton, Switch } from "@/components/kit-client";
import { staffRows } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ဝန်ထမ်းနှင့် အခွင့်အရေး" };

export default function StaffPage() {
  return (
    <>
      <PageHead title="ဝန်ထမ်းနှင့် အခွင့်အရေး" actions={<MockButton done="ဖိတ်ပြီး">+ ဝန်ထမ်း ဖိတ်ရန်</MockButton>} />
      <Panel flush>
        <DataTable
          caption="ဝန်ထမ်းများ"
          rows={staffRows}
          cols={[
            { key: "name", label: "အမည်", render: (r) => <span className="flex items-center gap-2.5"><Avatar name={r.name} size="h-8 w-8" />{r.name}</span> },
            { key: "role", label: "ရာထူး", className: "font-semibold" },
            { key: "perms", label: "ခွင့်ပြုချက်", className: "text-soft" },
            { key: "active", label: "အခြေအနေ", render: (r) => <Chip tone={r.active ? "ok" : "mute"}>{r.active ? "တက်ရောက်ဆဲ" : "ခွင့်ယူထား"}</Chip> },
          ]}
        />
      </Panel>
      <Panel title="ခွင့်ပြုချက် အစု">
        <ul className="flex flex-col gap-2.5">
          {["POS ဖွင့်ခွင့်", "ပစ္စည်း ဈေးနှုန်း ပြင်ခွင့်", "အစီရင်ခံစာ ကြည့်ခွင့်", "ငွေထုတ် / ပြန်အမ်း အတည်ပြုခွင့်"].map((p) => (
            <Switch key={p} label={p} defaultChecked={p !== "ငွေထုတ် / ပြန်အမ်း အတည်ပြုခွင့်"} />
          ))}
        </ul>
      </Panel>
    </>
  );
}
