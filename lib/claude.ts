import Anthropic from "@anthropic-ai/sdk";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Cheap, fast model for plain-text generation — PromptNest and SiteCheckr. */
export const CLAUDE_MODEL_FAST = "claude-haiku-4-5";

/**
 * Kept as its own constant (even though it's the same value today) so
 * bumping RankView to a pricier model later — to unlock a newer web_search
 * tool variant — is a one-line change that doesn't touch the other two tools.
 */
export const CLAUDE_MODEL_SEARCH = "claude-haiku-4-5";

/**
 * The web_search_20260209 variant (dynamic filtering) requires Opus/Sonnet
 * tier models — Haiku 4.5 only supports the basic tool.
 */
export const WEB_SEARCH_TOOL = {
  type: "web_search_20250305",
  name: "web_search",
  max_uses: 5,
} as const;

async function getAnthropicApiKey(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.ANTHROPIC_API_KEY) return env.ANTHROPIC_API_KEY;
  } catch {
    // Not running under the Workers runtime — fall through to process.env.
  }

  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;

  throw new Error(
    "ANTHROPIC_API_KEY is not set. Add it to .dev.vars for local dev/preview, or run `wrangler secret put ANTHROPIC_API_KEY` for the deployed Worker.",
  );
}

/**
 * Builds a fresh client per call rather than a module-level singleton —
 * Worker bindings are only available inside a request's execution context,
 * not at import time, so a singleton built at module load would capture an
 * empty key in the deployed Worker.
 */
export async function getClaudeClient(): Promise<Anthropic> {
  const apiKey = await getAnthropicApiKey();
  return new Anthropic({ apiKey });
}

/** Narrows the discriminated `content` union down to the first text block. */
export function extractText(message: Anthropic.Message): string {
  const block = message.content.find((b) => b.type === "text");
  return block?.type === "text" ? block.text : "";
}
