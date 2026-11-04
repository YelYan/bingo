import type { Metadata } from "next";
import Link from "next/link";
import { Chip, DataTable, PageHead, Panel, type Tone } from "@/components/kit";
import { sellerApi } from "@/lib/api";
import { shipmentLabel } from "@/lib/copy";

export const metadata: Metadata = { title: "ပို့ဆောင်မှုများ" };

type Summary = { id: string; number: number; customerName: string; shipmentStatus: string; createdAt: string };
const TONE: Record<string, Tone> = { created: "mute", packed: "wait", with_carrier: "ship", out_for_delivery: "ship", attempted: "bad", delivered: "ok", cancelled: "mute" };

export default async function ShipmentsPage() {
  const orders = await sellerApi<Summary[]>("/seller/orders");
  const active = orders.filter((o) => o.shipmentStatus !== "delivered" && o.shipmentStatus !== "cancelled");

  return (
    <>
      <PageHead title="ပို့ဆောင်မှုများ" sub={`${active.length} ခု ပို့ဆောင်နေဆဲ`} />
      <Panel flush>
        <DataTable
          caption="ပို့ဆောင်မှုများ"
          rows={orders}
          cols={[
            { key: "number", label: "အော်ဒါ", render: (o) => <Link href={`/seller/orders/${o.id}`} className="font-semibold text-teal">#{o.number}</Link> },
            { key: "customerName", label: "ဖောက်သည်" },
            { key: "shipmentStatus", label: "အခြေအနေ", render: (o) => <Chip tone={TONE[o.shipmentStatus]}>{shipmentLabel[o.shipmentStatus]}</Chip> },
          ]}
        />
      </Panel>
    </>
  );
}
