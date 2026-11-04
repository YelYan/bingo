import type { Metadata } from "next";
import { DataTable, PageHead, Panel } from "@/components/kit";
import { furnitureOrders } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ပရိဘောဂ ပို့ဆောင်/တပ်ဆင်" };

export default function FurniturePage() {
  return (
    <>
      <PageHead title="ကြီးမား ပစ္စည်း ပို့ဆောင်/တပ်ဆင်" />
      <Panel flush>
        <DataTable
          caption="ပရိဘောဂ အော်ဒါများ"
          rows={furnitureOrders}
          cols={[
            { key: "item", label: "ပစ္စည်း", render: (r) => <span><span className="block font-semibold">{r.item}</span><span className="block text-[0.8125rem] text-soft">{r.customer}</span></span> },
            { key: "stage", label: "အဆင့်", className: "text-soft" },
            { key: "crew", label: "အဖွဲ့ဝင်", render: (r) => `${r.crew} ဦး` },
          ]}
        />
      </Panel>
    </>
  );
}
