import { SectionHeader } from "@/components/layout/section_header";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Route as SubmissionRoute } from "./submissions";
import { Route as SettingsRoute } from "./settings";
import { Route as FormExampleRoute } from "./example";

export const Route = createFileRoute("/dashboard/forms/$formSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const matchRoute = useMatchRoute();
  const { data: form } = useGetForm({ formSlug: params.formSlug });

  if (!form) {
    return;
  }

  return (
    <div>
      <SectionHeader
        heading={form.name}
        tabs={[{
          name: "Submissions",
          linkProps: {
            to: SubmissionRoute.to,
            params: { formSlug: params.formSlug },
            disabled: form.submissionsCount === 0,
          },
          current: !!matchRoute({
            to: SubmissionRoute.to,
            fuzzy: true,
          }),
        }, {
          name: "Settings",
          linkProps: {
            to: SettingsRoute.to,
            params: { formSlug: params.formSlug },
          },
          current: !!matchRoute({
            to: SettingsRoute.to,
          }),
        }, {
          name: "Example",
          linkProps: {
            to: FormExampleRoute.to,
            params: { formSlug: params.formSlug },
          },
          current: !!matchRoute({
            to: FormExampleRoute.to,
          }),
        }]}
      />

      <main className="py-10">
        <Outlet />
      </main>
    </div>
  );
}
