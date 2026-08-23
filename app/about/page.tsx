import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { WindowFrame } from "@/components/window-frame";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { process } from "@/lib/services";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Web Design Studio",
  description:
    "Bingo is a small, remote-first web design studio. Here is how we work, what we believe, and who you will actually be talking to.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Say the uncomfortable thing in week one",
    detail:
      "Discovery is worthless if we only report back what flatters the brief. If your navigation is the problem, or your pricing is, you will hear it early — while it is still cheap to fix.",
  },
  {
    title: "Design in the browser, not in a deck",
    detail:
      "Static mockups hide the things that break: long names, empty states, slow networks, thumbs. We move to real code fast so what you approve is what you get.",
  },
  {
    title: "Ship less, finish it properly",
    detail:
      "A site with six considered pages beats one with thirty half-written ones. We would rather cut scope than launch something we would quietly leave off this portfolio.",
  },
  {
    title: "Hand over everything",
    detail:
      "Repo, domain, analytics, brand files, documentation. Lock-in is a business model, not a service. If you outgrow us, we want the handover to be boring.",
  },
];

const team = [
  {
    name: "Naomi Adeyemi",
    role: "Founder, design direction",
    line: "Fifteen years between an editorial desk and a product team. Writes the sentence the site has to land.",
  },
  {
    name: "Kwesi Boateng",
    role: "Engineering lead",
    line: "Cares more about Interaction to Next Paint than anyone should. Builds the thing you approved, exactly.",
  },
  {
    name: "Petra Lindqvist",
    role: "Search & content",
    line: "Reads crawl logs for fun. Turns intake calls into the questions your buyers are already typing.",
  },
  {
    name: "Rafael Ortiz",
    role: "Brand systems",
    line: "Type, colour and the rules that stop both from drifting once fifty people touch them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title={
          <>
            Small on purpose.
            <br /> Named after a feeling.
          </>
        }
        lead={
          <>
            <em className="font-serif text-ink not-italic">Bingo</em> is the
            noise someone makes when a thing finally clicks. That moment is the
            entire product — everything we design, code and publish is in
            service of getting a stranger there faster.
          </>
        }
        aside={
          <WindowFrame label="studio.txt" bodyClassName="p-6">
            <p className="font-serif text-lg leading-snug text-ink">
              &ldquo;A website is not a brochure. It is the only employee that
              works every hour, in every timezone, and never gets tired of
              explaining what you do.&rdquo;
            </p>
            <p className="mt-4 text-xs tracking-[0.16em] text-sand-ink uppercase">
              — Pinned above the desk since {site.founded}
            </p>
          </WindowFrame>
        }
      />

      {/* --------- numbers --------- */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <dl className="grid gap-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="tabular block font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-extrabold tracking-[-0.055em] text-ink">
                    {s.value}
                  </span>
                  <span className="mt-3 block max-w-[14rem] text-sm leading-snug text-ink-soft">
                    {s.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* --------- principles --------- */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="How we work"
                  title="Four rules we don't bend."
                  lead="They cost us work occasionally. They are also why clients stay past the launch."
                />
              </div>
            </div>

            <ol className="lg:col-span-8">
              {principles.map((p, i) => (
                <Reveal
                  key={p.title}
                  as="li"
                  delay={i * 70}
                  className="flex gap-6 border-t border-line py-8 last:border-b sm:gap-10"
                >
                  <span className="tabular w-8 shrink-0 font-display text-sm font-bold text-sand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
                      {p.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* --------- method --------- */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The method"
            title="Dig, angle, bingo, sharpen."
            lead="Four steps that run on every engagement, whether it is a six-page site or a six-location brand system."
          />

          <ol className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal
                key={step.step}
                as="li"
                delay={i * 70}
                className="border-t border-line pt-7 sm:pr-8"
              >
                <span className="tabular font-display text-sm font-bold text-sand-ink">
                  {step.step}
                </span>
                <h3 className="mt-3 text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* --------- people --------- */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <Container>
          <Eyebrow tone="paper">Who you'll talk to</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.1rem,5.2vw,3.9rem)] text-paper">
            Four people. No account layer in between.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-soft">
            The people in the pitch are the people doing the work. That is the
            main advantage of staying this size, and we intend to keep it.
          </p>

          <ul className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, i) => (
              <Reveal
                key={person.name}
                as="li"
                delay={i * 70}
                className="border-t border-line-dark pt-7 sm:pr-8"
              >
                <Spark className="h-2.5 w-[0.4rem]" />
                <h3 className="mt-4 text-xl text-paper">{person.name}</h3>
                <p className="mt-1.5 text-xs tracking-[0.14em] text-spark-lift uppercase">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-sand-soft">
                  {person.line}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        eyebrow="Working together"
        title="We take on eight projects a year."
        lead="That is the honest capacity of four people who refuse to subcontract the interesting parts. If the timing works, we would like to hear what you are building."
        secondary={{ href: "/services", label: "See our services" }}
      />
    </>
  );
}
