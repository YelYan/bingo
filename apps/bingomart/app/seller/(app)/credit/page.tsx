import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { creditLedger } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "အကြွေးစာရင်း" };

export default function CreditPage() {
  return (
    <>
      <PageHead title="အကြွေးစာရင်း (ဖောက်သည် ပေးရန် ကျန်ငွေ)" actions={<MockButton done="မှတ်ပြီး">+ အကြွေး မှတ်ရန်</MockButton>} />
      <Panel flush>
        <DataTable
          caption="အကြွေးစာရင်း"
          rows={creditLedger}
          cols={[
            { key: "customer", label: "ဖောက်သည်", className: "font-semibold" },
            { key: "owes", label: "ကျန်ငွေ", className: "font-bold whitespace-nowrap", render: (c) => money(c.owes) },
            { key: "since", label: "ကြာချိန်", className: "text-soft" },
            { key: "status", label: "", render: (c) => <Chip tone={c.status === "overdue" ? "bad" : "wait"}>{c.status === "overdue" ? "နောက်ကျပြီး" : "ပေးဆပ်ဆဲ"}</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
