import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { useGetSubmission } from "@/features/form_management/hooks/use_get_submission";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
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
        <span className="font-normal">Submitted on</span>{" "}
        <span className="font-semibold">
          {maskLocalDate(submission.createdAt)}
        </span>
      </CardHeader>
      <CardBody>
        <pre>{JSON.stringify(submission?.data, null, 2)}</pre>
      </CardBody>
    </Card>
  );
}
