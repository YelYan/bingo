import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { WorkGrid } from "@/components/work-grid";
import { Container } from "@/components/ui";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Six case studies from Bingo — hand-coded websites, brand systems and SEO programmes, with the numbers that came out the other side.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Six projects,
            <br /> and what actually changed.
          </>
        }
        lead="Every case below leads with the uncomfortable finding from discovery — the thing the client did not want to hear — because that is usually where the result came from."
        aside={
          <dl className="grid grid-cols-3 gap-6 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {[
              { v: `${projects.length}`, l: "Cases published" },
              { v: "3", l: "Disciplines" },
              { v: "2023–25", l: "Span" },
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
        title="What would your case study say?"
        lead="We only take on work we would be happy to publish. If that sounds like the kind of pressure you want on your side, start here."
        secondary={{ href: "/pricing", label: "See what it costs" }}
      />
    </>
  );
}
