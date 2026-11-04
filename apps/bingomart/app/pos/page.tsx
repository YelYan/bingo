import type { Metadata } from "next";
import { PosClient } from "./pos-client";

export const metadata: Metadata = { title: "POS", robots: { index: false } };

export default function PosPage() {
  return <PosClient />;
}
