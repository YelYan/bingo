import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { process } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Bingo what isn't landing on your current site. One reply from one person, usually within a business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Start with the
            <br /> thing that annoys you.
          </>
        }
        lead="Not a brief, not a spec. Just the part of your website, brand or search presence that keeps bothering you. That is almost always the right place to begin."
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={100} className="lg:sticky lg:top-32">
                <div className="rounded-2xl border border-line bg-paper-2 p-7 sm:p-8">
                  <h2 className="text-[0.6875rem] font-semibold tracking-[0.22em] text-sand-ink uppercase">
                    Or, directly
                  </h2>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-wipe mt-4 flex min-h-11 w-fit items-center font-display text-[clamp(1.4rem,3vw,1.9rem)] font-bold tracking-[-0.04em] text-ink"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="link-wipe flex min-h-11 w-fit items-center text-[1.0625rem] text-ink-soft"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
                    {site.location}. We answer on weekdays, in the order things
                    arrive — no chatbot, no ticket number.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-ink p-7 text-paper sm:p-8">
                  <h2 className="text-[0.6875rem] font-semibold tracking-[0.22em] text-sand uppercase">
                    What happens next
                  </h2>
                  <ol className="mt-6 space-y-5">
                    {[
                      "A real reply within one business day, with our first read on your problem.",
                      "A 30-minute call if it looks like a fit — we will say so plainly if it doesn't.",
                      "A written scope with a fixed date and a fixed number before you commit anything.",
                    ].map((line, i) => (
                      <li key={line} className="flex gap-4">
                        <span className="tabular mt-0.5 font-display text-xs font-bold text-spark-lift">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-sand-soft">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-8">
                  <h2 className="flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.22em] text-sand-ink uppercase">
                    <Spark className="h-2.5 w-[0.4rem]" />
                    Then the method
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2 text-sm text-ink-soft">
                    {process.map((p, i) => (
                      <li key={p.step} className="flex items-center gap-2">
                        <span>{p.title}</span>
                        {i < process.length - 1 ? (
                          <span aria-hidden="true" className="text-sand-ink">
                            →
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
