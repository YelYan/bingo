import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@/lib/screens";

export const metadata: Metadata = { title: "Screen index", robots: { index: false } };

export default function ScreensPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold text-deep">BingoMart — screen index (internal)</h1>
      <p className="mt-1 text-soft">Every mock screen built so far, for review. Not part of the product. <Link href="/screens/devices" className="font-semibold text-teal underline">Compare on desktop, tablet and phone →</Link></p>
      {groups.map(([title, links]) => (
        <section key={title} className="mt-8">
          <h2 className="mb-2 text-lg font-bold">{title}</h2>
          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-teal underline underline-offset-2">{label}</Link>
                <Link href={`/screens/devices?path=${encodeURIComponent(href)}`} className="ml-2 text-xs text-soft underline">3 sizes</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
