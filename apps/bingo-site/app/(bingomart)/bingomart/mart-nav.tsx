"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "./copy";
import { itemHref, SURVEY, type ItemId } from "./links";
import { Mark } from "./mark";

function NavLink({ id, onClick, className, children }: {
  id: ItemId;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  const href: string = itemHref[id];
  if (href.startsWith("/")) {
    return <Link href={href} onClick={onClick} className={className}>{children}</Link>;
  }
  const external = href === SURVEY;
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-3 w-3 transition-transform duration-200 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export function MartNav({ gutter, nav, home }: { gutter: string; nav: Copy["nav"]; home: string }) {
  const menus = nav.menus;
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) triggers.current[open]?.focus();
      setOpen(null);
      setMobile(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, mobile]);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };

  return (
    <header
      ref={header}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
      className="sticky top-0 z-30 border-b border-mart-line bg-mart-paper/95 backdrop-blur-sm"
    >
      <div className={`${gutter} flex items-center justify-between gap-4 py-3`}>
        <div className="flex items-center gap-8">
          <Link
            href={home}
            aria-label={nav.home}
            className="flex min-h-11 items-center gap-2 font-display text-xl font-bold tracking-[-0.02em] text-mart-ink sm:gap-2.5 sm:text-2xl"
          >
            <Mark className="h-9 w-9 rounded-[0.625rem] text-[0.9375rem]" />
            BingoMart
          </Link>

          <nav aria-label={nav.label} className="relative hidden items-center gap-1 md:flex">
            {menus.map((menu, mi) => {
              const isOpen = open === mi;
              const id = `mart-menu-${mi}`;
              return (
                <div key={mi}>
                  <button
                    ref={(el) => {
                      triggers.current[mi] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    // Hover already opened it for a mouse, so a mouse click must not toggle it shut.
                    onClick={(e) =>
                      setOpen(isOpen && (e.nativeEvent as PointerEvent).pointerType !== "mouse" ? null : mi)
                    }
                    onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(mi)}
                    className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors ${
                      isOpen ? "bg-mart-sand text-mart-ink" : "text-mart-text hover:text-mart-teal"
                    }`}
                  >
                    {menu.label}
                    <Chevron className={isOpen ? "rotate-180" : ""} />
                  </button>

                  {/* pt-3 not mt-3: the gap stays inside the header, so moving the mouse down does not close it. */}
                  <div id={id} hidden={!isOpen} className="absolute top-full left-0 pt-3">
                    <div className="w-[min(46rem,calc(100vw-16rem))] overflow-hidden rounded-[1.5rem] border border-mart-line bg-white shadow-[0_24px_60px_-20px_rgba(10,43,39,0.35)]">
                      <div className="grid grid-cols-2 gap-x-10 gap-y-6 px-8 pt-7 pb-6">
                        {menu.groups.map((group) => (
                          <div key={group.eyebrow}>
                            <p className="text-[0.8125rem] font-medium text-mart-soft">{group.eyebrow}</p>
                            <ul className="mt-2 space-y-1">
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <NavLink
                                    id={item.id}
                                    onClick={close}
                                    className="-mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-mart-paper"
                                  >
                                    <span className="block font-display text-[1.0625rem] font-bold text-mart-ink">
                                      {item.label}
                                    </span>
                                    <span className="block text-[0.9375rem] text-mart-soft">{item.detail}</span>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <NavLink
                        id={menu.footer.id}
                        onClick={close}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-mart-sand px-8 py-4 text-[0.9375rem] transition-colors hover:bg-[#e8e2cf]"
                      >
                        <span className="font-semibold text-mart-ink">{menu.footer.title}</span>
                        <span className="text-mart-soft">{menu.footer.detail}</span>
                        <span className="ml-auto inline-flex items-center gap-1 font-semibold text-mart-teal">
                          {menu.footer.cta}
                          <Chevron className="-rotate-90" />
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
            <a
              href="#pricing"
              onClick={close}
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(null)}
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium hover:text-mart-teal"
            >
              {nav.pricing}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#access"
            onClick={close}
            className="inline-flex min-h-11 items-center rounded-full bg-mart-teal px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-mart-ink sm:px-5 sm:text-[0.9375rem]"
          >
            {nav.join}
          </a>
          <button
            type="button"
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-controls="mart-mobile-nav"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-mart-line text-mart-ink transition-colors hover:border-mart-ink md:hidden"
          >
            <span className="sr-only">{mobile ? nav.close : nav.open}</span>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              {mobile ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6.5h14M3 13.5h14" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mart-mobile-nav"
        aria-label={nav.mobileLabel}
        hidden={!mobile}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto border-b border-mart-line bg-mart-paper md:hidden"
      >
        <div className={`${gutter} py-2`}>
          {menus.map((menu, mi) => (
            <details key={mi} className="group border-b border-mart-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-xl font-bold text-mart-ink [&::-webkit-details-marker]:hidden">
                {menu.label}
                <Chevron className="group-open:rotate-180" />
              </summary>
              <div className="space-y-5 pb-5">
                {menu.groups.map((group) => (
                  <div key={group.eyebrow}>
                    <p className="text-[0.8125rem] font-medium text-mart-soft">{group.eyebrow}</p>
                    <ul className="mt-1">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <NavLink id={item.id} onClick={close} className="block py-2">
                            <span className="block font-semibold text-mart-ink">{item.label}</span>
                            <span className="block text-sm text-mart-soft">{item.detail}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <NavLink
                  id={menu.footer.id}
                  onClick={close}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-mart-sand px-4 py-3"
                >
                  <span>
                    <span className="block font-semibold text-mart-ink">{menu.footer.title}</span>
                    <span className="block text-sm text-mart-soft">{menu.footer.detail}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-mart-teal">{menu.footer.cta}</span>
                </NavLink>
              </div>
            </details>
          ))}
          <a
            href="#pricing"
            onClick={close}
            className="flex min-h-14 items-center font-display text-xl font-bold text-mart-ink"
          >
            {nav.pricing}
          </a>
        </div>
      </nav>
    </header>
  );
}
