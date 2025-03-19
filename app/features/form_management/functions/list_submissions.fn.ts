import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const request = z.object({
  formSlug: z.string(),
});

type ListSubmissionsRequest = z.infer<typeof request>;

export const listSubmisisonsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: ListSubmissionsRequest) => request.parse(data))
  .handler(async ({ data, context }) => {
    // Enforce the form belongs to this organization
    const form = await db.query.form.findFirst({
      where: (f, { eq, and }) =>
        and(
          eq(f.slug, data.formSlug),
          eq(f.organizationId, context.organizationId),
        ),
    });

    if (!form) {
      // either the form doesn't exist or user org doesn't match.
      throw new Error("Form not found");
    }

    const submissions = await db.query.formSubmission.findMany({
      where: (submission, { eq }) => eq(submission.formId, form.id),
    });

    return submissions;
  });
