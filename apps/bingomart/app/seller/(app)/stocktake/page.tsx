import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel } from "@/components/kit";
import { MockButton, Segmented } from "@/components/kit-client";
import { branches, stocktakeRows } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "စာရင်းစစ် / ဆိုင်ခွဲ ရွှေ့" };

export default function StocktakePage() {
  return (
    <>
      <PageHead title="စာရင်းစစ် / ဆိုင်ခွဲ ရွှေ့" actions={<Segmented label="ဆိုင်ခွဲ" options={branches} />} />
      <Panel title="လက်ရှိ စာရင်းစစ်ချက်" flush action={<MockButton done="အတည်ပြုပြီး" className="btn-primary text-sm">စနစ်ထဲ သိမ်းမည်</MockButton>}>
        <DataTable
          caption="စာရင်းစစ်ချက်"
          rows={stocktakeRows}
          cols={[
            { key: "name", label: "ပစ္စည်း", className: "font-semibold" },
            { key: "system", label: "စနစ်ပေါ်" },
            { key: "counted", label: "ရေတွက်ရသည်" },
            { key: "diff", label: "ကွာခြား", render: (r) => <Chip tone={r.diff === 0 ? "ok" : r.diff < 0 ? "bad" : "wait"}>{r.diff > 0 ? `+${r.diff}` : r.diff}</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
