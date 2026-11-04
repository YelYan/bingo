import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel } from "@/components/kit";
import { warrantyItems } from "@/lib/mock/more";

export const metadata: Metadata = { title: "အာမခံနှင့် လစဉ်ပေး" };

export default function WarrantyPage() {
  return (
    <>
      <PageHead title="အာမခံနှင့် လစဉ်ပေး" />
      <Panel flush>
        <DataTable
          caption="အာမခံနှင့် လစဉ်ပေး"
          rows={warrantyItems}
          cols={[
            { key: "product", label: "ပစ္စည်း", render: (w) => <span><span className="block font-semibold">{w.product}</span><span className="block text-[0.8125rem] text-soft">{w.customer}</span></span> },
            { key: "months", label: "အာမခံ" },
            { key: "left", label: "ကျန်ချိန်", render: (w) => <Chip tone={w.left === "ကုန်ပြီး" ? "mute" : "ok"}>{w.left}</Chip> },
            { key: "installment", label: "လစဉ်ပေး", className: "text-soft" },
          ]}
        />
      </Panel>
    </>
  );
}
