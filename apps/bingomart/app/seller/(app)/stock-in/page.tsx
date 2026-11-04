import type { Metadata } from "next";
import { DataTable, Notice, PageHead, Panel, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { stockInBatches } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "ပစ္စည်းဝင် (FIFO)" };

export default function StockInPage() {
  return (
    <>
      <PageHead title="ပစ္စည်းဝင် (FIFO)" actions={<MockButton done="မှတ်ပြီး">+ ဝင်ကုန် မှတ်ရန်</MockButton>} />
      <Panel title="ဝင်ကုန် မှတ်တမ်း" flush>
        <DataTable
          caption="ဝင်ကုန် မှတ်တမ်း"
          rows={stockInBatches}
          cols={[
            { key: "id", label: "Batch", className: "font-semibold" },
            { key: "product", label: "ပစ္စည်း" },
            { key: "qty", label: "အရေအတွက်" },
            { key: "unitCost", label: "ကုန်ကျ (တစ်ခု)", className: "whitespace-nowrap", render: (b) => money(b.unitCost) },
            { key: "date", label: "ရက်စွဲ", className: "text-soft" },
          ]}
        />
      </Panel>
      <Notice tone="ship">FIFO — အစောဆုံး ဝင်ထားသော batch ကို အရင်ရောင်းသည်ဟု ယူဆပြီး ရောင်းကုန်တန်ဖိုး တွက်ချက်သည်။</Notice>
    </>
  );
}
