import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, Stat, StatGrid, Toolbar, type Tone } from "@/components/kit";
import { Pills } from "@/components/kit-client";
import { inventoryKpis, inventoryRows } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ကုန်လက်ကျန်" };

export default function InventoryPage() {
  return (
    <>
      <PageHead
        title="ကုန်လက်ကျန်"
        sub="ဆိုင်ခွဲ 1"
        actions={<Toolbar><a href="/seller/stock-in" className="btn btn-ghost">ကုန်ဝင် မှတ်ရန်</a><a href="/seller/stocktake" className="btn btn-primary">စာရင်း ပြန်ရေတွက်</a></Toolbar>}
      />
      <StatGrid>
        {inventoryKpis.map((k) => <Stat key={k.label} label={k.label} value={k.value} tone={k.label.includes("နည်းနေ") || k.label.includes("ကုန်သွား") ? undefined : "good"} />)}
      </StatGrid>
      <Panel flush>
        <div className="border-b border-[#eee9dd] p-3"><Pills label="စစ်ထုတ်ရန်" options={["အားလုံး", "နည်းနေ", "ကုန်သွား"]} /></div>
        <DataTable
          caption="ကုန်လက်ကျန်"
          rows={inventoryRows}
          cols={[
            { key: "name", label: "ပစ္စည်း", render: (r) => <span><span className="block font-semibold">{r.name}</span><span className="block text-[0.8125rem] text-soft">{r.variant}</span></span> },
            { key: "sku", label: "SKU", className: "text-soft" },
            { key: "stock", label: "လက်ကျန်", render: (r) => <Chip tone={(r.stock === 0 ? "bad" : r.stock <= 4 ? "wait" : "ok") as Tone}>{r.stock === 0 ? "ကုန်သွား" : `${r.stock} ခု`}</Chip> },
            { key: "cost", label: "ကုန်ကျ", className: "text-soft whitespace-nowrap", render: (r) => `${r.cost.toLocaleString("en-US")} ကျပ်` },
            { key: "price", label: "ရောင်းစျေး", className: "font-semibold whitespace-nowrap", render: (r) => `${r.price.toLocaleString("en-US")} ကျပ်` },
          ]}
        />
      </Panel>
    </>
  );
}
