import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const submissions = useListSubmissions({ formSlug: params.formSlug });
  return (
    <div>
      {submissions.data?.map((s) => JSON.stringify(s, null, 2))}
    </div>
  );
}
