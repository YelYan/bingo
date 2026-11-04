import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { process } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Let's build something worth bragging about. Tell Bingo about your business and we'll take it from there — one reply from one person, usually within a business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s Build Something
            <br /> Worth Bragging About.
          </>
        }
        lead="Tell us a bit about your business — we'll take it from there."
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
                    className="link-wipe mt-4 flex min-h-11 items-center font-display text-[clamp(1.4rem,3vw,1.9rem)] font-bold tracking-[-0.04em] text-ink"
                  >
                    {/* break-words (overflow-wrap) only changes how text renders
                        within a box of a given width -- it doesn't shrink the
                        box's own min-content contribution to the layout, so an
                        unbroken email can still force an ancestor wider than the
                        viewport even while wrapping correctly inside itself.
                        break-all (word-break) actually reduces min-content, so
                        the ancestor never inflates in the first place. */}
                    <span className="min-w-0 break-all">{site.email}</span>
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
                      "A real reply within one business day, with our first read on your project.",
                      "A quick call if it looks like a fit — we'll say so plainly if it doesn't.",
                      "A clear plan and timeline before you commit to anything.",
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
