import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/layout/card";
import { Fieldset, Legend } from "@/components/ui/fieldset";
import { P } from "@/components/ui/text";
import { authClient } from "@/lib/auth/auth_client";
import { getSessionFn } from "@/lib/auth/get_session.fn";
import { logClientErrorFn } from "@/lib/posthog/log_client_error.fn";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BRANDING } from "@/lib/constants";
import { nanoid } from "@/lib/utils/nanoid";

export const Route = createFileRoute("/(onboarding)/onboard")({
  beforeLoad: async ({ location }) => {
    const session = await getSessionFn();

    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    if (session.session.activeOrganizationId) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const logClientError = useServerFn(logClientErrorFn);

  const onboard = useMutation({
    mutationFn: async () => {
      const slug = nanoid(8);
      await authClient.organization.create({
        name: "default",
        slug: slug,
      });

      await authClient.organization.setActive({
        organizationSlug: slug,
      });
    },
    onSuccess: async () => {
      await navigate({
        to: "/dashboard",
      });
    },
    onError: async (error) => {
      console.error("Something went wrong:", error);
      try {
        await logClientError({
          data: {
            source: "onboarding_create_organization",
            pathname: location.pathname,
            ...serializeClientError(error),
          },
        });
      } catch (loggingError) {
        console.error("Failed to report onboarding error:", loggingError);
      }

      if (session?.session.token) {
        await authClient.revokeSession({ token: session.session.token });
      }
    },
  });

  if (session?.session.activeOrganizationId) {
    navigate({
      to: "/dashboard",
      replace: true,
    });
  }

  if (onboard.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w- mx-auto min-h-full flex justify-center items-center">
      <Card>
        <CardBody>
          <Fieldset>
            <Legend>Welcome to {BRANDING.name}</Legend>
            <P>
              An account has been created for your email: {session?.user.email}
            </P>
            <P>Are you ready to get started?</P>
          </Fieldset>

          <div className="pt-8">
            <Button onClick={() => onboard.mutateAsync()}>Let's go!</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function serializeClientError(error: unknown) {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };
  }

  return {
    errorName: typeof error,
    errorMessage: typeof error === "string" ? error : String(error),
  };
}
