import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  formId: z.string().uuid(),
  email: z.string().email(),
});

export type SetFormEmailRequest = z.infer<typeof request>;

export const setFormEmailFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: SetFormEmailRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    const externalEmail = await db.query.email.findFirst({
      columns: { id: true },
      where: (email, { and, eq }) =>
        and(
          eq(email.email, data.email),
          eq(email.organizationId, context.activeOrgId),
        ),
    });

    // if not found then set it to `undefined` which defaults to profile email

    await db.update(form).set({ emailId: externalEmail?.id ?? null })
      .where(
        and(
          eq(form.id, data.formId),
          eq(form.organizationId, context.activeOrgId),
        ),
      );
  });
