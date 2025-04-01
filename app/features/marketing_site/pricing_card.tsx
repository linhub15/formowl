import { Card } from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import { Subheading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import type { LinkProps } from "@tanstack/react-router";

export type PricingCardProps = {
  id: string;
  name: string;
  description?: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  to?: LinkProps["to"];
  href?: string;
  actionText?: string;
};

export function PricingCard(
  {
    id,
    name,
    description,
    price,
    priceSuffix = "/month",
    features,
    to,
    href,
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
            to={to}
            href={href}
            aria-describedby={id}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </Card>
  );
}
