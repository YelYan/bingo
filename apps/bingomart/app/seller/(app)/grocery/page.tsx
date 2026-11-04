import type { Metadata } from "next";
import { DataTable, PageHead, Panel, money } from "@/components/kit";
import { groceryItems } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ကုန်စုံ အချိန်/အလေးချိန်" };

export default function GroceryPage() {
  return (
    <>
      <PageHead title="ကုန်စုံ — အလေးချိန်အလိုက် ပစ္စည်းများ" />
      <Panel flush>
        <DataTable
          caption="အလေးချိန်အလိုက် ပစ္စည်းများ"
          rows={groceryItems}
          cols={[
            { key: "name", label: "ပစ္စည်း", className: "font-semibold" },
            { key: "unit", label: "ယူနစ်", className: "text-soft" },
            { key: "price", label: "ဈေးနှုန်း", render: (g) => `${money(g.price)} / ${g.unit}` },
            { key: "stock", label: "လက်ကျန်" },
          ]}
        />
      </Panel>
    </>
  );
}
