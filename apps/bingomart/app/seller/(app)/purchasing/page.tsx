import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, Split, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { purchaseOrders, suppliers } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "ဝယ်ယူမှု / ပေးသွင်းသူ" };

export default function PurchasingPage() {
  return (
    <>
      <PageHead title="ဝယ်ယူမှု / ပေးသွင်းသူ" actions={<MockButton done="ဖန်တီးပြီး">+ PO အသစ်</MockButton>} />
      <Split
        main={
          <Panel title="ဝယ်ယူမှု မှာစာများ" flush>
            <DataTable
              caption="ဝယ်ယူမှု မှာစာများ"
              rows={purchaseOrders}
              cols={[
                { key: "id", label: "PO", className: "font-semibold" },
                { key: "supplier", label: "ပေးသွင်းသူ" },
                { key: "items", label: "ပစ္စည်း", className: "text-soft" },
                { key: "amount", label: "ပမာဏ", className: "font-semibold whitespace-nowrap", render: (p) => money(p.amount) },
                { key: "status", label: "", render: (p) => <Chip tone={p.status === "received" ? "ok" : "wait"}>{p.status === "received" ? "ရောက်ပြီး" : "စောင့်နေ"}</Chip> },
              ]}
            />
          </Panel>
        }
        side={
          <Panel title="ပေးသွင်းသူများ" flush>
            <DataTable
              caption="ပေးသွင်းသူများ"
              rows={suppliers}
              cols={[
                { key: "name", label: "အမည်", className: "font-semibold" },
                { key: "owes", label: "ကျန်ငွေ", className: "whitespace-nowrap", render: (s) => s.owes ? money(s.owes) : "—" },
              ]}
            />
          </Panel>
        }
      />
    </>
  );
}
