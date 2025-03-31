import {
  submitForm,
  submitFormRequest,
} from "@/features/form_management/server_actions/submit_form";
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
      response === "turnstile_failed" || response === "turnstile_missing_token"
    ) {
      return json({ message: response }, { status: 401 });
    }

    if (response === "ok") {
      // todo: show a link for the user to go back to
      return new Response(
        "🎉 Submission received! You can go back on your browser.",
        { status: 200 },
      );
    }

    return json({ message: "not found" }, { status: 404 });
  },
});
