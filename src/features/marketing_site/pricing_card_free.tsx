import { PLANS } from "../billing/plans/plans.const";
import { PricingCard } from "./pricing_card";

export function PricingCardFree() {
  return (
    <PricingCard
      name={PLANS.free.label}
      id="tier-free"
      description="Get started with the Free Tier. Perfect for personal projects."
      price={PLANS.free.monthlyPrice}
      priceSuffix=""
      to="/dashboard"
      actionText="Start for free"
      features={PLANS.free.features}
    />
  );
}
