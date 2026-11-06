import type { Metadata } from "next";
import { copy } from "../copy";
import { MartPage } from "../mart-page";

const { title, description } = copy.my.meta;

export const metadata: Metadata = {
  // absolute: the layout's "· BingoMart" template must not be added to a title that already says it.
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/bingomart/my",
    languages: { en: "/bingomart", my: "/bingomart/my", "x-default": "/bingomart" },
  },
  openGraph: { url: "/bingomart/my", title, description, locale: "my_MM", alternateLocale: ["en_US"] },
  twitter: { title, description },
};

export default function BingoMartBurmesePage() {
  return <MartPage lang="my" />;
}
