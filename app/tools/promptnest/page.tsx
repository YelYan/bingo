import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { PromptNestForm } from "@/components/promptnest-form";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "PromptNest — Free Website Prompt Generator",
  description:
    "Never stare at a blank screen again. Answer a few quick questions about your business and get a ready-to-use prompt for building your site with AI.",
  alternates: { canonical: "/tools/promptnest" },
};

const steps = [
  {
    title: "Answer a few questions",
    detail: "What you do, who it's for, and what makes you different.",
  },
  {
    title: "Get a ready-to-use prompt",
    detail: "Generated instantly — no AI call, no wait.",
  },
  {
    title: "Paste it into your AI tool of choice",
    detail: "Claude, ChatGPT, or whatever you're already using to build.",
  },
];

export default function PromptNestPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools · PromptNest"
        title={
          <>
            Never stare at
            <br /> a blank screen again.
          </>
        }
        lead="You know your business better than any AI tool does — you just don't always know how to explain it. Answer a few quick questions and we'll turn it into a prompt that actually gets you somewhere."
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>How it works</Eyebrow>
                <ol className="mt-6 space-y-6">
                  {steps.map((s, i) => (
                    <Reveal
                      key={s.title}
                      delay={i * 70}
                      className="flex gap-5 border-t border-line pt-5"
                    >
                      <span className="tabular w-6 shrink-0 font-display text-sm font-bold text-sand-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-lg text-ink">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {s.detail}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <PromptNestForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Rather not DIY?"
        title="We can just build it for you."
        lead="If the prompt route sounds like more work than you want, tell us the same three things and we'll take it from there."
        secondary={{ href: "/tools", label: "See the other free tools" }}
      />
    </>
  );
}
