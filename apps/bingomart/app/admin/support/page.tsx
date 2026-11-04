import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel } from "@/components/kit";
import { supportTickets } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "စတင်ခြင်းနှင့် ပံ့ပိုးမှု" };

export default function SupportPage() {
  return (
    <>
      <PageHead title="ဆိုင်များ စတင်ခြင်းနှင့် ပံ့ပိုးမှု" />
      <Panel flush>
        <DataTable
          caption="ပံ့ပိုးမှု တောင်းဆိုချက်များ"
          rows={supportTickets}
          cols={[
            { key: "shop", label: "ဆိုင်", className: "font-semibold" },
            { key: "topic", label: "အကြောင်းအရာ" },
            { key: "status", label: "", render: () => <Chip tone="wait">ဖွင့်ထားသည်</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
