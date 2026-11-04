import type { Metadata } from "next";
import { AppShell } from "@/components/shells";
import { adminNav } from "@/lib/nav";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell brand="BingoMart" subtitle="ကျွန်ုပ်တို့ အဖွဲ့" groups={adminNav} tone="admin">
      {children}
    </AppShell>
  );
}
