import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SiteCheckrForm } from "@/components/sitecheckr-form";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "SiteCheckr — Free Website Audit",
  description:
    "Find out what's actually going on with your website. SiteCheckr scans your page directly and flags what's slowing you down, hurting your SEO, or just plain broken — in plain English.",
  alternates: { canonical: "/tools/sitecheckr" },
};

const checks = [
  {
    title: "Title & meta description",
    detail: "What Google actually shows for you in search results.",
  },
  {
    title: "Mobile & technical basics",
    detail: "Viewport tag, HTTPS, response speed — and whether you're accidentally hidden from search.",
  },
  {
    title: "Search & social signals",
    detail: "Heading structure, social preview tags, structured data, image alt text.",
  },
];

export default function SiteCheckrPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools · SiteCheckr"
        title={
          <>
            Find out what's
            <br /> actually going on.
          </>
        }
        lead="Enter your website URL — we fetch the page directly and check it against the same basics search engines and browsers do. No sign-up, nothing stored."
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
                  This reads your page's actual HTML when you submit — a
                  real check, not a template with your name dropped in.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <SiteCheckrForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Beyond the audit"
        title="Like what SiteCheckr found? Let's actually fix it."
        lead="The audit tells you what's going on. We're the team that handles it, so you don't have to."
        secondary={{ href: "/tools", label: "See the other free tools" }}
      />
    </>
  );
}
