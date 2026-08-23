/**
 * Shape of the contact form's action state.
 *
 * Kept out of `actions.ts` on purpose: a `"use server"` module may only
 * export async functions, so a plain object like `initialContactState`
 * living there throws at request time even though the build succeeds.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "brief", string>>;
  values?: {
    name: string;
    email: string;
    company: string;
    siteUrl: string;
    brief: string;
  };
};

export const initialContactState: ContactState = { status: "idle" };
