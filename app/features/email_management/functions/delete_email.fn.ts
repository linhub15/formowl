import { db } from "@/db/database";
import { email } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  emailId: z.string().uuid(),
});

export type DeleteEmailRequest = z.infer<typeof request>;

export const deleteEmailFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: DeleteEmailRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    const formIdUsingEmail = await db.query.form.findFirst({
      columns: { id: true },
      where: (form, { and, eq }) =>
        and(
          eq(form.emailId, data.emailId),
          eq(form.organizationId, context.activeOrgId),
        ),
    });

    if (formIdUsingEmail?.id) {
      throw new Error(
        "Email is being used on a form. Make sure to remove the email from all forms before deleting.",
      );
    }

    await db.delete(email).where(
      and(
        eq(email.id, data.emailId),
        eq(email.organizationId, context.activeOrgId),
      ),
    );
  });
