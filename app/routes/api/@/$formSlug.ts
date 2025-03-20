import { db } from "@/db/database";
import { formSubmission } from "@/db/schema";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/@/$formSlug")({
  POST: async ({ request, params }) => {
    const form = await db.query.form.findFirst({
      where: (form, { eq }) => eq(form.slug, params.formSlug),
    });

    if (!form) {
      return json({ message: "Form not found" }, { status: 404 });
    }

    const data = await request.formData();

    await db.insert(formSubmission).values({
      formId: form.id,
      data: Object.fromEntries(data),
    });

    // todo: show a link for the user to go back to
    return new Response(
      "🎉 Submission received! You can go back on your browser.",
      {
        status: 200,
      },
    );
  },
});
