import { db } from "@/db/database";
import { formSubmission } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  submissionId: z.string().uuid(),
});

export type DeleteSubmissionRequest = z.infer<typeof request>;

export const deleteSubmissionFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: DeleteSubmissionRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.delete(formSubmission).where(
      and(
        eq(formSubmission.id, data.submissionId),
        eq(formSubmission.organizationId, context.activeOrgId),
      ),
    );
  });
