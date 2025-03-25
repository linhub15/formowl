import { SectionHeader } from "@/components/layout/section_header";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Route as SubmissionRoute } from "./submissions";
import { Route as SettingsRoute } from "./settings";
import { Route as FormExampleRoute } from "./example";
import { Button } from "@/components/ui/button";
import { useSetFormName } from "@/features/form_management/hooks/use_set_form_name";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/forms/$formSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const matchRoute = useMatchRoute();
  const { data: form } = useGetForm({ formSlug: params.formSlug });

  /**
   * todo:
   */

  const setFormName = useSetFormName();
  const [editName, setEditName] = useState(false);
  const nameForm = useForm({
    defaultValues: { name: form?.name },
    onSubmit: ({ value }) => {
      setEditName(false);
      setFormName.mutateAsync({ name: value.name, formId: form?.id });
    },
  });

  if (!form) {
    return;
  }

  return (
    <div>
      <SectionHeader
        heading={editName
          ? (
            <nameForm.Field name="name">
              {(field) => (
                <>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    onClick={nameForm.handleSubmit}
                    disabled={field.state.value === form.name}
                  >
                    {setFormName.isPending
                      ? <LoadingSpinner data-slot="icon" />
                      : "Save"}
                  </Button>
                </>
              )}
            </nameForm.Field>
          )
          : (
            <div>
              {form.name} {form.isSubmissionsPaused && <Badge>Paused</Badge>}
            </div>
          )}
        actions={!editName
          ? (
            <Button
              onClick={() => {
                setEditName(true);
              }}
            >
              Rename
            </Button>
          )
          : (
            <Button
              onClick={() => {
                setEditName(false);
                nameForm.reset();
              }}
            >
              Cancel
            </Button>
          )}
        tabs={[{
          name: "Submissions",
          linkProps: {
            to: SubmissionRoute.to,
            params: { formSlug: params.formSlug },
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
