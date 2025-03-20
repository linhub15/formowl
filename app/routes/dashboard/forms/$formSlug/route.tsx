import { SectionHeader } from "@/components/layout/section_header";
import { Button } from "@/components/ui/button";
import { useDeleteForm } from "@/features/form_management/hooks/use_delete_form";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import {
  createFileRoute,
  Outlet,
  redirect,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Route as SubmissionRoute } from "./submissions";
import { Route as SettingsRoute } from "./settings";
import { Route as FormExampleRoute } from "./example";

export const Route = createFileRoute("/dashboard/forms/$formSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const { data: form } = useGetForm({ formSlug: params.formSlug });
  const tryDeleteForm = useDeleteForm();

  if (!form) {
    return;
  }

  const deleteForm = async () => {
    await tryDeleteForm.mutateAsync({ formId: form.id }, {
      onSuccess: () => {
        navigate({ to: "/dashboard/forms" });
      },
    });
  };

  return (
    <div>
      <SectionHeader
        heading={form.name}
        actions={
          <Button onClick={deleteForm}>
            Delete
          </Button>
        }
        tabs={[{
          name: "Submissions",
          linkProps: {
            to: SubmissionRoute.to,
            params: { formSlug: params.formSlug },
          },
          current: !!matchRoute({
            to: SubmissionRoute.to,
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
