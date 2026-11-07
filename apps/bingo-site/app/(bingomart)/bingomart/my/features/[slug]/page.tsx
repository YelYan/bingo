import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "../../../feature-page";
import { featureCopy, featureSlugs, type Slug } from "../../../features";

export const dynamicParams = false;

export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

const isSlug = (s: string): s is Slug => (featureSlugs as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const f = featureCopy.my.items[slug];
  const title = `${f.name}: ${f.title.join(" ")}`;
  return {
    title: { absolute: `${f.name} · BingoMart` },
    description: f.description,
    alternates: {
      canonical: `/bingomart/my/features/${slug}`,
      languages: {
        en: `/bingomart/features/${slug}`,
        my: `/bingomart/my/features/${slug}`,
        "x-default": `/bingomart/features/${slug}`,
      },
    },
    openGraph: { url: `/bingomart/my/features/${slug}`, title, description: f.description, locale: "my_MM" },
  };
}

export default async function BurmeseFeatureRoute({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  return <FeaturePage lang="my" slug={slug} />;
}
