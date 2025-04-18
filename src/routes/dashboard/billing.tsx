import { SectionHeader } from "@/components/layout/section_header";
import { P } from "@/components/ui/text";
import { PricingCardAlpha } from "@/features/marketing_site/pricing_card_alpha";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/billing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <SectionHeader heading="Billing" />
      <P className="text-center">
        Hey, we're still in alpha but will have some more info coming soon.
      </P>
      <div className="max-w-md mx-auto">
        <PricingCardAlpha />
      </div>
    </div>
  );
}
