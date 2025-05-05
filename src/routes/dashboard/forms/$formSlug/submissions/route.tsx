import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading_skeleton";
import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { formId } = Route.useRouteContext();

  const { data: submissions, isPending } = useListSubmissions({
    formId: formId,
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <LoadingSkeleton className="w-32 h-8 rounded-lg" />
        <LoadingSkeleton className="w-32 h-8 rounded-lg" />
        <LoadingSkeleton className="w-32 h-8 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {submissions && submissions.length > 0 && (
        <div className="w-[200px] space-y-4">
          {submissions.map((s) => (
            <Button
              className="font-normal"
              key={s.id}
              variant="outline"
              to="/dashboard/forms/$formSlug/submissions/$id"
              params={{ formSlug: params.formSlug, id: s.id }}
              activeProps={{ "data-active": true }}
            >
              {maskLocalDate(s.createdAt)}
            </Button>
          ))}
        </div>
      )}

      <Outlet />
    </div>
  );
}
