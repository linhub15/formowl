import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { SectionHeader } from "@/components/layout/section_header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListEmails } from "@/features/email_management/hooks/use_list_emails";
import { useResendVerification } from "@/features/email_management/hooks/use_resend_verification";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { useDeleteEmail } from "@/features/email_management/hooks/use_delete_email";
import { EmailQuotaProgress } from "@/features/email_management/email_quota_usage";
import { P } from "@/components/ui/text";

export const Route = createFileRoute("/dashboard/emails/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: emails } = useListEmails();
  const resend = useResendVerification();
  const deleteEmail = useDeleteEmail();

  return (
    <div className="space-y-8">
      <SectionHeader
        heading="Emails"
        actions={<Button to="/dashboard/emails/create">Add email</Button>}
      />
      <div className="space-y-16">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-6">
              {emails?.memberEmails.map((email) => (
                <div className="flex gap-4" key={email.user.email}>
                  {email.user.email} <Badge>Member</Badge>
                  <Badge color="green">Verified</Badge>
                </div>
              ))}
              {emails?.organizationEmails.map((email) => (
                <div
                  className="flex justify-between items-center"
                  key={email.email}
                >
                  <div className="flex gap-4">
                    {email.email} <Badge>External</Badge>
                    {email.emailVerified
                      ? <Badge color="green">Verified</Badge>
                      : <Badge>Unverified</Badge>}
                  </div>

                  <div className="flex gap-2">
                    {!email.emailVerified && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          resend.mutateAsync({
                            emailId: email.id,
                          })}
                      >
                        Resend verification
                      </Button>
                    )}

                    <Dropdown>
                      <DropdownButton variant="outline">
                        <EllipsisVerticalIcon className="size-4" />
                      </DropdownButton>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={async () =>
                            email.forms.length > 0
                              ? alert(
                                `Email is connected to ${email.forms.length} form(s). Remove the email from the form(s) before deleting.`,
                              )
                              : await deleteEmail.mutateAsync(email.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            Email Notification Quota
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <P>
                The email notification quota resets on the 1st of each month.
              </P>

              <EmailQuotaProgress />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
