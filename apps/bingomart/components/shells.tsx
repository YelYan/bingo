"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { NavGroup } from "@/lib/nav";
import { Icon } from "./kit";

function isActive(pathname: string, href: string) {
  return href === "/seller" || href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function NavTree({ groups, pathname }: { groups: NavGroup[]; pathname: string }) {
  return (
    <nav aria-label="ဆိုင်စီမံရန်" className="flex flex-col gap-1">
      {groups.map((group) => {
        const open = group.items.some((i) => isActive(pathname, i.href));
        return (
          <details key={group.title} open={open || group.title === groups[0].title} className="group">
            <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between rounded-lg px-3 text-[0.75rem] font-bold tracking-wide text-soft uppercase hover:bg-ground [&::-webkit-details-marker]:hidden">
              {group.title}
              <span aria-hidden="true" className="transition-transform group-open:rotate-180">▾</span>
            </summary>
            <ul className="mb-2">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-3 rounded-[0.625rem] px-3 text-[0.9375rem] ${active ? "bg-teal font-semibold text-white" : "text-[#3b433e] hover:bg-ground"}`}
                    >
                      <Icon d={item.icon} className="h-[1.125rem] w-[1.125rem] flex-none" />
                      <span className="min-w-0 flex-1 break-words">{item.label}</span>
                      {item.badge ? <span className={`rounded-full px-2 text-xs font-bold ${active ? "bg-white/25" : "bg-saffron text-[#2b2000]"}`}>{item.badge}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}

/** Sidebar on wide screens, a drawer behind a button on narrow ones. */
export function AppShell({ brand, subtitle, groups, footer, children, tone = "light" }: { brand: string; subtitle?: string; groups: NavGroup[]; footer?: ReactNode; children: ReactNode; tone?: "light" | "admin" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const logo = (
    <Link href={tone === "admin" ? "/admin" : "/seller"} className="flex min-h-11 min-w-0 items-center gap-2.5 font-display font-bold text-deep">
      <span aria-hidden="true" className={`flex h-9 w-9 flex-none items-center justify-center rounded-[0.625rem] text-sm ${tone === "admin" ? "bg-saffron text-deep" : "bg-teal text-white"}`}>Bm</span>
      <span className="min-w-0">
        <span className="block truncate leading-tight">{brand}</span>
        {subtitle ? <span className="block truncate text-xs font-medium text-soft">{subtitle}</span> : null}
      </span>
    </Link>
  );

  const panel = (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      {logo}
      <NavTree groups={groups} pathname={pathname} />
      {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
    </div>
  );

  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-svh border-r border-line bg-card lg:block">{panel}</aside>

      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-1 lg:hidden">
        {logo}
        <button type="button" aria-expanded={open} aria-controls="app-drawer" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line">
          <span className="sr-only">{open ? "မီနူး ပိတ်ရန်" : "မီနူး ဖွင့်ရန်"}</span>
          <Icon d={open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18"} />
        </button>
      </div>
      <div id="app-drawer" hidden={!open} className="fixed inset-x-0 top-[3.25rem] bottom-0 z-30 overflow-hidden bg-card lg:hidden">
        {panel}
      </div>

      <main id="main" className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex max-w-[84rem] flex-col gap-5">{children}</div>
      </main>
    </div>
  );
}
