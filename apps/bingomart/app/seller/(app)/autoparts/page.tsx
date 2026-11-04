import type { Metadata } from "next";
import { DataTable, PageHead, Panel, money } from "@/components/kit";
import { autoparts } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ကားပစ္စည်း တွဲဖက်နိုင်မှု" };

export default function AutopartsPage() {
  return (
    <>
      <PageHead title="ကားပစ္စည်း" sub="မော်ဒယ်နှင့် တွဲဖက်နိုင်မှု စစ်ဆေးရန်" />
      <Panel flush>
        <DataTable
          caption="ကားပစ္စည်းများ"
          rows={autoparts}
          cols={[
            { key: "name", label: "ပစ္စည်း", className: "font-semibold" },
            { key: "fits", label: "တွဲဖက်နိုင်သည့် မော်ဒယ်", className: "text-soft" },
            { key: "stock", label: "လက်ကျန်" },
            { key: "price", label: "ဈေးနှုန်း", className: "font-semibold", render: (a) => money(a.price) },
          ]}
        />
      </Panel>
    </>
  );
}
