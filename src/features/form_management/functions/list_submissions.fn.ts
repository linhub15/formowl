import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const request = z.object({
  formSlug: z.string(),
  limit: z.number().optional(),
});

type ListSubmissionsRequest = z.infer<typeof request>;

export const listSubmissionsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: ListSubmissionsRequest) => request.parse(data))
  .handler(async ({ data, context }) => {
    const form = await db.query.form.findFirst({
      columns: { id: true },
      where: (f, { eq, and }) =>
        and(
          eq(f.slug, data.formSlug),
          eq(f.organizationId, context.activeOrgId),
        ),
    });

    if (!form) {
      // either the form doesn't exist or user org doesn't match.
      throw new Error("Form not found");
    }

    const submissions = await db.query.formSubmission.findMany({
      where: (submission, { and, eq }) =>
        and(
          eq(submission.formId, form.id),
          eq(submission.organizationId, context.activeOrgId),
        ),
      orderBy: (submission, { desc }) => desc(submission.createdAt),
      limit: data.limit ?? 10,
    });

    return submissions;
  });
