import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSkeleton } from "@/components/ui/loading_skeleton";
import { FormSubmissionActionDropdown } from "@/features/form_management/form_submission_action_dropdown";
import { useGetSubmission } from "@/features/form_management/hooks/use_get_submission";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/forms/$formSlug/submissions/$id",
)({ component: RouteComponent });

function RouteComponent() {
  const params = Route.useParams();
  const { formId } = Route.useRouteContext();

  const { data: submission, isPending } = useGetSubmission({
    formId: formId,
    formSubmissionId: params.id,
  });

  if (!submission) {
    return;
  }

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="py-4">
            <LoadingSkeleton className="w-36 h-2.5" />
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <LoadingSkeleton className="w-4 h-2.5" />
            <LoadingSkeleton className="w-40 h-2.5" />
            <LoadingSkeleton className="w-64 h-2.5" />
            <LoadingSkeleton className="w-20 h-2.5" />
            <LoadingSkeleton className="w-4 h-2.5" />
          </div>
        </CardBody>
      </Card>
    );
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
              formId={submission.formId}
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
