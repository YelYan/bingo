import { BadRequestException } from "@nestjs/common";
import { z } from "zod";

/** Validates a request body; the error names the bad fields so the app can show them. */
export function parse<S extends z.ZodType>(schema: S, body: unknown): z.infer<S> {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new BadRequestException({
      code: "INVALID_INPUT",
      fields: [...new Set(result.error.issues.map((i) => i.path.join(".")))],
    });
  }
  return result.data;
}

const BURMESE_ZERO = 0x1040;

/** Accepts Burmese digits and +95 forms, and stores one form: 09xxxxxxxxx. */
export function normalizePhone(raw: string): string | null {
  const digits = raw
    .replace(/[၀-၉]/g, (d) => String(d.charCodeAt(0) - BURMESE_ZERO))
    .replace(/[\s()-]/g, "")
    .replace(/^\+?959/, "09");
  return /^09\d{7,9}$/.test(digits) ? digits : null;
}

export const phone = z.string().transform((value, ctx) => {
  const normalized = normalizePhone(value);
  if (!normalized) {
    ctx.addIssue({ code: "custom", message: "Not a Myanmar mobile number" });
    return z.NEVER;
  }
  return normalized;
});

export const mmk = z.number().int().min(0).max(1_000_000_000);
