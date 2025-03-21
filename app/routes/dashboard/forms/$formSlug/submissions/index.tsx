import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions/")(
  { component: RouteComponent },
);

export function RouteComponent() {
  const params = Route.useParams();

  const { data: submissions } = useListSubmissions({
    formSlug: params.formSlug,
  });

  const first = submissions?.at(0);

  if (first) {
    return (
      <Navigate
        to="/dashboard/forms/$formSlug/submissions/$id"
        params={{ ...params, id: first.id }}
      />
    );
  }

  return (
    <Navigate
      to="/dashboard/forms/$formSlug/example"
      params={{ ...params }}
    />
  );
}
