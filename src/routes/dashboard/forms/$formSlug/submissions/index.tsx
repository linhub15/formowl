import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions/")(
  { component: RouteComponent },
);

export function RouteComponent() {
  const params = Route.useParams();
  const { formId } = Route.useRouteContext();

  const { data: submissions } = useListSubmissions({ formId: formId });

  const first = submissions?.at(0);

  if (first) {
    return (
      <Navigate
        to="/dashboard/forms/$formSlug/submissions/$id"
        params={{ ...params, id: first.id }}
        replace={true}
      />
    );
  }

  return <div>No submissions, follow the examples to setup your form.</div>;
}
