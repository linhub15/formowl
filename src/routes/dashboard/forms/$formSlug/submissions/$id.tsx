import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Badge } from "@/components/ui/badge";
import { FormSubmissionActionDropdown } from "@/features/form_management/form_submission_action_dropdown";
import { useGetSubmission } from "@/features/form_management/hooks/use_get_submission";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/forms/$formSlug/submissions/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: submission } = useGetSubmission({
    formSlug: params.formSlug,
    formSubmissionId: params.id,
  });

  if (!submission) {
    return;
  }
  // todo: implement a nice format for the submission data
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-normal">Submitted on</span>{" "}
            <span className="font-semibold">
              {maskLocalDate(submission.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            {submission.passedCloudflareTurnstile && (
              <Badge
                title="Secure submission with Cloudflare Turnstile"
                className="h-6"
              >
                <LockClosedIcon className="text-green-600 size-3" />
              </Badge>
            )}
            {submission.emailedTo && (
              <Badge title={submission.emailedTo}>
                <CheckIcon className="text-green-500 size-4" />Emailed
              </Badge>
            )}
            <FormSubmissionActionDropdown
              formSlug={params.formSlug}
              submissionId={submission.id}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <pre>{JSON.stringify(submission?.data, null, 2)}</pre>
      </CardBody>
    </Card>
  );
}
