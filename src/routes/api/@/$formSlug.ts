import {
  ON_SUCCESS_REDIRECT_KEY,
  submitForm,
  submitFormRequest,
} from "@/features/form_management/server_actions/submit_form";
import type { LinkProps } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getRequestIP } from "@tanstack/react-start/server";

export const APIRoute = createAPIFileRoute("/api/@/$formSlug")({
  POST: async ({ request, params }) => {
    const ip = getRequestIP({ xForwardedFor: true });

    const req = submitFormRequest.parse({
      formSlug: params.formSlug,
      formData: await request.formData(),
      requestIpAddress: ip,
      requestReferer: request.headers.get("referer") || "",
    });

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
      const hasCustomSuccessRedirect = req.formData.has(
        ON_SUCCESS_REDIRECT_KEY,
      );

      if (hasCustomSuccessRedirect) {
        const urlOrPath = req.formData.get(ON_SUCCESS_REDIRECT_KEY);
        const location = buildCustomSuccessLocation(
          urlOrPath?.toString(),
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
        process.env.VITE_APP_URL,
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
