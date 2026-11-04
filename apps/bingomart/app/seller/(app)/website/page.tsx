import type { Metadata } from "next";
import { BuilderClient } from "./builder-client";

export const metadata: Metadata = { title: "ဝက်ဘ်ဆိုက်" };

export default function WebsitePage() {
  return <BuilderClient />;
}
