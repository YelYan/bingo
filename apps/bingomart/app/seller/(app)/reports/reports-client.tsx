"use client";

import { useState } from "react";
import { Bars, PageHead, Panel, Stat, StatGrid } from "@/components/kit";
import { Segmented } from "@/components/kit-client";
import { reportRanges } from "@/lib/mock/seller-core";

export function ReportsHead() {
  return null;
}

export function ReportsClient() {
  const [range, setRange] = useState("လ");
  const data = reportRanges[range];
  return (
    <>
      <PageHead title="အစီရင်ခံစာ" actions={<Segmented label="ကာလ" options={Object.keys(reportRanges)} defaultValue="လ" onChange={setRange} />} />
      <StatGrid>
        {data.kpis.map((k) => <Stat key={k.label} label={k.label} value={k.value} note={k.note} tone={k.good ? "good" : undefined} />)}
      </StatGrid>
      <Panel title={`ရောင်းအား (${data.unit})`} action={<span className="text-[0.8125rem] text-soft">{data.period}</span>}>
        <Bars data={data.bars.map((b) => ({ ...b, display: b.value.toFixed(1) }))} highlight={data.bars.length - 1} height={210} />
      </Panel>
    </>
  );
}
