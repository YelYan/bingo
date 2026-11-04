import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans", weight: ["500", "700"] });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  display: "swap",
  variable: "--font-noto-myanmar",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "BingoMart", template: "%s · BingoMart" },
  description: "မြန်မာ အွန်လိုင်းဆိုင်များအတွက် အော်ဒါ၊ ငွေပေးချေမှုနှင့် ပို့ဆောင်ရေးကို တစ်နေရာတည်းမှာ စီမံပါ။",
};

export const viewport: Viewport = { themeColor: "#0e3d35" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="my" className={`${dmSans.variable} ${inter.variable} ${notoMyanmar.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
