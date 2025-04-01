import { PricingCard } from "./pricing_card";

export function PricingCardAlpha() {
  return (
    <PricingCard
      name="Alpha tester"
      id="tier-alpha"
      description="Warning! Alpha is not production ready. Data will be periodically deleted."
      price="Free"
      priceSuffix=""
      to={new URL("/dashboard", import.meta.env.VITE_APP_URL)}
      actionText="Try the Alpha"
      features={[
        "Unlimited forms",
        "Unlimited submissions",
        "50 email notifications / month",
        "Cloudflare turnstile",
        "Bring your own SMTP (coming soon)",
        "Anti-spam honeypot (coming soon)",
        "Unlimited workspaces (coming soon)",
        "10 team members (coming soon)",
      ]}
    />
  );
}
