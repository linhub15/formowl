import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useDeleteForm } from "@/features/form_management/hooks/use_delete_form";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
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
      <div className="flex justify-between ">
        <Heading>{form.title}</Heading>
        <Button onClick={deleteForm}>
          Delete
        </Button>
      </div>
      <div>
        <pre>
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
}
