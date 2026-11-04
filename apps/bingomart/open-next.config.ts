import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Defaults are right for this site: every route is prerendered at build time
 * and the only dynamic path is the contact server action, so there is no
 * incremental cache or tag store worth wiring up yet.
 *
 * If ISR or on-demand revalidation is added later, configure the R2 / KV
 * caching here — see https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig();
