import { Card } from "@/components/layout/card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Heading, Subheading } from "@/components/ui/heading";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/pricing")({
  component: RouteComponent,
});

const tiers: PricingCardProps[] = [
  {
    name: "",
    id: "tier-business",
    to: new URL("/waitlist", import.meta.env.VITE_APP_URL),
    priceMonthly: "$100",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "25,000 email notifications",
      "Anti-spam honeypot (coming soon)",
      "Cloudflare turnstile (coming soon)",
    ],
  },
];

function RouteComponent() {
  return (
    <Container>
      <section className="space-y-16">
        <Heading className="text-center">Pricing</Heading>
        <div className="mx-auto max-w-sm">
          {tiers.map((tier) => <PricingCard key={tier.id} {...tier} />)}
        </div>
      </section>
    </Container>
  );
}

type PricingCardProps = {
  id: string;
  name: string;
  priceMonthly: string;
  features: string[];
  to: URL;
};

function PricingCard(
  { id, name, priceMonthly, features, to }: PricingCardProps,
) {
  return (
    <Card className="rounded-2xl">
      <div className="flex flex-col justify-between rounded-3xl p-8 sm:p-10 gap-8">
        <Subheading className="text-base/7 font-semibold" id={id}>
          {name}
        </Subheading>
        <div className="flex items-baseline gap-x-2">
          <span className="text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white/90">
            {priceMonthly}
          </span>
          <span className="text-base/7 font-semibold">
            /month
          </span>
        </div>
        <ul className="space-y-4 text-sm/6">
          {features.map((feature) => (
            <li className="flex gap-x-3" key={feature}>
              <CheckCircleIcon
                aria-hidden="true"
                className="h-6 w-5 flex-none text-emerald-600"
              />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="mt-4"
          href={to.pathname}
          aria-describedby={id}
        >
          Get started
        </Button>
      </div>
    </Card>
  );
}
