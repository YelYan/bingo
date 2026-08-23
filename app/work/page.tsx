import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { WorkGrid } from "@/components/work-grid";
import { Container } from "@/components/ui";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Web Design Portfolio & Case Studies",
  description:
    "Six real, live sites from Bingo — hand-coded websites you can click through and visit yourself.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Six sites,
            <br /> live right now.
          </>
        }
        lead="No mockups, no renders — real screenshots of sites we've shipped and clients are using today. Click through to any of them."
        aside={
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {[
              { v: `${projects.length}`, l: "Live sites" },
              { v: "100%", l: "In production" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="tabular block font-display text-2xl font-bold tracking-[-0.05em] text-ink">
                    {s.v}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-ink-soft">
                    {s.l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <WorkGrid projects={projects} />
        </Container>
      </section>

      <CtaBand
        eyebrow="Your turn"
        title="What would your site look like?"
        lead="We only show sites we're happy for you to click through to. If that's the kind of proof you want before you commit, start here."
        secondary={{ href: "/tools", label: "Try a free tool first" }}
      />
    </>
  );
}
