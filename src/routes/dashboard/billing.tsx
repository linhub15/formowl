import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { SectionHeader } from "@/components/layout/section_header";
import { Button } from "@/components/ui/button";
import { Subheading } from "@/components/ui/heading";
import { ProgressBar } from "@/components/ui/progress_bar";
import { P } from "@/components/ui/text";
import { useGetLinkedEmailQuota } from "@/features/email_management/hooks/use_get_linked_email_quota";
import { SubmissionEmailQuotaProgress } from "@/features/email_management/submission_email_quota_usage";
import { alphaFeatures } from "@/features/marketing_site/pricing_card_alpha";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/billing")({
  component: RouteComponent,
});

function RouteComponent() {
  const linkedEmailQuota = useGetLinkedEmailQuota();

  return (
    <div className="space-y-8">
      <SectionHeader heading="Billing" />

      <div className="space-y-16">
        <div className="flex flex-col md:flex-row gap-12">
          <Card className="w-full">
            <CardHeader>Subscription</CardHeader>
            <CardBody>
              <div className="space-y-6">
                <Subheading>Alpha tester</Subheading>
                <div className="text-5xl text-black dark:text-white font-medium">
                  $0.00/mo
                </div>
                <P>Billing period: None</P>
              </div>
            </CardBody>
            <CardFooter>
              <Button disabled>Upgrade</Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardBody>
              <ul className="space-y-3.5 text-sm/6">
                {alphaFeatures.map((feature) => (
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
          </Card>
        </div>

        <Card>
          <CardHeader>Plan Usage</CardHeader>
          <CardBody>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <P>50 form submission email notifications</P>
                </div>
                <div className="md:col-span-2">
                  <SubmissionEmailQuotaProgress />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <P>
                    Linked email addresses, doesn't include emails for your
                    account or emails for organization members.
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
