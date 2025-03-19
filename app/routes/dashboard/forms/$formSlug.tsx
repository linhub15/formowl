import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useDeleteForm } from "@/features/form_management/hooks/use_delete_form";
import { useFormActionUrl } from "@/features/form_management/hooks/use_form_action_url";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const url = useFormActionUrl({ formSlug: params.formSlug });
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

      <div>
        <h1>Data to Show</h1>
        <ul>
          <li>How to setup your form; form action URL - {url.href}</li>
          <li>submissions</li>
          <li>Renaming the form</li>
          <li>setup captcha</li>
        </ul>
      </div>

      <div>
      </div>

      <form action={url.href} method="POST">
        <input type="text" name="random" value="yes" />
        <button type="submit">Test submit</button>
      </form>
    </div>
  );
}
