import { SectionHeader } from "@/components/layout/section_header";
import { Subheading } from "@/components/ui/heading";
import { useListForms } from "@/features/form_management/hooks/use_list_forms";
import { cn } from "@/lib/utils/cn";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const forms = useListForms();

  return (
    <div>
      <SectionHeader heading="Forms" />
      <div className="py-8">
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
            <Subheading>{form.title}</Subheading>
            <div className="text-sm">
              {form.submissionsCount}{" "}
              submission{form.submissionsCount === 0 ? "" : "s"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
