import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, type Tone } from "@/components/kit";
import { Pills } from "@/components/kit-client";
import { bookingSlots, bookingStatus, bookings } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ဘွတ်ကင် ပြက္ခဒိန်" };

export default function BookingsPage() {
  return (
    <>
      <PageHead title="ဘွတ်ကင် ပြက္ခဒိန်" actions={<Pills label="ရက်" options={["ယနေ့", "မနက်ဖြန်", "ဒီအပတ်"]} />} />
      <Panel title="31 အောက်တိုဘာ 2026" flush>
        <DataTable
          caption="ဘွတ်ကင်များ"
          rows={bookings}
          cols={[
            { key: "time", label: "အချိန်", className: "font-semibold" },
            { key: "name", label: "ဖောက်သည်" },
            { key: "service", label: "ဝန်ဆောင်မှု", className: "text-soft" },
            { key: "status", label: "", render: (b) => { const [l, t] = bookingStatus[b.status as keyof typeof bookingStatus]; return <Chip tone={t as Tone}>{l}</Chip>; } },
          ]}
        />
      </Panel>
      <p className="text-[0.8125rem] text-soft">ကျန် အချိန်များ — {bookingSlots.join(" · ")}</p>
    </>
  );
}
