import { db } from "@/db/database";
import { formSubmission } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const SUBMISSIONS_PAGE_SIZE = 10;

const request = z.object({
  formId: z.string(),
  page: z.number().int().positive().default(1),
});

export type ListSubmissionsRequest = z.infer<typeof request>;

export const listSubmissionsResponseSchema = z.object({
  submissions: z.array(createSelectSchema(formSubmission)),
  totalCount: z.number().int().nonnegative(),
});

export type ListSubmissionsResponse = z.infer<
  typeof listSubmissionsResponseSchema
>;

export const listSubmissionsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator((data: ListSubmissionsRequest) => request.parse(data))
  .handler(async ({ data, context }) => {
    const form = await db.query.form.findFirst({
      columns: { id: true },
      where: (f, { eq, and }) =>
        and(eq(f.id, data.formId), eq(f.organizationId, context.activeOrgId)),
    });

    if (!form) {
      // either the form doesn't exist or user org doesn't match.
      throw new Error("Form not found");
    }

    const where = and(
      eq(formSubmission.formId, form.id),
      eq(formSubmission.organizationId, context.activeOrgId),
    );

    const [submissions, totalCount] = await Promise.all([
      db.query.formSubmission.findMany({
        where,
        orderBy: (submission, { desc }) => desc(submission.createdAt),
        limit: SUBMISSIONS_PAGE_SIZE,
        offset: (data.page - 1) * SUBMISSIONS_PAGE_SIZE,
      }),
      db.$count(formSubmission, where),
    ]);

    return listSubmissionsResponseSchema.parse({ submissions, totalCount });
  });
