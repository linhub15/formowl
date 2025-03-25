import { Card } from "@/components/layout/card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Heading, Subheading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
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
              "25,000 email notifications",
              "Cloudflare turnstile",
              "Bring your own SMTP (coming soon)",
              "Anti-spam honeypot (coming soon)",
              "Unlimited workspaces (coming soon)",
              "10 team members (coming soon)",
            ]}
          />
        </div>

        <div className="grid sm:grid-cols-2 mx-auto max-w-3xl gap-8 blur-xs select-none">
          {tiers.map((tier) => <PricingCard key={tier.id} {...tier} />)}
        </div>
      </section>
    </Container>
  );
}

type PricingCardProps = {
  id: string;
  name: string;
  description?: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  to: URL;
  actionText?: string;
};

function PricingCard(
  {
    id,
    name,
    description,
    price,
    priceSuffix = "/month",
    features,
    to,
    actionText = "Get started",
  }: PricingCardProps,
) {
  return (
    <Card className="rounded-2xl">
      <div className="flex flex-col justify-between h-full rounded-3xl p-8 sm:p-10">
        <div className="space-y-8">
          <Subheading className="text-base/7 font-semibold" id={id}>
            {name}
          </Subheading>
          <div className="flex items-baseline flex-1 gap-x-2">
            <span className="text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white/90">
              {price}
            </span>
            <span className="text-base/7 font-semibold">
              {priceSuffix}
            </span>
          </div>
          <P>{description}</P>
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
        </div>
        <div className="w-full mt-6">
          <Button
            className="mt-4 w-full"
            href={to.pathname}
            aria-describedby={id}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </Card>
  );
}
