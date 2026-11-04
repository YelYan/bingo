import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, Stat, StatGrid } from "@/components/kit";
import { customerKpis } from "@/lib/mock/seller-core";
import { CustomersTable } from "./customers-client";

export const metadata: Metadata = { title: "ဖောက်သည်များ" };

export default function CustomersPage() {
  return (
    <>
      <PageHead title="ဖောက်သည်များ" actions={<Link href="/seller/broadcast" className="btn btn-primary">Broadcast ပို့ရန်</Link>} />
      <StatGrid>
        {customerKpis.map((k) => <Stat key={k.label} {...k} />)}
      </StatGrid>
      <CustomersTable />
    </>
  );
}
