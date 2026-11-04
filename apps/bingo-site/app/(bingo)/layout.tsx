import { CursorSpark } from "@/components/cursor-spark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** The parent brand's chrome. Products with their own brand live outside this group. */
export default function BingoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grain">
      <CursorSpark />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
