import { Button } from "@/components/ui/button";
import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  const submissions = useListSubmissions({ formSlug: params.formSlug });
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-[200px]  space-y-4">
          {submissions.data?.map((s) => (
            <Button
              className="font-normal"
              key={s.id}
              outline
              to="/dashboard/forms/$formSlug/submissions/$id"
              params={{ formSlug: params.formSlug, id: s.id }}
              activeProps={{ "data-active": true }}
            >
              {maskLocalDate(s.createdAt)}
            </Button>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}
