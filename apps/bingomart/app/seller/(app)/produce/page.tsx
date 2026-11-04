import type { Metadata } from "next";
import { DataTable, PageHead, Panel, money } from "@/components/kit";
import { produceToday } from "@/lib/mock/more";

export const metadata: Metadata = { title: "စိုက်ပျိုးသီးနှံ နေ့စဉ်ဈေး" };

export default function ProducePage() {
  return (
    <>
      <PageHead title="နေ့စဉ် ဈေးနှုန်း" sub="31 အောက်တိုဘာ 2026" />
      <Panel flush>
        <DataTable
          caption="နေ့စဉ် ဈေးနှုန်း"
          rows={produceToday}
          cols={[
            { key: "name", label: "ပစ္စည်း", className: "font-semibold" },
            { key: "price", label: "ဈေးနှုန်း", render: (p) => `${money(p.price)} / ${p.unit}` },
            { key: "change", label: "မနေ့နှင့် နှိုင်းစာ", render: (p) => <span className={p.change.startsWith("+") ? "text-[#0a5547]" : p.change.startsWith("−") ? "text-danger" : "text-soft"}>{p.change}</span> },
          ]}
        />
      </Panel>
    </>
  );
}
