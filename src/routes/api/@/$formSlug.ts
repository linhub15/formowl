import { env } from "@/env.server";
import {
  ON_SUCCESS_REDIRECT_KEY,
  submitForm,
  submitFormRequest,
} from "@/features/form_management/server_actions/submit_form";
import type { LinkProps } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { getRequestIP } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/@/$formSlug").methods({
  POST: async ({ request, params }) => {
    const ip = getRequestIP({ xForwardedFor: true });

    const req = submitFormRequest.parse({
      formSlug: params.formSlug,
      formData: await request.formData(),
      requestIpAddress: ip,
      requestReferer: request.headers.get("referer") || "",
    });

    const successUrlOrPath = req.formData.get(ON_SUCCESS_REDIRECT_KEY);
    req.formData.delete(ON_SUCCESS_REDIRECT_KEY);

    const response = await submitForm(req);

    if (response === "not_found") {
      return json({ message: "not found" }, { status: 404 });
    }

    if (
      response === "turnstile_failed" ||
      response === "turnstile_missing_token"
    ) {
      return json({ message: response }, { status: 401 });
    }

    if (response === "ok") {
      const hasCustomSuccessRedirect = !!successUrlOrPath;

      if (hasCustomSuccessRedirect) {
        const location = buildCustomSuccessLocation(
          successUrlOrPath?.toString(),
          request.headers.get("origin") ?? undefined,
        );

        if (location) {
          return new Response(null, {
            status: 303,
            headers: {
              Location: location.toString(),
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      }

      // Default redirect
      const location = new URL(
        "/form/submission-received" satisfies LinkProps["to"],
        env.VITE_APP_URL,
      );

      const referer = req.requestReferer;

      if (referer) {
        location.searchParams.set("referer", referer);
      }

      return new Response(null, {
        status: 303,
        headers: {
          Location: location.toString(),
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return json({ message: "not found" }, { status: 404 });
  },
});

function buildCustomSuccessLocation(urlOrPath?: string, baseUrl?: string) {
  if (!urlOrPath) {
    return;
  }

  const isFullyQualifiedUrl = URL.canParse(urlOrPath);

  if (!isFullyQualifiedUrl && !baseUrl) {
    return;
  }

  const location = isFullyQualifiedUrl
    ? new URL(urlOrPath)
    : new URL(urlOrPath, baseUrl); // assume it's a path

  return location;
}
