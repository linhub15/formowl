import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardBody, CardFooter } from "@/components/ui/card";
import { Fieldset, Legend } from "@/components/ui/fieldset";
import { P } from "@/components/ui/text";
import { authClient } from "@/lib/auth/auth.client";
import { useSession } from "@/lib/auth/hooks/use_session";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/onboard")({
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
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
      const slug = "asdf";
      await authClient.organization.create({
        name: `${session?.user.email}-org`,
        slug: slug,
      });

      await authClient.organization.setActive({
        organizationSlug: slug,
      });
    },
    onSuccess: () => {
      navigate({
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
            <Legend>Welcome to Form Owl</Legend>
            <P>Are you ready to get started?</P>
          </Fieldset>

          <div className="pt-8">
            <Button
              className={buttonVariants({ style: "solid" })}
              onClick={() => onboard.mutateAsync()}
            >
              Let's go!
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
