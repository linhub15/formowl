import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const setFormNameRequest = z.object({
  name: z.string(),
  formId: z.string().uuid(),
});

export type SetFormNameRequest = z.infer<typeof setFormNameRequest>;

export const setFormNameFn = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator((data: SetFormNameRequest) => setFormNameRequest.parse(data))
  .handler(async ({ context, data }) => {
    await db.update(form).set({
      name: data.name,
    }).where(and(
      eq(form.id, data.formId),
      eq(form.organizationId, context.activeOrgId),
    ));
  });
