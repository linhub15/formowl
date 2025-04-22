import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
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
    id: "tier-freelancer",
    name: "Freelancer",
    to: "/waitlist",
    price: "$5",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "1000 email notifications",
      "10 linked emails",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "Bring your own SMTP (coming soon)",
      "Custom redirect (coming soon)",
    ],
  },
  {
    id: "tier-team",
    name: "Team",
    to: "/waitlist",
    price: "$20",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "4000 email notifications",
      "100 linked emails",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "Bring your own SMTP (coming soon)",
      "3 team members (coming soon)",
      "API access (coming soon)",
    ],
  },
  {
    name: "Business",
    id: "tier-business",
    to: "/waitlist",
    price: "$100",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "25,000 email notifications",
      "1000 linked emails",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "10+ team members (coming soon)",
      "API access (coming soon)",
    ],
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
