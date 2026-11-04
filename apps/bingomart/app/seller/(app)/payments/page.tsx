import type { Metadata } from "next";
import Link from "next/link";
import { Chip, DataTable, PageHead, Panel, money } from "@/components/kit";
import { sellerApi } from "@/lib/api";
import { paymentLabel, shipmentLabel } from "@/lib/copy";

export const metadata: Metadata = { title: "ငွေပေးချေမှု စစ်ဆေးရန်" };

type Summary = { id: string; number: number; customerName: string; totalMmk: number; paymentMethod: string; paymentStatus: string; shipmentStatus: string; createdAt: string };

export default async function PaymentsPage() {
  const orders = await sellerApi<Summary[]>("/seller/orders");
  const review = orders.filter((o) => o.paymentStatus === "in_review");
  const waiting = orders.filter((o) => o.paymentStatus === "awaiting_slip" || o.paymentStatus === "rejected");

  return (
    <>
      <PageHead title="ငွေပေးချေမှု စစ်ဆေးရန်" sub={`${review.length} ခု စစ်ဆေးရန် ကျန်သည်`} />
      <Panel title="စစ်ဆေးရန် ကျန်သော စလစ်များ" flush>
        <DataTable
          caption="စစ်ဆေးရန် ကျန်သော စလစ်များ"
          empty="စစ်ဆေးရန် မရှိတော့ပါ။"
          rows={review}
          cols={[
            { key: "number", label: "အော်ဒါ", className: "font-semibold", render: (o) => <Link href={`/seller/orders/${o.id}`} className="font-semibold text-teal">#{o.number}</Link> },
            { key: "customerName", label: "ဖောက်သည်" },
            { key: "totalMmk", label: "ပမာဏ", className: "font-semibold whitespace-nowrap", render: (o) => money(o.totalMmk) },
            { key: "paymentStatus", label: "", render: () => <Chip tone="bad">စစ်ဆေးရန်</Chip> },
          ]}
        />
      </Panel>
      <Panel title="စလစ် မတင်ရသေးသော အော်ဒါများ" flush>
        <DataTable
          caption="စလစ် မတင်ရသေးသော အော်ဒါများ"
          empty="မရှိပါ။"
          rows={waiting}
          cols={[
            { key: "number", label: "အော်ဒါ", render: (o) => <Link href={`/seller/orders/${o.id}`} className="font-semibold text-teal">#{o.number}</Link> },
            { key: "customerName", label: "ဖောက်သည်" },
            { key: "totalMmk", label: "ပမာဏ", className: "whitespace-nowrap", render: (o) => money(o.totalMmk) },
            { key: "paymentStatus", label: "", render: (o) => <Chip tone="wait">{paymentLabel[o.paymentStatus]}</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
