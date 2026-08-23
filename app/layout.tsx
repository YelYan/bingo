import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CursorSpark } from "@/components/cursor-spark";
import { site } from "@/lib/site";
import "./globals.css";

/* Display: a grotesque with actual personality in the curves — it echoes the
   rounded geometry of the mark without imitating it. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["400", "600", "700", "800"],
});

/* Body: neutral, slightly technical, gets out of the way. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

/* Accent: one italic serif, used sparingly, for the word that matters. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web design studio",
    "website design",
    "local SEO",
    "AI social media scheduling",
    "website care and support",
    "AI solutions for business",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    // Object-based metadata merges down the layout tree, so every page that
    // doesn't set its own `openGraph.images` inherits this one. The file
    // itself (app/opengraph-image.tsx) renders once at build time.
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#16181c" },
  ],
  colorScheme: "light",
};

/* Structured data — a studio that sells SEO ought to mark itself up properly. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  priceRange: "$$",
  areaServed: "Worldwide",
  knowsAbout: [
    "Web design",
    "Web development",
    "Local SEO",
    "AI social media scheduling",
    "Website care and support",
    "AI solutions",
  ],
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${archivo.variable} ${instrument.variable}`}
    >
      <body className="grain min-h-screen antialiased">
        {/* Runs before any reveal target parses. Only with this attribute set
            does the scroll-reveal CSS hide anything — no JS, no hidden text. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorSpark />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
