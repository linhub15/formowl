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
    id: "tier-hobby",
    name: "Freelancer",
    to: new URL("/waitlist", import.meta.env.VITE_APP_URL),
    price: "$10",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "Bring your own SMTP (coming soon)",
      "Anti-spam honeypot (coming soon)",
      "Cloudflare turnstile",
    ],
  },
  {
    name: "Team",
    id: "tier-business",
    to: new URL("/waitlist", import.meta.env.VITE_APP_URL),
    price: "$100",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "25,000 email notifications",
      "Anti-spam honeypot (coming soon)",
      "Cloudflare turnstile",
      "10 team members (coming soon)",
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

        <div className="grid sm:grid-cols-2 mx-auto max-w-3xl gap-8 blur-xs select-none">
          {tiers.map((tier) => <PricingCard key={tier.id} {...tier} />)}
        </div>
      </section>
    </Container>
  );
}
