import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Subheading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";
import { DeleteFormButton } from "@/features/form_management/delete_form_button";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: form } = useGetForm({ formSlug: params.formSlug });

  if (!form) {
    return;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <span className="text-red-700 dark:text-red-500 font-bold">
            Danger Zone
          </span>
        </CardHeader>
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Subheading level={3}>Permanently delete this form</Subheading>
              <div>
                <P>
                  Deleting this form will also delete all associated
                  submissions.
                </P>
                <P>This cannot be undone.</P>
              </div>
            </div>
            <div>
              <DeleteFormButton formId={form.id} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
