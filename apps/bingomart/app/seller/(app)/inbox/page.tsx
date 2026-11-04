import type { Metadata } from "next";
import { Chip, PageHead, Toolbar } from "@/components/kit";
import { InboxClient } from "./inbox-client";

export const metadata: Metadata = { title: "မက်ဆေ့ချ်များ" };

export default function InboxPage() {
  return (
    <>
      <PageHead
        title="မက်ဆေ့ချ်များ"
        actions={
          <Toolbar>
            {["Messenger", "Viber", "Telegram", "Web chat"].map((c) => <Chip key={c} tone="ok">{c} ● ချိတ်ထား</Chip>)}
          </Toolbar>
        }
      />
      <InboxClient />
    </>
  );
}
