import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Website Tools",
  description:
    "Free tools from Bingo — PromptNest, SiteCheckr, and RankView. Generate prompts, audit your website, and check your local search visibility, free.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        title={
          <>
            Free tools.
            <br /> No strings attached.
          </>
        }
        lead="Three small tools we built to make your life easier, whether or not you ever work with us. No sign-up walls, no bait and switch."
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <Reveal key={tool.slug} delay={i * 90}>
                <div
                  id={tool.slug}
                  className="flex h-full flex-col rounded-2xl border border-line bg-paper-2 p-7 sm:p-8"
                >
                  <Eyebrow>{tool.name}</Eyebrow>
                  <p className="mt-5 font-serif text-xl leading-snug text-ink">
                    {tool.tagline}
                  </p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {tool.whatItDoes}
                  </p>

                  <div className="mt-6 border-t border-line pt-5">
                    <h2 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase">
                      Who it's for
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tool.whoFor}
                    </p>
                  </div>

                  <div className="mt-6 flex-1 border-t border-line pt-5">
                    <h2 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase">
                      How to use it
                    </h2>
                    <ol className="mt-3 space-y-3">
                      {tool.steps.map((step, idx) => (
                        <li key={step} className="flex gap-3">
                          <span className="tabular mt-0.5 font-display text-xs font-bold text-spark-deep">
                            {idx + 1}
                          </span>
                          <span className="text-sm leading-relaxed text-ink">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <ButtonLink
                    href={tool.href ?? "/contact"}
                    tone="ink"
                    className="mt-8 w-full"
                  >
                    {tool.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Beyond the tools"
        title="Like what the tools found? Let's actually fix it."
        lead="The free tools tell you what's going on. We're the team that handles it, so you don't have to."
        secondary={{ href: "/services", label: "See our services" }}
      />
    </>
  );
}
