import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { LogoMark } from "./logo";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-2 text-paper">
      <div
        aria-hidden="true"
        className="blueprint-dark absolute inset-0 opacity-70"
      />

      <Container className="relative pt-20 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <LogoMark tone="paper" className="h-11 w-11" />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-sand-soft">
              {site.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-wipe mt-6 flex min-h-11 max-w-full items-center font-display text-2xl font-bold tracking-[-0.04em] text-paper"
            >
              <span className="min-w-0 break-all">{site.email}</span>
            </a>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="link-wipe inline-flex min-h-11 items-center text-sm text-sand"
            >
              {site.phone}
            </a>
          </div>

          <FooterColumn title="Studio">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                {s.short}
              </FooterLink>
            ))}
            <FooterLink href="/tools">Free tools</FooterLink>
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {site.socials.map((s) => (
              <FooterLink key={s.label} href={s.href} external>
                {s.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Oversized wordmark — the sign-off */}
        <div aria-hidden="true" className="mt-20 select-none">
          <p className="font-display text-[clamp(4.5rem,20vw,17rem)] leading-[0.78] font-extrabold tracking-[-0.06em] text-paper/[0.07]">
            Bingo<span className="text-spark/40">.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-sand sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Built by hand, not by builder.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{site.location}</span>
            <Link
              href="/privacy"
              className="link-wipe inline-flex min-h-11 items-center"
            >
              Privacy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-sand uppercase">
        {title}
      </h2>
      {/* Tight vertical rhythm, but every row is a 44px touch target */}
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "link-wipe inline-flex min-h-11 items-center text-[0.9375rem] text-sand-soft transition-colors duration-200 hover:text-paper";

  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}
