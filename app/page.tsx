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
} from "@/components/ui";
import { projects } from "@/lib/projects";
import { process, services } from "@/lib/services";
import { site, stats } from "@/lib/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <TickerStrip />
      <ServicesSection />
      <WhyUsSection />
      <WorkSection featured={featured} />
      <ProcessSection />
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
                Built to look good.
                <br />
                Built to get found.
                <br />
                Built to <span className="text-spark">grow</span>.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                From websites to local SEO to AI-powered social media, we
                build the digital stuff that actually moves your business
                forward.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" tone="ink">
                  Let&apos;s Build Something
                </ButtonLink>
                <ButtonLink href="/tools" tone="ghost">
                  Check My Website
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
                label="bingowebstudio.com"
                className="shadow-[0_36px_80px_-40px_rgba(36,39,44,0.4)]"
                bodyClassName="bg-white/60 p-6 sm:p-8"
              >
                <p className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1] font-extrabold tracking-[-0.05em] text-ink">
                  One team.
                  <br />
                  Every service.
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
          "Web Design & Development",
          "Local SEO",
          "AI Social Scheduling",
          "Website Care & Support",
          "AI Solutions",
          "No Guesswork",
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
              Everything your business
              <br className="hidden sm:block" /> needs online.
            </>
          }
          lead="Most agencies sell one thing and outsource the rest. We keep design, SEO, social, care, and AI in the same building, because a great website with no visibility and a visible site nobody maintains are the same problem wearing different clothes."
        />

        <div className="mt-16 border-t border-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70}>
              <Link
                href={`/services#${service.slug}`}
                className="group grid gap-6 border-b border-line py-10 transition-colors duration-300 hover:bg-paper-2/60 sm:py-12 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-start gap-5 lg:col-span-4">
                  <span className="tabular mt-2 font-display text-sm font-bold text-sand-ink">
                    {service.index}
                  </span>
                  <h3 className="text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink transition-colors duration-300 group-hover:text-spark-deep">
                    {service.title}
                  </h3>
                </div>

                <div className="lg:col-span-6">
                  <p className="max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-end lg:col-span-2">
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
/* Why us                                                              */
/* ================================================================== */

const whyUs = [
  {
    title: "Everything under one roof",
    detail:
      "Website, SEO, social, support. No juggling five different freelancers who don't talk to each other.",
  },
  {
    title: "Built on your content, not templates",
    detail:
      "Your site, your voice. We use what makes your business unique instead of copy-pasting a theme.",
  },
  {
    title: "We stick around after launch",
    detail:
      "Websites break, algorithms change, businesses grow. We're here for all of it, not just the handoff.",
  },
  {
    title: "Real strategy, not guesswork",
    detail:
      "Every decision, from design to SEO to social, is based on what actually works for your business, not trends.",
  },
];

function WhyUsSection() {
  return (
    <section className="bg-paper-2 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why us"
          title="Why Businesses Choose Us"
          lead="We're not just another agency. We're the team that actually gets it done, and keeps it running."
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
          {whyUs.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 70}
              className="border-t border-line pt-7"
            >
              <Spark className="h-2.5 w-[0.4rem]" />
              <h3 className="mt-4 text-xl text-ink">{reason.title}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
                {reason.detail}
              </p>
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
    <section className="py-24 sm:py-32">
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
    <section className="bg-paper-2 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="How we work"
                title="How We Work"
                lead="No mystery process diagram. Just four steps that take you from 'I should really sort my website out' to actually done."
              />
              <div className="mt-9">
                <ButtonLink href="/about" tone="ghost">
                  Meet the studio
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
                  <h3 className="text-2xl text-ink sm:text-3xl">{step.title}</h3>
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

