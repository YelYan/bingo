import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/projects";
import { process, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Web Design, Local SEO & AI Services",
  description:
    "Web design, local SEO, AI social scheduling, website care, and AI solutions — the five things Bingo does, and exactly what you get with each.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Five services.
            <br /> One team that gets it done.
          </>
        }
        lead="No handoffs to an agency you never meet, no five different freelancers who don't talk to each other. Below is the honest version: what's included, and what you actually walk away with."
        aside={
          <ul className="space-y-2 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="link-wipe flex min-h-11 items-center gap-3 text-[0.9375rem] text-ink-soft hover:text-ink"
                >
                  <span className="tabular text-xs font-bold text-sand-ink">
                    {s.index}
                  </span>
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-20 sm:py-28 ${i % 2 === 1 ? "bg-paper-2" : ""}`}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="tabular font-display text-sm font-bold text-sand-ink">
                    {service.index}
                  </span>
                  <h2 className="mt-4 text-[clamp(2.1rem,5vw,3.4rem)] text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
                    {service.description}
                  </p>

                  <div className="mt-9 border-t border-line pt-6">
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase">
                      The outcome
                    </dt>
                    <dd className="mt-2 font-serif text-lg leading-snug text-spark-deep">
                      {service.outcome}
                    </dd>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal delay={90}>
                  <h3 className="text-[0.6875rem] font-semibold tracking-[0.22em] text-sand-ink uppercase">
                    What's included
                  </h3>
                  <ul className="mt-6">
                    {service.included.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-4 border-t border-line py-4 last:border-b"
                      >
                        <Spark className="mt-2.5 h-2.5 w-[0.4rem] shrink-0" />
                        <span className="text-[1.0625rem] text-ink">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9">
                    <ButtonLink href="/contact" tone="ink">
                      {service.cta}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* --------- method --------- */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="How it runs"
            title="The same four steps, whichever service you need."
            align="center"
          />
          <ol className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal
                key={step.step}
                as="li"
                delay={i * 70}
                className="border-t border-line pt-7 sm:px-5 sm:first:pl-0 lg:last:pr-0"
              >
                <span className="tabular font-display text-sm font-bold text-sand-ink">
                  {step.step}
                </span>
                <h3 className="mt-3 text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* --------- proof --------- */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Proof"
              title="What that looks like in the wild."
            />
            <Link
              href="/work"
              className="link-wipe inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink"
            >
              All six case studies
            </Link>
          </div>
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-x-10">
            {projects.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Not sure which"
        title="Most people need two or three of these."
        lead="Tell us the symptom — no leads, wrong leads, a site nobody can update, socials that went quiet — and we'll tell you which service actually fixes it."
        secondary={{ href: "/tools", label: "Try a free tool first" }}
      />
    </>
  );
}
