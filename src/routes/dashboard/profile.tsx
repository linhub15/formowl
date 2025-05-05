import { GoogleIcon } from "@/components/icons/google_icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { Description, Field, Label } from "@/components/ui/fieldset";
import { P } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useAccounts } from "@/lib/auth/hooks/use_accounts";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute } from "@tanstack/react-router";
import { GithubIcon } from "@/components/icons/github_icon";
import { SectionHeader } from "@/components/layout/section_header";
import { BETTERAUTH } from "@/lib/auth/better_auth.const";
import { ChangePasswordFormDialog } from "@/features/user/change_password_form_dialog";

export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending: isPendingSession } = useSession();
  const { data: accounts, isPending: isPendingAccounts } = useAccounts();
  const user = { ...session?.user, accounts: accounts };
  const isPending = isPendingSession || isPendingAccounts;

  if (!user) {
    return null;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-8">
      <SectionHeader heading="Profile" />

      <Card>
        <CardHeader>Account Information</CardHeader>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-6">
            <Field className="w-full">
              <Label className="space-x-2">
                <span>Email address</span>
                {user.emailVerified
                  ? <Badge color="green">Verified</Badge>
                  : <Badge>Requires verification</Badge>}
              </Label>
              <Input
                type="text"
                value={user.email}
                disabled
              />
              {!user.emailVerified && (
                <Description>
                  Check your email for a verification link.
                </Description>
              )}
            </Field>

            <Field className="w-full">
              <Label>Name</Label>
              <Input type="text" value={user.name} disabled />
            </Field>
          </div>
        </CardBody>

        <CardFooter>
          <div className="space-y-2">
            {user.accounts?.map((a) => (
              <div className="flex gap-2 items-center" key={a.provider}>
                {a.provider === BETTERAUTH.oauth.google && <GoogleIcon />}
                {a.provider === BETTERAUTH.oauth.google && <GithubIcon />}
                <P>
                  <span className="capitalize">
                    {a.provider}
                  </span>
                  <span>&nbsp;account connected</span>
                </P>
                {a.provider === BETTERAUTH.credential && (
                  <ChangePasswordFormDialog />
                )}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
