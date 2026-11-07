import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "../../feature-page";
import { featureCopy, featureSlugs, type Slug } from "../../features";

export const dynamicParams = false;

export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

const isSlug = (s: string): s is Slug => (featureSlugs as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const f = featureCopy.en.items[slug];
  const title = `${f.name}: ${f.title.join(" ")}`;
  return {
    // The layout template adds "· BingoMart".
    title: f.name,
    description: f.description,
    alternates: {
      canonical: `/bingomart/features/${slug}`,
      languages: {
        en: `/bingomart/features/${slug}`,
        my: `/bingomart/my/features/${slug}`,
        "x-default": `/bingomart/features/${slug}`,
      },
    },
    openGraph: { url: `/bingomart/features/${slug}`, title, description: f.description },
  };
}

export default async function FeatureRoute({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  return <FeaturePage lang="en" slug={slug} />;
}
