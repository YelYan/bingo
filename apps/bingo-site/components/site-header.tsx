"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { flagship, otherProducts } from "@/lib/products";
import { nav, site } from "@/lib/site";
import { Logo } from "./logo";
import { ProductTile } from "./product-tile";
import { Arrow } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and lock the page behind it.
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      {menu ? (
        <div
          aria-hidden="true"
          onClick={() => setMenu(false)}
          className="fixed inset-0 z-40 hidden bg-ink-2/40 lg:block"
        />
      ) : null}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          menu
            ? "border-b border-line bg-paper"
            : scrolled
              ? "border-b border-line bg-paper/85 backdrop-blur-md"
              : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="rounded-lg outline-offset-4"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) =>
              item.href === "/products" ? (
                <button
                  key={item.href}
                  ref={menuButton}
                  type="button"
                  onClick={() => setMenu((v) => !v)}
                  aria-expanded={menu}
                  aria-controls="products-menu"
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
                    menu || isActive(item.href)
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className={`h-3 w-3 transition-transform duration-200 ${menu ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`link-wipe relative inline-flex min-h-11 items-center text-[0.9375rem] font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-spark"
                    />
                  ) : null}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden min-h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-spark sm:inline-flex"
            >
              Talk to us
              <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6.5h14M3 13.5h14" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="products-menu"
          hidden={!menu}
          className="absolute inset-x-0 top-full border-b border-line bg-paper max-lg:hidden"
        >
          <div className="mx-auto grid w-full max-w-[84rem] gap-10 px-5 py-9 sm:px-8 lg:grid-cols-[1fr_2fr] lg:px-12">
            <Link
              href={flagship.href}
              onClick={() => setMenu(false)}
              className="group flex flex-col rounded-[1.25rem] bg-mart-ink p-7 text-mart-paper"
            >
              <ProductTile
                product={flagship}
                className="h-16 w-16 rounded-2xl bg-mart-saffron! text-[1.625rem] text-mart-ink!"
              />
              <span className="mt-5 font-display text-3xl font-extrabold tracking-[-0.04em]">
                {flagship.name}
              </span>
              <span className="mt-2 text-[0.9375rem] leading-snug text-mart-mist">
                {flagship.short}: orders, payments and parcels in one place.
              </span>
              <span className="mt-4 text-[0.8125rem] font-bold text-mart-saffron">
                {flagship.status}
              </span>
            </Link>

            <div>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                {otherProducts.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={product.href}
                      onClick={() => setMenu(false)}
                      className="group flex min-h-[4.5rem] items-center gap-4 rounded-xl p-2 transition-colors hover:bg-paper-2"
                    >
                      <ProductTile
                        product={product}
                        className="h-12 w-12 rounded-xl text-[1.1875rem]"
                      />
                      <span>
                        <span className="block font-semibold text-ink">
                          {product.name}
                        </span>
                        <span className="block text-sm text-ink-soft">
                          {product.short}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                onClick={() => setMenu(false)}
                className="group mt-4 ml-2 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-spark-deep"
              >
                See all products
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 bg-paper pt-24 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 sm:px-8">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="flex items-center justify-between border-b border-line py-5 font-display text-3xl font-bold tracking-[-0.04em] text-ink"
            >
              <span>{item.label}</span>
              <span className="tabular font-sans text-xs font-semibold tracking-[0.2em] text-sand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-spark px-7 font-semibold text-ink-2"
          >
            Talk to us
            <Arrow />
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 w-fit items-center text-sm text-ink-soft underline underline-offset-4"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </>
  );
}
