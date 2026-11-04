import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { FlagshipSpotlight, ProductGrid } from "@/components/product-tile";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every Bingo product in one place: BingoMart, Bingo Studio, SiteCheckr, RankView and PromptNest.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Everything Bingo makes."
        lead="Start with the one you need. They all come from the same team."
      />
      <FlagshipSpotlight />
      <section className="py-24 sm:py-32">
        <Container>
          <ProductGrid />
        </Container>
      </section>
      <CtaBand
        eyebrow="Talk to us"
        title="Not sure which product you need?"
        lead="Tell us about your business and what is getting in the way. You'll get a reply from a person who has read it."
        primary={{ href: "/contact", label: "Talk to us" }}
        secondary={{ href: "/work", label: "See our work" }}
      />
    </>
  );
}
