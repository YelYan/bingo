/**
 * Shape of SiteCheckr's action state. Kept out of `actions.ts` on purpose —
 * a `"use server"` module may only export async functions.
 */
export type SiteCheckrState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"url", string>>;
  values?: { url: string };
  report?: string;
};

export const initialSiteCheckrState: SiteCheckrState = { status: "idle" };
