import { SectionHeader } from "@/components/layout/section_header";
import { Button } from "@/components/ui/button";
import { Subheading } from "@/components/ui/heading";
import { LoadingSkeleton } from "@/components/ui/loading_skeleton";
import { P } from "@/components/ui/text";
import { useListForms } from "@/features/form_management/hooks/use_list_forms";
import { cn } from "@/lib/utils/cn";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: forms, isLoading } = useListForms();

  return (
    <div className="space-y-8">
      <SectionHeader heading="Forms" />

      {isLoading && (
        <div className="flex items-center gap-3 py-4.5">
          <DocumentTextIcon className="size-6 animate-pulse" />
          <div className="space-y-3">
            <LoadingSkeleton className="h-2.5 w-20" />
            <LoadingSkeleton className="h-2.5 w-40" />
          </div>
        </div>
      )}

      {!isLoading && forms?.length === 0 && (
        <div className="max-w-sm mx-auto text-center space-y-6 py-12">
          <DocumentPlusIcon className="mx-auto size-16" />
          <div className="space-y-1">
            <Subheading className="sm:text-2xl/6">No forms yet</Subheading>
            <P>Get started by creating a new form.</P>
          </div>
          <Button to="/dashboard/forms/create" variant="outline">
            + New form
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {forms?.map((form) => (
          <Link
            className={cn(
              "block p-4 -ml-4 rounded-lg",
              //hover
              "hover:bg-zinc-950/5 dark:hover:bg-white/5",
            )}
            key={form.id}
            to="/dashboard/forms/$formSlug"
            params={{ formSlug: form.slug }}
          >
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="size-6" />
              <div>
                <Subheading>{form.name}</Subheading>
                <div className="text-sm">
                  {form.submissionsCount}{" "}
                  submission{form.submissionsCount === 1 ? "" : "s"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
