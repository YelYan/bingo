import type { Metadata } from "next";
import { Icon, PageHead, Panel } from "@/components/kit";
import { MockButton } from "@/components/kit-client";

export const metadata: Metadata = { title: "Loading / error / empty states" };

export default function StatesPage() {
  return (
    <>
      <PageHead title="Loading, error and empty states" sub="A reference sheet, not a product screen." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Panel title="Loading">
          <div className="flex animate-pulse flex-col gap-2" aria-hidden="true">
            <div className="h-4 w-3/4 rounded bg-[#eee9dd]" />
            <div className="h-4 w-1/2 rounded bg-[#eee9dd]" />
            <div className="h-24 rounded-xl bg-[#eee9dd]" />
          </div>
          <p role="status" className="sr-only">ဒေတာ တင်နေသည်</p>
        </Panel>
        <Panel title="Error">
          <div className="flex flex-col items-center gap-2.5 py-4 text-center">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-wash text-danger"><Icon d="M12 8v5M12 16h.01M12 3l9 16H3z" /></span>
            <p className="font-semibold text-danger">ဒေတာ ရယူ၍ မရပါ</p>
            <MockButton done="ပြန်ကြိုးစားနေသည်" className="btn-ghost">ပြန်ကြိုးစားမည်</MockButton>
          </div>
        </Panel>
        <Panel title="Empty">
          <div className="flex flex-col items-center gap-2.5 py-4 text-center">
            <span aria-hidden="true" className="text-3xl">📭</span>
            <p className="text-soft">ဒေတာ မရှိသေးပါ</p>
            <MockButton done="ထည့်ပြီး" className="btn-primary">ပထမဆုံး အချက် ထည့်မည်</MockButton>
          </div>
        </Panel>
      </div>
    </>
  );
}
