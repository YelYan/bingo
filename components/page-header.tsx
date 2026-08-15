import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { Container, Eyebrow } from "./ui";

/** Shared masthead for interior pages — keeps every route on the same grid. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="vignette relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.92] text-ink">
                {title}
              </h1>
            </Reveal>
            {lead ? (
              <Reveal delay={130}>
                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                  {lead}
                </p>
              </Reveal>
            ) : null}
          </div>
          {aside ? (
            <Reveal delay={180} className="lg:col-span-4">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
