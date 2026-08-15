import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { PageHeader } from "@/components/page-header";
import { PricingTable } from "@/components/pricing-table";
import { Reveal } from "@/components/reveal";
import { Spark } from "@/components/logo";
import { Container, SectionHeading } from "@/components/ui";
import { addOns, everyPlan, faqs, plans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Design, build, hosting, updates and SEO in one predictable monthly figure. Three plans from $279/month, no setup fee, cancel any month.",
  alternates: { canonical: "/pricing" },
};

/* FAQ schema — the rich result is free, and we sell SEO. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Bingo Web Design Studio plans",
  itemListElement: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.monthly,
    priceCurrency: "USD",
    description: p.fit,
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />

      <PageHeader
        eyebrow="Plans & pricing"
        title={
          <>
            One number a month.
            <br /> Everything in it.
          </>
        }
        lead="Design, code, hosting, security, content updates and search work, folded into a single line you can budget for. No setup fee, no annual lock-in, and no invoice you did not see coming."
      />

      <section className="pb-24 sm:pb-28">
        <Container>
          <PricingTable />
        </Container>
      </section>

      {/* --------- every plan includes --------- */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Every plan"
            title="Six things we refuse to charge extra for."
            align="center"
          />

          <ul className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {everyPlan.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={i * 60}
                className="border-t border-line py-7 sm:pr-8"
              >
                <Spark className="h-2.5 w-[0.4rem]" />
                <h3 className="mt-4 text-xl text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* --------- add-ons --------- */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Add-ons"
                title="Bolt on only what you need."
                lead="Priced separately because most clients never need them — and padding everyone's plan to cover the few who do is how agencies end up expensive for no reason."
              />
            </div>

            <div className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Optional add-ons and their prices
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    <th
                      scope="col"
                      className="pb-3 text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase"
                    >
                      Add-on
                    </th>
                    <th
                      scope="col"
                      className="pb-3 text-right text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {addOns.map((a) => (
                    <tr key={a.name} className="border-b border-line">
                      <td className="py-5 pr-6 text-[1.0625rem] text-ink">
                        {a.name}
                      </td>
                      <td className="tabular py-5 text-right font-display font-bold whitespace-nowrap text-spark-deep">
                        {a.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* --------- faq --------- */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Questions"
                  title="The ones people actually ask."
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <Faq items={faqs} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Still deciding"
        title="We'll tell you if you don't need us."
        lead="Send us your current site. If a two-hour fix would solve your problem, we will say so and point you at it — that costs us one project and earns us the next five."
        primary={{ href: "/contact", label: "Get a straight answer" }}
        secondary={{ href: "/work", label: "See the results" }}
      />
    </>
  );
}
