/**
 * Shape of PromptNest's action state. Kept out of `actions.ts` on purpose —
 * a `"use server"` module may only export async functions.
 */
export type PromptNestState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<"businessName" | "services" | "description", string>
  >;
  values?: {
    businessName: string;
    services: string;
    description: string;
    location: string;
    websiteUrl: string;
    colors: string;
    phone: string;
    email: string;
  };
  prompt?: string;
};

export const initialPromptNestState: PromptNestState = { status: "idle" };
