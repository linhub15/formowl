import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code_block";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { A, P } from "@/components/ui/text";
import { useGetTurnstile } from "@/features/cloudflare_turnstile/hooks/use_get_turnstile";
import { TurnstileFormDialog } from "@/features/cloudflare_turnstile/turnstile_form_dialog";
import { SelectEmail } from "@/features/email_management/select_email";
import { DeleteFormButton } from "@/features/form_management/delete_form_button";
import { EmailNotificationToggler } from "@/features/form_management/email_notification_togger";
import { FormSubmissionToggler } from "@/features/form_management/form_submission_toggler";
import { FormTurnstileToggler } from "@/features/form_management/form_turnstile_toggler";
import { useFormActionUrl } from "@/features/form_management/hooks/use_form_action_url";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute } from "@tanstack/react-router";
import { EditFormNameInput } from "@/features/form_management/rename_form/edit_form_name_input";

export const Route = createFileRoute("/dashboard/forms/$formSlug/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  const params = Route.useParams();
  const { formId } = Route.useRouteContext();
  const formActionUrl = useFormActionUrl({ formSlug: params.formSlug });
  const { data: form } = useGetForm({ formId: formId });
  const { data: turnstile } = useGetTurnstile();

  if (!form || !session) {
    return;
  }

  return (
    <div className="space-y-16">
      <Card>
        <CardBody>
          <Subheading>Form action</Subheading>
          <CodeBlock code={formActionUrl.href} language="html" showCopyButton />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="space-y-2">
              <Subheading>Name</Subheading>
              <div>
                <P>
                  The name of the form is used on email subject lines and shows
                  up in this dashboard.
                </P>
                <P>
                  Changing the name won't affect submissions.
                </P>
              </div>
            </div>
            <div className="w-xs">
              <EditFormNameInput formId={form.id} formName={form.name} />
            </div>
          </div>
        </CardBody>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
            <div className="space-y-2">
              <Subheading>Form Submissions</Subheading>
              <div>
                <P>Pause to temporarily block form submission.</P>
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

        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="space-y-2">
              <Subheading>Email notifications</Subheading>
              <div>
                <P>
                  When a submission is received, the submission will be sent to
                  this email.
                </P>
                <P>
                  Form submission are still saved when email notifications are
                  paused.
                </P>
              </div>
            </div>
            <div className="w-xs">
              <FieldGroup>
                <SelectEmail
                  value={form.email || session.user.email}
                  formId={form.id}
                />
                <EmailNotificationToggler formId={form.id} />
              </FieldGroup>
            </div>
          </div>
        </CardBody>

        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="space-y-2">
              <Subheading>Cloudflare Turnstile</Subheading>
              <div>
                <P>Protect your forms from spam bots.</P>
                <P>
                  Learn how to get your site key and secret key here{" "}
                  <A
                    href="https://developers.cloudflare.com/turnstile/get-started/"
                    target="_blank"
                  >
                    Cloudflare Turnstile
                  </A>
                </P>
              </div>
            </div>

            <div className="w-xs">
              <FieldGroup>
                <Field>
                  <Label>Account Site Key</Label>
                  <div className="flex gap-2" data-slot="control">
                    <Input type="text" value={turnstile?.siteKey} disabled />
                    <TurnstileFormDialog />
                  </div>
                </Field>
                <Field>
                  <FormTurnstileToggler formId={form.id} />
                </Field>
              </FieldGroup>
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
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
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
