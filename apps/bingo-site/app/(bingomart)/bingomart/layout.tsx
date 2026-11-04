import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, Noto_Sans_Myanmar } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  display: "swap",
  variable: "--font-noto-myanmar",
  weight: ["400", "600"],
});

const title = "BingoMart: online shop for Myanmar sellers";
const description =
  "Sell, get paid and deliver from one place. BingoMart is the online shop for Myanmar sellers who take orders through chat. In development, early access open.";

export const metadata: Metadata = {
  // absolute: the parent's "· Bingo" template must not reach this brand.
  title: { absolute: title, template: "%s · BingoMart" },
  description,
  alternates: { canonical: "/bingomart" },
  openGraph: {
    type: "website",
    url: "/bingomart",
    siteName: "BingoMart",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0f3d38" };

export default function BingoMartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`mart ${dmSans.variable} ${inter.variable} ${notoMyanmar.variable}`}
    >
      {children}
    </div>
  );
}
