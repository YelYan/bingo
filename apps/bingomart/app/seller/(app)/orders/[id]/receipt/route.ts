import { NextResponse } from "next/server";
import { API_URL, isMock, sessionToken } from "@/lib/api";
import { RECEIPT_SVG } from "@/lib/mock/api";

const UUID = /^[0-9a-f-]{36}$/i;

/** Receipts carry names and account numbers, so they pass only through the seller's own session. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) return new NextResponse(null, { status: 404 });

  if (isMock) {
    return new NextResponse(RECEIPT_SVG, {
      headers: { "Content-Type": "image/svg+xml", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'", "Cache-Control": "private, no-store" },
    });
  }

  const token = await sessionToken();
  if (!token) return new NextResponse(null, { status: 404 });
  const res = await fetch(`${API_URL}/seller/orders/${id}/receipt`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return new NextResponse(null, { status: res.status });
  return new NextResponse(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
