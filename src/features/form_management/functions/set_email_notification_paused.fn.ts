import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  formId: z.string().uuid(),
  isPaused: z.boolean(),
});

export type SetEmailNotificationPausedRequest = z.infer<typeof request>;

export const setEmailNotificationPausedFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: SetEmailNotificationPausedRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.update(form)
      .set({ isEmailNotificationsPaused: data.isPaused })
      .where(
        and(
          eq(form.id, data.formId),
          eq(form.organizationId, context.activeOrgId),
        ),
      );
  });
