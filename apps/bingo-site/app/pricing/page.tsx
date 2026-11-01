import { redirect } from "next/navigation";

/**
 * Pricing isn't decided yet. This route stays alive (rather than 404ing)
 * because Google already indexed it under the old positioning — a
 * permanent redirect keeps that link equity pointed somewhere useful
 * instead of losing it.
 */
export default function PricingPage() {
  redirect("/contact");
}
