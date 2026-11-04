import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel } from "@/components/kit";
import { moderationQueue } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "AI အရည်အသွေး / စောင့်ကြည့်" };

export default function ModerationPage() {
  return (
    <>
      <PageHead title="AI အရည်အသွေး / စောင့်ကြည့်" />
      <Panel flush>
        <DataTable
          caption="AI ပြဿနာများ"
          rows={moderationQueue}
          cols={[
            { key: "shop", label: "ဆိုင်", className: "font-semibold" },
            { key: "issue", label: "ပြဿနာ" },
            { key: "severity", label: "", render: (m) => <Chip tone={m.severity === "high" ? "bad" : "wait"}>{m.severity === "high" ? "မြင့်" : "နိမ့်"}</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
