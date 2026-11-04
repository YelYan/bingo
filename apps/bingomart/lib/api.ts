import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL ?? "http://127.0.0.1:4000";
const SESSION_COOKIE = "bm_session";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; code: string };

/** Talks to the API from the server only, so the session token never reaches browser JavaScript. */
export async function api<T = any>(
  path: string,
  options: { method?: string; body?: unknown; form?: FormData; seller?: boolean } = {},
): Promise<ApiResult<T>> {
  const token = options.seller ? (await cookies()).get(SESSION_COOKIE)?.value : undefined;
  let res: Response;
  try {
    res = await fetch(API_URL + path, {
      method: options.method ?? (options.body || options.form ? "POST" : "GET"),
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.form ?? (options.body ? JSON.stringify(options.body) : undefined),
      cache: "no-store",
    });
  } catch (err) {
    console.error(`API unreachable at ${API_URL}${path}:`, err);
    return { ok: false, status: 503, code: "API_DOWN" };
  }
  const json = await res.json().catch(() => null);
  if (!res.ok) return { ok: false, status: res.status, code: res.status === 413 ? "FILE_TOO_BIG" : (json?.code ?? "UNKNOWN") };
  return { ok: true, data: json as T };
}

/** For back-office pages: a missing or expired session goes to sign-in. */
export async function sellerApi<T = any>(path: string): Promise<T> {
  const result = await api<T>(path, { seller: true });
  if (result.ok) return result.data;
  if (result.status === 401) redirect("/seller/login");
  throw new Error(`API ${path} failed: ${result.code}`);
}

export async function startSession(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function sessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export { API_URL };
