import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { P, TextLink } from "@/components/ui/text";
import { LoginEmailForm } from "@/features/app_shell/login_email_form";
import {
  GithubOAuthButton,
  GoogleOAuthButton,
} from "@/lib/auth/components/oauth_buttons";
import { BRANDING } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_site/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [status, setStatus] = useState<"pending" | "idle">("idle");
  const { redirect } = Route.useSearch();

  return (
    <Card>
      <CardHeader>
        <Heading className="text-center pb-4">{BRANDING.name}</Heading>
        <P className="text-center">
          No account? No problem, choose an option to get started.
        </P>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          <LoginEmailForm />

          <div className="flex flex-col gap-6">
            <Divider>Or continue with</Divider>
            <GoogleOAuthButton
              redirect={redirect}
              onStatusChange={setStatus}
              disabled={status === "pending"}
            />
            <GithubOAuthButton
              redirect={redirect}
              onStatusChange={setStatus}
              disabled={status === "pending"}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex gap-4 justify-center">
          <TextLink to="/privacy">Privacy policy</TextLink>
          <TextLink to="/terms">Terms of service</TextLink>
        </div>
      </CardFooter>
    </Card>
  );
}
