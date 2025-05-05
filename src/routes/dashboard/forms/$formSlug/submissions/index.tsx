import { listSubmissionsFn } from "@/features/form_management/functions/list_submissions.fn";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions/")(
  {
    beforeLoad: async ({ params, context }) => {
      const submissions = await listSubmissionsFn({
        data: { formId: context.formId },
      });

      const first = submissions?.at(0);

      if (first) {
        throw redirect({
          to: "/dashboard/forms/$formSlug/submissions/$id",
          params: { formSlug: params.formSlug, id: first.id },
        });
      }

      return;
    },
    component: RouteComponent,
  },
);

export function RouteComponent() {
  return <div>No submissions, follow the examples to setup your form.</div>;
}
