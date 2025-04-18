import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const request = z.object({
  formSubmissionId: z.string(),
});

type GetSubmissionRequest = z.infer<typeof request>;

export const getSubmissionFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: GetSubmissionRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    const submission = await db.query.formSubmission.findFirst({
      where: (submission, { and, eq }) =>
        and(
          eq(submission.id, data.formSubmissionId),
          eq(submission.organizationId, context.activeOrgId),
        ),
    });

    return submission;
  });
