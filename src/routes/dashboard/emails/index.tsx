import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { SectionHeader } from "@/components/layout/section_header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListEmails } from "@/features/email_management/hooks/use_list_emails";
import { useResendVerification } from "@/features/email_management/hooks/use_resend_verification";
import { AtSymbolIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { createFileRoute } from "@tanstack/react-router";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { useDeleteEmail } from "@/features/email_management/hooks/use_delete_email";

export const Route = createFileRoute("/dashboard/emails/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: emails } = useListEmails();
  const resend = useResendVerification();
  const deleteEmail = useDeleteEmail();

  return (
    <div className="space-y-8">
      <SectionHeader heading="Emails" />
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
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <span>Linked emails</span>
              <Button to="/dashboard/emails/create">Add email</Button>
            </div>
          </CardHeader>
          <CardBody>
            {emails?.organizationEmails.length === 0 && (
              <EmptyStateLinkedEmails />
            )}
            <div className="flex flex-col gap-6">
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
                              : await deleteEmail.mutateAsync({
                                email: email.email,
                                emailId: email.id,
                              })}
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
      </div>
    </div>
  );
}

export function EmptyStateLinkedEmails() {
  return (
    <div className="max-w-sm mx-auto text-center space-y-6 py-6">
      <AtSymbolIcon className="mx-auto size-16" />
      <span>
        No linked emails yet. Add an email to send submissions to linked emails.
      </span>
    </div>
  );
}
