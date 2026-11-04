import type { Metadata } from "next";
import { Chip, DataTable, Notice, PageHead, Panel } from "@/components/kit";
import { prescriptionQueue } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ဆေးညွှန်း စစ်ဆေးရန်" };

export default function PrescriptionsPage() {
  return (
    <>
      <PageHead title="ဆေးညွှန်း စစ်ဆေးရန်" />
      <Panel flush>
        <DataTable
          caption="ဆေးညွှန်းများ"
          rows={prescriptionQueue}
          cols={[
            { key: "id", label: "အော်ဒါ", className: "font-semibold" },
            { key: "customer", label: "ဖောက်သည်" },
            { key: "items", label: "ဆေးဝါးများ", className: "text-soft" },
            { key: "status", label: "", render: (r) => <Chip tone={r.status.includes("ပြီး") ? "ok" : "wait"}>{r.status}</Chip> },
          ]}
        />
      </Panel>
      <Notice>ကန့်သတ်ဆေးဝါးများသည် ဆေးဝါးပညာရှင် (pharmacist) စစ်ဆေးပြီးမှသာ ပို့ဆောင်နိုင်သည်။</Notice>
    </>
  );
}
