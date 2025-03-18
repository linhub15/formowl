import { GithubIcon } from "@/components/icons/github_icon";
import { GoogleIcon } from "@/components/icons/google_icon";
import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Heading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";
import { authClient } from "@/lib/auth/auth.client";
import { getSessionFn } from "@/lib/auth/get_session.fn";
import { BRANDING } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  type LinkProps,
  redirect,
} from "@tanstack/react-router";
import { z } from "zod";

const searchParams = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_site/login")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
  validateSearch: (search) => searchParams.parse(search),
});

function RouteComponent() {
  const { redirect } = Route.useSearch();

  const login = useMutation({
    mutationFn: async (args: { provider: "google" | "github" }) => {
      await authClient.signIn.social({
        provider: args.provider,
        callbackURL: redirect,
        newUserCallbackURL: "/onboard" satisfies LinkProps["to"],
        scopes: [],
      });
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-6">
              <Heading className="text-center">{BRANDING.name}</Heading>
              <P className="text-center">
                Login providers
              </P>
              <GoogleOAuthButton
                login={() => login.mutateAsync({ provider: "google" })}
              />
              {/* <GithubOAuthButton */}
            </div>
          </CardBody>
          <CardFooter>
            <P>
              No account? No worries! Clicking the button also signs you up.
            </P>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

type OAuthButtonProps = {
  login: () => Promise<void> | void;
};

function GoogleOAuthButton(props: OAuthButtonProps) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer"
      type="button"
      onClick={props.login}
    >
      <GoogleIcon />
      <span className="text-sm/6 font-semibold">Google</span>
    </button>
  );
}

function GithubOAuthButton(props: OAuthButtonProps) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer"
      type="button"
      onClick={props.login}
    >
      <GithubIcon className="size-5 fill-[#24292F]" aria-hidden="true" />
      <span className="text-sm/6 font-semibold">GitHub</span>
    </button>
  );
}
