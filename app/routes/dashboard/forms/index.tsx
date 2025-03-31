import { SectionHeader } from "@/components/layout/section_header";
import { Subheading } from "@/components/ui/heading";
import { useListForms } from "@/features/form_management/hooks/use_list_forms";
import { cn } from "@/lib/utils/cn";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const forms = useListForms();

  return (
    <div className="space-y-8">
      <SectionHeader heading="Forms" />
      <div className="space-y-3">
        {forms.data?.map((form) => (
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
