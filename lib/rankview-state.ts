/**
 * Shape of RankView's action state. Kept out of `actions.ts` on purpose —
 * a `"use server"` module may only export async functions.
 */
export type RankViewState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"businessName" | "location", string>>;
  values?: { businessName: string; location: string };
  report?: string;
};

export const initialRankViewState: RankViewState = { status: "idle" };
