import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@/lib/screens";

export const metadata: Metadata = { title: "Screens on every device", robots: { index: false } };

/** Internal only: one screen shown at desktop, tablet and phone width, side by side. */
const devices = [
  { name: "Desktop", w: 1440, h: 900, scale: 0.55 },
  { name: "Tablet", w: 768, h: 1024, scale: 0.42 },
  { name: "Phone", w: 375, h: 812, scale: 0.5 },
];

// /t/ needs a real order link, so it cannot be framed on its own.
const screens = groups.flatMap(([group, items]) => items.filter(([, href]) => href !== "/t/").map(([label, href]) => ({ group, label, href })));

export default async function DevicesPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const { path } = await searchParams;
  // Only paths from the screen list are framed, never an arbitrary address.
  const i = Math.max(0, screens.findIndex((s) => s.href === path));
  const cur = screens[i];
  const prev = screens[i - 1];
  const next = screens[i + 1];
  const to = (s?: { href: string }) => `/screens/devices?path=${encodeURIComponent(s?.href ?? "")}`;

  return (
    <main className="mx-auto max-w-[96rem] p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-soft">{cur.group} · {i + 1} / {screens.length}</p>
          <h1 className="text-2xl font-bold text-deep">{cur.label}</h1>
        </div>
        <nav aria-label="Screens" className="flex flex-wrap items-center gap-2">
          {prev ? <Link href={to(prev)} className="btn btn-ghost">← {prev.label}</Link> : null}
          <Link href="/screens" className="btn btn-ghost">All screens</Link>
          {next ? <Link href={to(next)} className="btn btn-primary">{next.label} →</Link> : null}
        </nav>
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-8">
        {devices.map((d) => (
          <section key={d.name} aria-label={`${d.name} ${d.w} pixels wide`}>
            <p className="mb-2 flex items-baseline gap-2 text-sm font-semibold">
              {d.name} <span className="font-normal text-soft">{d.w} px</span>
              <a href={cur.href} target="_blank" rel="noreferrer" className="ml-auto text-xs font-normal text-teal underline">open full size</a>
            </p>
            <div className="overflow-hidden rounded-xl border border-line bg-card shadow-sm" style={{ width: d.w * d.scale, height: d.h * d.scale }}>
              <iframe
                title={`${cur.label} at ${d.name} width`}
                src={cur.href}
                loading="lazy"
                style={{ width: d.w, height: d.h, border: 0, transform: `scale(${d.scale})`, transformOrigin: "0 0" }}
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
