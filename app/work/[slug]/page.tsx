import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { BrowserMockup } from "@/components/browser-mockup";
import { Reveal } from "@/components/reveal";
import { Arrow, ButtonLink, Container, Eyebrow, Tag } from "@/components/ui";
import { adjacentProjects, getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  return {
    title: `${project.name} — ${project.headline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.headline}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${site.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ---------------- masthead ---------------- */}
      <section className="vignette relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div aria-hidden="true" className="blueprint absolute inset-0" />
        <Container className="relative">
          <Link
            href="/work"
            className="link-wipe inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <Arrow className="rotate-180 group-hover:translate-x-0" />
            All work
          </Link>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
              <span className="tabular ml-1 text-xs tracking-[0.16em] text-sand-ink uppercase">
                {project.sector}
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-[clamp(2.4rem,6.4vw,4.8rem)] leading-[0.94] text-ink">
              {project.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {project.summary}
            </p>

            <div className="mt-8">
              <ButtonLink href={project.url}>Visit {project.domain}</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- screenshot ---------------- */}
      <Container>
        <Reveal>
          <div className="shadow-[0_40px_90px_-50px_rgba(36,39,44,0.45)]">
            <BrowserMockup
              domain={project.domain}
              screenshot={project.screenshot}
              alt={`${project.name} homepage`}
              priority
            />
          </div>
        </Reveal>
      </Container>

      {/* ---------------- highlights ---------------- */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow tone="spark">What it is</Eyebrow>
                <p className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.2] text-ink">
                  {project.summary}
                </p>

                <div className="mt-10 border-t border-line pt-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-spark-deep"
                  >
                    Open the live site
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>On the site</Eyebrow>
              <ol className="mt-8">
                {project.highlights.map((step, i) => (
                  <Reveal
                    key={step}
                    as="li"
                    delay={i * 60}
                    className="flex gap-6 border-t border-line py-7 last:border-b"
                  >
                    <span className="tabular w-8 shrink-0 font-display text-sm font-bold text-sand-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[1.0625rem] leading-relaxed text-ink">
                      {step}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- prev / next ---------------- */}
      <section className="border-t border-line">
        <Container className="grid gap-px sm:grid-cols-2">
          {[
            { label: "Previous", project: prev },
            { label: "Next", project: next },
          ].map(({ label, project: p }) =>
            p ? (
              <Link
                key={label}
                href={`/work/${p.slug}`}
                className="group flex flex-col justify-between gap-8 py-12 transition-colors duration-300 hover:bg-paper-2 sm:px-4"
              >
                <span className="text-[0.6875rem] font-semibold tracking-[0.22em] text-sand-ink uppercase">
                  {label}
                </span>
                <span className="flex items-end justify-between gap-6">
                  <span>
                    <span className="block text-xs tracking-[0.16em] text-ink-soft uppercase">
                      {p.sector}
                    </span>
                    <span className="mt-2 block font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.045em] text-ink transition-colors group-hover:text-spark-deep">
                      {p.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-spark group-hover:bg-spark group-hover:text-ink-2"
                  >
                    <Arrow />
                  </span>
                </span>
              </Link>
            ) : null,
          )}
        </Container>
      </section>

      <CtaBand
        eyebrow="Like what you see?"
        title="Your site could be the next one on this page."
        secondary={{ href: "/work", label: "See another site" }}
      />
    </>
  );
}
