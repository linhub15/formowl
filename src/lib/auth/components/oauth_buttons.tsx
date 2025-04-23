import { GithubIcon } from "@/components/icons/github_icon";
import { GoogleIcon } from "@/components/icons/google_icon";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import { authClient } from "@/lib/auth/auth.client";
import { cn } from "@/lib/utils/cn";
import { useMutation } from "@tanstack/react-query";
import type { LinkProps } from "@tanstack/react-router";
import { useState } from "react";
import { BETTERAUTH } from "../better_auth.const";

type OAuthButtonProps = {
  redirect?: string;
  onStatusChange?: (status: "pending" | "idle") => void;
  disabled?: boolean;
};

const oAuthStyle = cn([
  "flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs",
  "ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer",
]);

export function GoogleOAuthButton(
  { redirect, onStatusChange, disabled }: OAuthButtonProps,
) {
  const [pending, setPending] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({
        provider: BETTERAUTH.oauth.google,
        callbackURL: redirect ?? "/dashboard" satisfies LinkProps["to"],
        newUserCallbackURL: "/onboard" satisfies LinkProps["to"],
        scopes: [],
        fetchOptions: {
          onRequest: () => {
            setPending(true);
            onStatusChange?.("pending");
          },
          onError: () => {
            setPending(false);
            onStatusChange?.("idle");
          },
        },
      });
    },
  });

  const isPendingOrNavigating = pending || isPending;

  return (
    <button
      className={oAuthStyle}
      type="button"
      onClick={() => mutateAsync()}
      disabled={isPendingOrNavigating || disabled}
    >
      {isPendingOrNavigating ? <LoadingSpinner /> : (
        <>
          <GoogleIcon />
          <span className="text-sm/6 font-semibold">Google</span>
        </>
      )}
    </button>
  );
}

export function GithubOAuthButton(
  { redirect, onStatusChange, disabled }: OAuthButtonProps,
) {
  const [pending, setPending] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({
        provider: BETTERAUTH.oauth.github,
        callbackURL: redirect ?? "/dashboard" satisfies LinkProps["to"],
        newUserCallbackURL: "/onboard" satisfies LinkProps["to"],
        scopes: [],
        fetchOptions: {
          onRequest: () => {
            setPending(true);
            onStatusChange?.("pending");
          },
          onError: () => {
            setPending(false);
            onStatusChange?.("idle");
          },
        },
      });
    },
  });

  const isPendingOrNavigating = pending || isPending;

  return (
    <button
      className={oAuthStyle}
      type="button"
      onClick={() => mutateAsync()}
      disabled={isPendingOrNavigating || disabled}
    >
      {isPendingOrNavigating ? <LoadingSpinner /> : (
        <>
          <GithubIcon className="size-5 fill-[#24292F]" aria-hidden="true" />
          <span className="text-sm/6 font-semibold">GitHub</span>
        </>
      )}
    </button>
  );
}
