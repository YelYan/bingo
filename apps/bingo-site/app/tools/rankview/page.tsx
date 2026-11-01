import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { RankViewForm } from "@/components/rankview-form";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "RankView — Free Local Visibility Report",
  description:
    "See how visible your business actually is. RankView searches Google, your Business Profile and social platforms live, then hands you a plain-English report — no 24-hour wait.",
  alternates: { canonical: "/tools/rankview" },
};

const checks = [
  {
    title: "Google search",
    detail: "Do you actually show up for your own name and main service?",
  },
  {
    title: "Google Business Profile",
    detail: "Does it exist, and what does it say about you — reviews, rating, activity?",
  },
  {
    title: "Social presence",
    detail: "Can someone find and recognise you on at least one platform?",
  },
];

export default function RankViewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools · RankView"
        title={
          <>
            See how visible
            <br /> your business actually is.
          </>
        }
        lead="Enter your business name and where you're based — we search for you live and hand back what we find. No form that sits in an inbox for a day, no sales call required first."
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>What we check</Eyebrow>
                <ul className="mt-6 space-y-6">
                  {checks.map((c, i) => (
                    <Reveal
                      key={c.title}
                      delay={i * 70}
                      className="border-t border-line pt-5"
                    >
                      <h3 className="text-lg text-ink">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {c.detail}
                      </p>
                    </Reveal>
                  ))}
                </ul>
                <p className="mt-8 text-sm leading-relaxed text-ink-soft">
                  This runs a real, live web search on your business — results
                  reflect what's actually findable right now, not a canned
                  template.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <RankViewForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Beyond the report"
        title="Like what RankView found? Let's actually fix it."
        lead="The report tells you what's going on. We're the team that handles it, so you don't have to."
        secondary={{ href: "/tools", label: "See the other free tools" }}
      />
    </>
  );
}
