import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { HeroGrid } from "@/components/hero-grid";
import { ProjectCard } from "@/components/project-card";
import { FlagshipSpotlight, ProductGrid } from "@/components/product-tile";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  SectionHeading,
} from "@/components/ui";
import { flagship, products } from "@/lib/products";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlagshipSpotlight />

      <section id="products" className="py-24 sm:py-32">
        <Container>
          <SectionHeading title="Available from Bingo today" />
          <div className="mt-14">
            <ProductGrid />
          </div>
        </Container>
      </section>

      <WorkSection />

      <CtaBand
        eyebrow="Talk to us"
        title="Not sure which product you need?"
        lead="Tell us about your business and what is getting in the way. You'll get a reply from a person who has read it."
        primary={{ href: "/contact", label: "Talk to us" }}
        secondary={{ href: "/products", label: "See all products" }}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="vignette relative flex items-center overflow-hidden pt-32 pb-20 lg:min-h-[88svh] lg:pt-28">
      <HeroGrid />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-[clamp(2.75rem,6.4vw,5.25rem)] text-ink">
                One company. Every tool your business needs{" "}
                <span className="text-spark">online</span>.
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                Bingo makes products for small businesses: an online shop for
                Myanmar sellers, websites built by our studio, and free tools
                that show how you appear online.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/products" tone="ink">
                  Explore products
                </ButtonLink>
                <ButtonLink href={flagship.href} tone="ghost">
                  See {flagship.name}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <ul
              data-grid-avoid
              className="grid grid-cols-3 gap-2.5 sm:gap-3"
              aria-label="Bingo products"
            >
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={product.href}
                    className={`flex aspect-square flex-col justify-between rounded-[1.25rem] p-3 transition-transform duration-300 ease-out-expo hover:-translate-y-1 sm:p-4 ${product.tile}`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em]"
                    >
                      {product.letters}
                    </span>
                    <span className="text-[0.75rem] leading-tight font-semibold sm:text-[0.8125rem]">
                      {product.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="flex aspect-square items-end rounded-[1.25rem] border-2 border-dashed border-sand p-3 text-[0.75rem] leading-tight font-semibold text-sand-ink sm:p-4 sm:text-[0.8125rem]">
                Next product
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="bg-paper-2 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Bingo Studio"
            title="Real sites, built by our studio"
          />
          <ButtonLink href="/work" tone="ghost">
            All projects
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}
