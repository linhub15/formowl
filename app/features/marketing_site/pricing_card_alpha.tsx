import { PricingCard } from "./pricing_card";

export function PricingCardAlpha() {
  return (
    <PricingCard
      name="Alpha tester"
      id="tier-alpha"
      description="Warning! Alpha is not production ready. Data will be periodically deleted."
      price="Free"
      priceSuffix=""
      to="/dashboard"
      actionText="Try the Alpha"
      features={[
        "Unlimited forms",
        "Unlimited submissions",
        "50 email notifications / month",
        "Anti-spam honeypot",
        "Cloudflare turnstile",
        "Bring your own SMTP (coming soon)",
        "5 team members (coming soon)",
      ]}
    />
  );
}
