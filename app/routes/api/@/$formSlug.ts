import {
  submitForm,
  submitFormRequest,
} from "@/features/form_management/server_actions/submit_form";
import type { LinkProps } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getRequestIP } from "@tanstack/react-start/server";

export const APIRoute = createAPIFileRoute("/api/@/$formSlug")({
  POST: async ({ request, params }) => {
    const ip = getRequestIP();

    const req = submitFormRequest.parse({
      formSlug: params.formSlug,
      formData: await request.formData(),
      requestIpAddress: ip,
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
      const location = new URL(
        "/form/submission-received" satisfies LinkProps["to"],
        process.env.VITE_APP_URL,
      );
      const referer = request.headers.get("referer");

      if (referer) {
        location.searchParams.set("referer", referer);
      }

      return new Response(null, {
        status: 303,
        headers: {
          Location: location.toString(),
        },
      });
    }

    return json({ message: "not found" }, { status: 404 });
  },
});
