import { PLANS } from "../billing/plans/plans.const";
import { PricingCard } from "./pricing_card";

export function PricingCardAlpha() {
  return (
    <PricingCard
      name="Alpha tester"
      id="tier-alpha"
      description="Thanks for testing the Alpha for me. This is a temporary free plan for early adopters."
      price={0}
      priceSuffix=""
      to="/dashboard"
      actionText="Try the Alpha"
      features={PLANS.alpha.features}
    />
  );
}
