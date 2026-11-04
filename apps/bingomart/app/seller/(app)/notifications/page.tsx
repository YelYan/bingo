import type { Metadata } from "next";
import { PageHead, Panel } from "@/components/kit";
import { Switch } from "@/components/kit-client";

export const metadata: Metadata = { title: "သတိပေးချက်များ" };

const groups = [
  { title: "အော်ဒါနှင့် ငွေ", items: ["အော်ဒါအသစ်", "ငွေစလစ် စစ်ဆေးရန်", "ကုန်လက်ကျန် နည်းနေခြင်း"] },
  { title: "ဖောက်သည်", items: ["AI လူကို လွှဲပေးသည့်အခါ", "ပြန်အမ်း/ပြန်လဲ တောင်းဆိုမှု"] },
  { title: "ဆိုင်", items: ["Broadcast ပို့ပြီးကြောင်း အစီရင်ခံစာ", "အပတ်စဉ် ရောင်းအား အကျဉ်းချုပ်"] },
];

export default function NotificationsPage() {
  return (
    <>
      <PageHead title="သတိပေးချက်များ" />
      {groups.map((g) => (
        <Panel key={g.title} title={g.title}>
          <div className="flex flex-col divide-y divide-[#f3efe4]">
            {g.items.map((item) => <div key={item} className="py-2.5 first:pt-0 last:pb-0"><Switch label={item} defaultChecked /></div>)}
          </div>
        </Panel>
      ))}
    </>
  );
}
