import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.legalName} handles the small amount of data this site collects.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    h: "What this site collects",
    p: "Only what you type into the contact form: your name, email address, optional company, the services you tick, a rough budget band and your message. Nothing else is captured, and there is no third-party tracking pixel on any page.",
  },
  {
    h: "Analytics",
    p: "We use privacy-respecting, cookie-free analytics that records page views and referrers in aggregate. It does not set cookies, does not fingerprint your device and cannot identify you individually — which is why this site has no cookie banner to dismiss.",
  },
  {
    h: "How we use it",
    p: "To reply to you, and to keep a record of the conversation while a project is live. We do not sell it, rent it, or add you to a mailing list you did not ask for. No automated drip sequence will follow this form.",
  },
  {
    h: "How long we keep it",
    p: "Enquiries that do not turn into projects are deleted after twelve months. Project correspondence is kept for the duration of the engagement plus the period our accountants require, then removed.",
  },
  {
    h: "Your rights",
    p: `Ask us for a copy of what we hold, a correction, or complete deletion, and it will be done within thirty days. One email to ${site.email} is enough — no form, no verification hoops beyond confirming it is really you.`,
  },
  {
    h: "Changes",
    p: "If this policy changes materially we will note the date at the top of this page rather than quietly editing it.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy, briefly."
        lead="Short because there is genuinely not much to say. This is a portfolio site with a contact form, not a data business."
      />

      <section className="pb-24 sm:pb-32">
        <Container size="narrow">
          <div className="border-t border-line">
            {sections.map((s) => (
              <div key={s.h} className="border-b border-line py-8">
                <h2 className="text-2xl text-ink">{s.h}</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {s.p}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-sand-ink">
            Last reviewed {new Date().getFullYear()}. Questions to{" "}
            <a href={`mailto:${site.email}`} className="link-wipe text-ink-soft">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
