import { Card, CardBody } from "@/components/layout/card";
import { SectionHeader } from "@/components/layout/section_header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListEmails } from "@/features/email_management/hooks/use_list_emails";
import { useResendVerification } from "@/features/email_management/hooks/use_resend_verification";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/emails/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: emails } = useListEmails();
  const resend = useResendVerification();

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
                    {email.email}
                    {email.emailVerified
                      ? <Badge color="green">Verified</Badge>
                      : <Badge>Unverified</Badge>}
                  </div>
                  {!email.emailVerified && (
                    <Button
                      outline
                      onClick={() =>
                        resend.mutateAsync({
                          emailId: email.id,
                        })}
                    >
                      Resend verification
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
