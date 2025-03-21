import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Badge } from "@/components/ui/badge";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { P } from "@/components/ui/text";
import { DeleteFormButton } from "@/features/form_management/delete_form_button";
import { FormSubmissionToggler } from "@/features/form_management/form_submission_toggler";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  const params = Route.useParams();
  const { data: form } = useGetForm({ formSlug: params.formSlug });

  if (!form || !session) {
    return;
  }

  return (
    <div className="space-y-16">
      <Card>
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Subheading>Email notifications</Subheading>
              <P>
                Submissions will be sent to this email address. Your profile
                email address is used by default.
              </P>
            </div>
            <div>
              <div className="relative w-3xs">
                <Badge
                  className="absolute right-0 mr-2 inset-y-2"
                  color="green"
                >
                  Verified
                </Badge>
                <Input defaultValue={session.user.email} disabled />
              </div>
            </div>
          </div>
        </CardBody>

        <CardBody>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Subheading>Submissions</Subheading>
              <div>
                <P>Pause to block all form submission.</P>
                <P>Paused forms will respond with 404 not found.</P>
              </div>
            </div>
            <div>
              <FormSubmissionToggler
                formId={form.id}
                isPaused={form.isSubmissionsPaused}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="text-red-700 dark:text-red-500 font-semibold">
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
