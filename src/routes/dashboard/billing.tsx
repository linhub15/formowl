import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { SectionHeader } from "@/components/layout/section_header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress_bar";
import { P } from "@/components/ui/text";
import { CurrentPlanFeatures } from "@/features/billing/current_plan_features";
import { PLANS, safeGetPlan } from "@/features/billing/plans/plans.const";
import { useCancelSubscription } from "@/features/billing/use_cancel_subscription";
import { useGetStripeSubscription } from "@/features/billing/use_get_stripe_subscription";
import { useRestoreSubscription } from "@/features/billing/use_restore_subscription";
import { useSubscription } from "@/features/billing/use_subscription";
import { useUpgradeSubscription } from "@/features/billing/use_upgrade_subscription";
import { useGetLinkedEmailQuota } from "@/features/email_management/hooks/use_get_linked_email_quota";
import { SubmissionEmailQuotaProgress } from "@/features/email_management/submission_email_quota_usage";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/billing")({
  component: RouteComponent,
});

function RouteComponent() {
  const linkedEmailQuota = useGetLinkedEmailQuota();
  const { data: subscription } = useSubscription();
  const { data: price } = useGetStripeSubscription(
    subscription?.stripeSubscriptionId,
  );
  const upgradePlanMutation = useUpgradeSubscription();
  const cancelPlanMutation = useCancelSubscription();
  const restorePlanMutation = useRestoreSubscription();

  const upgradePlan = async () => {
    await upgradePlanMutation.mutateAsync();
  };

  const cancelPlan = async (subscriptionId: string) => {
    await cancelPlanMutation.mutateAsync(subscriptionId);
  };

  const restorePlan = async (subscriptionId: string) => {
    await restorePlanMutation.mutateAsync(subscriptionId);
  };

  const plan = safeGetPlan(subscription?.plan);

  return (
    <div className="space-y-8">
      <SectionHeader heading="Billing" />
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row gap-12">
          <CurrentPlanFeatures
            planLabel={plan.label}
            features={plan.features}
          />

          {!subscription
            ? (
              <Card className="w-full">
                <CardHeader>{PLANS.pro.label}</CardHeader>
                <CardBody>
                  <ul className="space-y-3.5 text-sm/6">
                    {PLANS.pro.features.map((feature) => (
                      <li className="flex gap-x-3" key={feature}>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-emerald-600"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Button onClick={upgradePlan}>
                    Upgrade to Pro
                  </Button>
                  <span className="ml-4 text-sm text-zinc-500 dark:text-zinc-400">
                    $<span>{PLANS.pro.monthlyPrice}</span>{" "}
                    / month billed annually
                  </span>
                </CardFooter>
              </Card>
            )
            : (
              <Card className="w-full">
                <CardHeader>
                  Billing period{" "}
                  {subscription.cancelAtPeriodEnd && <Badge>Cancelled</Badge>}
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <div>
                        <span className="text-5xl text-black dark:text-white font-medium">
                          ${price?.price}
                        </span>
                        <span className="uppercase text-4xl text-zinc-800 dark:text-zinc-200">
                          ({price?.currency})
                        </span>
                      </div>
                      <span className="text-lg">/ {price?.interval}</span>
                    </div>
                    <P>
                      <BillingPeriod
                        start={subscription.periodStart}
                        end={subscription.periodEnd}
                      />
                    </P>
                    {subscription.cancelAtPeriodEnd && (
                      <P>
                        Subscription has been cancelled and will not be charged
                        on period end.
                      </P>
                    )}
                  </div>
                </CardBody>
                <CardFooter>
                  {subscription.cancelAtPeriodEnd
                    ? (
                      <Button
                        onClick={() => restorePlan(subscription.id)}
                      >
                        Restore Subscription
                      </Button>
                    )
                    : (
                      <Button
                        onClick={() => cancelPlan(subscription.id)}
                        color="red"
                      >
                        Cancel Subscription
                      </Button>
                    )}
                </CardFooter>
              </Card>
            )}
        </div>

        <Card>
          <CardHeader>Plan Usage</CardHeader>
          <CardBody>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <P>Form submission sent through email</P>
                </div>
                <div className="md:col-span-2">
                  <SubmissionEmailQuotaProgress />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <P>
                    Linked email addresses
                  </P>
                </div>
                <div className="md:col-span-2">
                  <ProgressBar
                    label="Linked email addresses"
                    value={linkedEmailQuota.data?.used}
                    max={linkedEmailQuota.data?.max}
                    isLoading={linkedEmailQuota.isLoading}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function BillingPeriod(
  { start, end }: { start?: Date; end?: Date },
) {
  if (!start || !end) {
    return "none";
  }

  return (
    <>
      <span>Current billing period:</span>{" "}
      <span>
        {start.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} to {end.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
      <p>
        Next payment on {end.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </>
  );
}
