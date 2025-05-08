import { PricingCard } from "./pricing_card";

export const alphaFeatures = [
  "Unlimited forms",
  "Unlimited submissions",
  "50 email notifications / month",
  "Anti-spam honeypot",
  "Cloudflare turnstile",
  "Custom thank you page",
  "5 linked emails",
  "3 team members (coming soon)",
];

export function PricingCardAlpha() {
  return (
    <PricingCard
      name="Alpha tester"
      id="tier-alpha"
      description="Thanks for testing the Alpha for me. This is a temporary free plan for early adopters."
      price="Free"
      priceSuffix=""
      to="/dashboard"
      actionText="Try the Alpha"
      features={alphaFeatures}
    />
  );
}
