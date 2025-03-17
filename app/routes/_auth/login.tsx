import { authClient } from "@/lib/auth/auth.client";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchParams = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  validateSearch: (search) => searchParams.parse(search),
});

function RouteComponent() {
  const { redirect } = Route.useSearch();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 space-y-8">
          <div className="text-center">
            <h1 className="text-indigo-600 text-2xl italics">
              Form Owl
            </h1>
            <p className="py-4">Login or Create your account</p>
          </div>

          <OAuthSection redirect={redirect} />
        </div>
      </div>
    </div>
  );
}

function OAuthSection(props: { redirect?: string }) {
  const signInGoogle = useMutation({
    mutationFn: async () => {
      authClient.signIn.social({
        provider: "google",
        callbackURL: props.redirect,
        scopes: [
          // "https://www.googleapis.com/auth/calendar.events",
          // "https://www.googleapis.com/auth/calendar.readonly",
        ],
      });
      // await supabase.auth.signInWithOAuth({
      //   provider: "google",
      //   options: {
      //     redirectTo: props.redirect,
      //     scopes: [
      //       "https://www.googleapis.com/auth/calendar.events",
      //       "https://www.googleapis.com/auth/calendar.readonly",
      //     ].join(" "),
      //     /**
      //      * Get's refresh tokens can expire, that can expire.
      //      * https://developers.google.com/identity/protocols/oauth2#expiration
      //      */
      //     queryParams: {
      //       access_type: "offline",
      //       prompt: "consent",
      //     },
      //   },
      // });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <button
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          type="button"
          onClick={() => signInGoogle.mutateAsync()}
        >
          <span className="text-sm font-semibold leading-6">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
