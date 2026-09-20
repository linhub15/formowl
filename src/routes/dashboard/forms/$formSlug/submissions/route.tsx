import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading_skeleton";
import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const searchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1).optional(),
});

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions")({
  validateSearch: (search) => searchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { formId } = Route.useRouteContext();
  const { page: searchPage } = Route.useSearch();
  const page = searchPage ?? 1;
  const navigate = Route.useNavigate();

  const { data, isPending } = useListSubmissions({
    formId: formId,
    page,
  });

  const submissions = data?.submissions;
  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / 10));

  useEffect(() => {
    if (data && page > totalPages) {
      void navigate({ search: { page: totalPages }, replace: true });
    }
  }, [data, navigate, page, totalPages]);

  const goToPage = (nextPage: number) => {
    void navigate({
      to: "/dashboard/forms/$formSlug/submissions",
      params: { formSlug: params.formSlug },
      search: { page: nextPage },
    });
  };

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
    <div>
      <div className="flex gap-4">
        {submissions && submissions.length > 0 && (
          <div className="w-[200px]">
            <div className="space-y-4">
              {submissions.map((s) => (
                <Button
                  className="font-normal"
                  key={s.id}
                  variant="outline"
                  to="/dashboard/forms/$formSlug/submissions/$id"
                  params={{ formSlug: params.formSlug, id: s.id }}
                  search={{ page }}
                  activeProps={{ "data-active": true }}
                >
                  {maskLocalDate(s.createdAt)}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Outlet />
      </div>

      {submissions && submissions.length > 0 && (
        <div className="mt-4 flex w-[123px] items-center justify-between">
          <Button
            aria-label="Previous page"
            className="size-8 p-0"
            variant="plain"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400">
            {page} / {totalPages}
          </span>
          <Button
            aria-label="Next page"
            className="size-8 p-0"
            variant="plain"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
