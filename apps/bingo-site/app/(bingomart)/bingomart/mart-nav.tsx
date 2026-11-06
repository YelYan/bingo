"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./mark";

export const APP_PREVIEW = "https://bingomart.bingowebstudio.com/screens";
export const SURVEY =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8kvmrGfboBFYJicniVkdQVWHQ9MFPDmDnFVPrX2YPexrwUA/viewform";

type Item = { label: string; detail: string; href: string };
type Menu = {
  label: string;
  groups: { eyebrow: string; items: Item[] }[];
  footer: { title: string; detail: string; cta: string; href: string };
};

// Foundable-style menus. Every item lands on a real section or page; nothing points at a page we have not built.
const menus: Menu[] = [
  {
    label: "Product",
    groups: [
      {
        eyebrow: "Sell",
        items: [
          { label: "Web shop", detail: "A shop on your own web address.", href: "#shop" },
          { label: "Chat orders", detail: "An AI assistant takes orders day and night.", href: "#chat-orders" },
          { label: "Counter sales", detail: "A point of sale that works offline.", href: "#pos" },
        ],
      },
      {
        eyebrow: "Get paid and deliver",
        items: [
          { label: "Receipt checks", detail: "Reads transfer slips and flags repeats.", href: "#receipts" },
          { label: "Delivery tracking", detail: "A link your shoppers can follow.", href: "#delivery" },
          { label: "Profit reports", detail: "Best and slow sellers, by day or month.", href: "#reports" },
        ],
      },
    ],
    footer: {
      title: "See it working",
      detail: "Demo screens with example data.",
      cta: "Preview the app",
      href: APP_PREVIEW,
    },
  },
  {
    label: "Solutions",
    groups: [
      {
        eyebrow: "Who it's for",
        items: [
          { label: "Chat sellers", detail: "Orders arrive on Telegram, Facebook or TikTok.", href: "#chat-sellers" },
          { label: "Shops with a counter", detail: "Sell in store and online from one stock list.", href: "#counter-shops" },
          { label: "Sellers who ship", detail: "Riders, couriers and bus gates.", href: "#shippers" },
        ],
      },
      {
        eyebrow: "By shop type",
        items: [
          { label: "Fashion", detail: "Sizes and colours for every item.", href: "#fashion" },
          { label: "Beauty", detail: "Shades, sets and repeat buyers.", href: "#beauty" },
          { label: "Food", detail: "Daily orders and your own riders.", href: "#food" },
        ],
      },
    ],
    footer: {
      title: "Built for Myanmar",
      detail: "Kyat, Burmese and weak internet.",
      cta: "See why",
      href: "#myanmar",
    },
  },
  {
    label: "Resources",
    groups: [
      {
        eyebrow: "Learn",
        items: [
          { label: "How it works", detail: "Open a shop in three steps.", href: "#how" },
          { label: "App preview", detail: "Click through the demo screens.", href: APP_PREVIEW },
          { label: "Seller survey", detail: "Tell us how you sell today. In Burmese.", href: SURVEY },
        ],
      },
      {
        eyebrow: "Company",
        items: [
          { label: "About Bingo", detail: "The company behind BingoMart.", href: "/about" },
          { label: "Contact", detail: "Talk to the team.", href: "/contact" },
          { label: "Privacy", detail: "How we handle your data.", href: "/privacy" },
        ],
      },
    ],
    footer: {
      title: "Early access",
      detail: "Yangon and Mandalay shops first.",
      cta: "Join",
      href: "#access",
    },
  },
];

function NavLink({ href, onClick, className, children }: {
  href: string;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
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

export function MartNav({ gutter }: { gutter: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

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
            href="/bingomart"
            aria-label="BingoMart home"
            className="flex min-h-11 items-center gap-2 font-display text-xl font-bold tracking-[-0.02em] text-mart-ink sm:gap-2.5 sm:text-2xl"
          >
            <Mark className="h-9 w-9 rounded-[0.625rem] text-[0.9375rem]" />
            BingoMart
          </Link>

          <nav aria-label="BingoMart" className="relative hidden items-center gap-1 md:flex">
            {menus.map((menu) => {
              const isOpen = open === menu.label;
              const id = `mart-menu-${menu.label.toLowerCase()}`;
              return (
                <div key={menu.label}>
                  <button
                    ref={(el) => {
                      triggers.current[menu.label] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    // Hover already opened it for a mouse, so a mouse click must not toggle it shut.
                    onClick={(e) =>
                      setOpen(isOpen && (e.nativeEvent as PointerEvent).pointerType !== "mouse" ? null : menu.label)
                    }
                    onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(menu.label)}
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
                                    href={item.href}
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
                        href={menu.footer.href}
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
              Pricing
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#access"
            onClick={close}
            className="inline-flex min-h-11 items-center rounded-full bg-mart-teal px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-mart-ink sm:px-5 sm:text-[0.9375rem]"
          >
            Join early access
          </a>
          <button
            type="button"
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-controls="mart-mobile-nav"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-mart-line text-mart-ink transition-colors hover:border-mart-ink md:hidden"
          >
            <span className="sr-only">{mobile ? "Close menu" : "Open menu"}</span>
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
        aria-label="BingoMart mobile"
        hidden={!mobile}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto border-b border-mart-line bg-mart-paper md:hidden"
      >
        <div className={`${gutter} py-2`}>
          {menus.map((menu) => (
            <details key={menu.label} className="group border-b border-mart-line">
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
                          <NavLink href={item.href} onClick={close} className="block py-2">
                            <span className="block font-semibold text-mart-ink">{item.label}</span>
                            <span className="block text-sm text-mart-soft">{item.detail}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <NavLink
                  href={menu.footer.href}
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
            Pricing
          </a>
        </div>
      </nav>
    </header>
  );
}
