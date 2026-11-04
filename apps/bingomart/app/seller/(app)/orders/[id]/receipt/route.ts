import { NextResponse } from "next/server";
import { API_URL, sessionToken } from "@/lib/api";

const UUID = /^[0-9a-f-]{36}$/i;

/** Receipts carry names and account numbers, so they pass only through the seller's own session. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await sessionToken();
  if (!token || !UUID.test(id)) return new NextResponse(null, { status: 404 });

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
