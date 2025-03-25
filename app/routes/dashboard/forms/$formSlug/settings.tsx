import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { A, P } from "@/components/ui/text";
import { useGetTurnstile } from "@/features/cloudflare_turnstile/hooks/use_get_turnstile";
import { TurnstileFormDialog } from "@/features/cloudflare_turnstile/turnstile_form_dialog";
import { DeleteFormButton } from "@/features/form_management/delete_form_button";
import { FormSubmissionToggler } from "@/features/form_management/form_submission_toggler";
import { FormTurnstileToggler } from "@/features/form_management/form_turnstile_toggler";
import { useGetForm } from "@/features/form_management/hooks/use_get_form";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  const params = Route.useParams();
  const { data: form } = useGetForm({ formSlug: params.formSlug });
  const { data: turnstile } = useGetTurnstile();

  if (!form || !session) {
    return;
  }

  return (
    <div className="space-y-16">
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
            <div className="space-y-2">
              <Subheading>Email notifications</Subheading>
              <P>
                Submissions will be sent to this email address. Your profile
                email address is used by default.
              </P>
            </div>
            <div data-comment="keeps the width consistent">
              <div className="relative w-xs">
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
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
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

        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
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
                  <FormTurnstileToggler formSlug={form.slug} />
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
