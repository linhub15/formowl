import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { PLANS } from "@/features/billing/plans/plans.const";
import {
  PricingCard,
  type PricingCardProps,
} from "@/features/marketing_site/pricing_card";
import { PricingCardAlpha } from "@/features/marketing_site/pricing_card_alpha";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/pricing")({
  component: RouteComponent,
});

const tiers: PricingCardProps[] = [
  {
    id: "tier-free",
    name: PLANS.free.label,
    to: "/waitlist",
    price: PLANS.free.monthlyPrice,
    features: PLANS.free.features,
  },
  {
    id: "tier-pro",
    name: PLANS.pro.label,
    to: "/waitlist",
    price: PLANS.pro.monthlyPrice,
    features: PLANS.pro.features,
  },
];

function RouteComponent() {
  return (
    <Container>
      <section className="space-y-16">
        <Heading className="text-center">Pricing</Heading>
        <div className="max-w-md mx-auto">
          <PricingCardAlpha />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-8 blur-xs select-none flex-wrap">
          {tiers.map((tier) => <PricingCard key={tier.id} {...tier} />)}
        </div>
      </section>
    </Container>
  );
}
