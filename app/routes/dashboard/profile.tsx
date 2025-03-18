import { GoogleIcon } from "@/components/icons/google_icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { Field, Label } from "@/components/ui/fieldset";
import { P } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { useAccounts } from "@/lib/auth/hooks/use_accounts";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute } from "@tanstack/react-router";

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
      <div>
        <Heading>Profile</Heading>
      </div>
      <Card>
        <CardHeader>
          Your email
        </CardHeader>

        <CardBody>
          <Field>
            <Label className="space-x-2">
              <span>Email address</span>
              {user.emailVerified &&
                <Badge color="green">Verified</Badge>}
            </Label>
            <Input type="text" value={user.email} disabled />
          </Field>
        </CardBody>

        <CardFooter>
          {user.accounts?.map((a) => (
            <div className="flex gap-2" key={a.provider}>
              {a.provider === "google" && <GoogleIcon />}
              <P>
                <span className="capitalize">
                  {a.provider}
                </span>
                <span>&nbsp;account connected</span>
              </P>
            </div>
          ))}
        </CardFooter>
      </Card>
    </section>
  );
}
