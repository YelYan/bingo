import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { HeroGrid } from "@/components/hero-grid";
import { Marquee } from "@/components/marquee";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { WindowFrame } from "@/components/window-frame";
import {
  Arrow,
  ButtonLink,
  Container,
  Eyebrow,
  SectionHeading,
  Tag,
} from "@/components/ui";
import { projects } from "@/lib/projects";
import { process, services } from "@/lib/services";
import { plans } from "@/lib/pricing";
import { site, stats } from "@/lib/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <TickerStrip />
      <ServicesSection />
      <WorkSection featured={featured} />
      <ProcessSection />
      <ProofSection />
      <PricingTeaser />
      <CtaBand />
    </>
  );
}

/* ================================================================== */
/* Hero                                                                */
/* ================================================================== */

function Hero() {
  return (
    <section className="vignette relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <HeroGrid />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---- statement ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>
                {site.tagline} — est. {site.founded}
              </Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-[clamp(2.9rem,8.4vw,6.4rem)] leading-[0.9] text-ink">
                Websites that
                <br />
                end in an{" "}
                <em className="aha font-serif font-normal text-spark not-italic">
                  aha
                </em>
                <span className="text-spark">.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                Bingo is a web design studio. We write the code, shape the
                brand and win the search — so the second someone lands on your
                site, they finally get what you do.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/work" tone="ink">
                  See the work
                </ButtonLink>
                <ButtonLink href="/pricing" tone="ghost">
                  Plans from ${plans[0].monthly}/mo
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="tabular block font-display text-2xl font-bold tracking-[-0.05em] text-ink">
                        {s.value}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-ink-soft">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ---- the window ---- */}
          <div data-grid-avoid className="lg:col-span-5">
            <Reveal delay={140} className="relative">
              <WindowFrame
                label="bingostudio.com"
                className="shadow-[0_36px_80px_-40px_rgba(36,39,44,0.4)]"
                bodyClassName="bg-white/60 p-6 sm:p-8"
              >
                <p className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1] font-extrabold tracking-[-0.05em] text-ink">
                  One studio.
                  <br />
                  Three ways in.
                </p>

                <ul className="mt-7 space-y-2.5">
                  {services.map((s) => (
                    <li
                      key={s.slug}
                      className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3"
                    >
                      <span className="tabular font-display text-xs font-bold text-sand-ink">
                        {s.index}
                      </span>
                      <span className="text-sm font-medium text-ink">
                        {s.short}
                      </span>
                      <Spark className="ml-auto h-2.5 w-[0.4rem]" />
                    </li>
                  ))}
                </ul>

                {/* a small performance readout — the thing clients actually feel */}
                <div className="mt-7 rounded-xl bg-ink p-5">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-sand uppercase">
                    Median build
                  </p>
                  <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
                    {[34, 52, 41, 68, 58, 84, 72, 96].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h * 0.5}px` }}
                        className={`w-full rounded-sm ${
                          i === 7 ? "bg-spark" : "bg-paper/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="tabular mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-paper">
                    96{" "}
                    <span className="font-sans text-xs font-medium tracking-normal text-sand">
                      Lighthouse performance
                    </span>
                  </p>
                </div>
              </WindowFrame>

              {/* the aha, escaping the frame */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-4 rotate-[-7deg] rounded-full bg-spark px-5 py-2.5 font-serif text-xl text-ink-2 shadow-lg sm:-left-8"
              >
                aha.
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Ticker                                                              */
/* ================================================================== */

function TickerStrip() {
  return (
    <div className="border-y border-line bg-paper-2">
      <Marquee
        items={[
          "Websites, hand-coded",
          "Branding with a spine",
          "SEO that survives updates",
          "Design systems",
          "Core Web Vitals",
          "Accessibility as standard",
        ]}
      />
    </div>
  );
}

/* ================================================================== */
/* Services                                                            */
/* ================================================================== */

function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Three services. They only
              <br className="hidden sm:block" /> really work together.
            </>
          }
          lead="Most studios sell one and outsource the rest. We keep all three in the building, because a beautiful site with no traffic and a strong brand with a slow site are the same failure wearing different clothes."
        />

        <div className="mt-16 border-t border-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/services#${service.slug}`}
                className="group grid gap-6 border-b border-line py-10 transition-colors duration-300 hover:bg-paper-2/60 sm:py-12 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span className="tabular mt-2 font-display text-sm font-bold text-sand-ink">
                    {service.index}
                  </span>
                  <h3 className="text-[clamp(1.75rem,3.6vw,2.75rem)] text-ink transition-colors duration-300 group-hover:text-spark-deep">
                    {service.title}
                  </h3>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-serif text-xl leading-snug text-ink">
                    {service.promise}
                  </p>
                  <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                    {service.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.tools.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start justify-between gap-4 lg:col-span-2 lg:justify-end">
                  <span className="text-xs font-semibold tracking-[0.16em] text-sand-ink uppercase lg:hidden">
                    {service.timeline}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-spark group-hover:bg-spark group-hover:text-ink-2"
                  >
                    <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Work                                                                */
/* ================================================================== */

function WorkSection({ featured }: { featured: typeof projects }) {
  return (
    <section className="bg-paper-2 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Six cases we&apos;re
                <br className="hidden sm:block" /> happy to be judged on.
              </>
            }
          />
          <ButtonLink href="/work" tone="ghost">
            All projects
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          {featured.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 90}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Process                                                             */
/* ================================================================== */

function ProcessSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="The method"
                title={
                  <>
                    Four steps. The
                    <br className="hidden sm:block" /> third one is the point.
                  </>
                }
                lead="Every studio has a process diagram. Ours is short because most of the value sits in one place: getting to the idea that reframes the whole site, before a single pixel is committed to."
              />
              <div className="mt-9">
                <ButtonLink href="/about" tone="ghost">
                  How we work
                </ButtonLink>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {process.map((step, i) => (
              <Reveal
                key={step.step}
                as="li"
                delay={i * 70}
                className="group relative flex gap-6 border-t border-line py-8 last:border-b sm:gap-10"
              >
                <span className="tabular w-10 shrink-0 font-display text-sm font-bold text-sand-ink transition-colors duration-300 group-hover:text-spark">
                  {step.step}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 text-2xl text-ink sm:text-3xl">
                    {step.title}
                    {step.title === "Bingo" ? (
                      <Spark className="h-4 w-2.5" />
                    ) : null}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Proof                                                               */
/* ================================================================== */

function ProofSection() {
  const quote = projects.find((p) => p.quote)?.quote;

  return (
    <section className="bg-paper-2 py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>In their words</Eyebrow>
          <blockquote className="mt-8">
            <p className="font-serif text-[clamp(1.7rem,4.4vw,3.1rem)] leading-[1.12] text-ink">
              &ldquo;{quote?.text}&rdquo;
            </p>
            <footer className="mt-8 text-sm text-ink-soft">
              <cite className="font-sans font-semibold text-ink not-italic">
                {quote?.author}
              </cite>
              <span className="mx-2 text-sand-ink">—</span>
              {quote?.role}
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Pricing teaser                                                      */
/* ================================================================== */

function PricingTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="One monthly number. No surprise invoices."
          lead="Design, build, hosting, updates and search work in a single line item you can forecast. Cancel any month — we would rather earn it than lock it."
          align="center"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.slug} delay={i * 80}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  plan.featured
                    ? "border-spark bg-ink text-paper"
                    : "border-line bg-paper-2"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`text-2xl ${plan.featured ? "text-paper" : "text-ink"}`}
                  >
                    {plan.name}
                  </h3>
                  {plan.featured ? <Tag tone="spark">Most chosen</Tag> : null}
                </div>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    plan.featured ? "text-sand-soft" : "text-ink-soft"
                  }`}
                >
                  {plan.fit}
                </p>

                <p className="mt-7 flex items-baseline gap-1.5">
                  <span
                    className={`tabular font-display text-4xl font-extrabold tracking-[-0.05em] ${
                      plan.featured ? "text-paper" : "text-ink"
                    }`}
                  >
                    ${plan.monthly}
                  </span>
                  <span
                    className={`text-sm ${plan.featured ? "text-sand" : "text-ink-soft"}`}
                  >
                    /month
                  </span>
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-3">
                      <Spark className="mt-2 h-2 w-[0.35rem] shrink-0" />
                      <span
                        className={`text-sm leading-snug ${
                          plan.featured ? "text-sand-soft" : "text-ink-soft"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/pricing"
                  tone={plan.featured ? "spark" : "ghost"}
                  className="mt-8 w-full"
                >
                  What&apos;s included
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
