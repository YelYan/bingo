import type { Metadata } from "next";
import { MartPage } from "./mart-page";

// The layout holds the English title and description. This adds the language pair so search
// engines list both pages.
export const metadata: Metadata = {
  alternates: {
    canonical: "/bingomart",
    languages: { en: "/bingomart", my: "/bingomart/my", "x-default": "/bingomart" },
  },
};

export default function BingoMartPage() {
  return <MartPage lang="en" />;
}
