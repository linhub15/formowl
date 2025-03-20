import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/layout/card";
import { Fieldset, Legend } from "@/components/ui/fieldset";
import { P } from "@/components/ui/text";
import { authClient } from "@/lib/auth/auth.client";
import { useSession } from "@/lib/auth/hooks/use_session";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { BRANDING } from "@/lib/constants";
import { nanoid } from "@/lib/utils/nanoid";

export const Route = createFileRoute("/(onboarding)/onboard")({
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    if (session.data?.session.activeOrganizationId) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const onboard = useMutation({
    mutationFn: async () => {
      const slug = nanoid(10);
      await authClient.organization.create({
        name: `${session?.user.email}-org`,
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
  });

  if (session?.session.activeOrganizationId) {
    navigate({
      to: "/dashboard",
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
            <P>Are you ready to get started?</P>
          </Fieldset>

          <div className="pt-8">
            <Button onClick={() => onboard.mutateAsync()}>
              Let's go!
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
