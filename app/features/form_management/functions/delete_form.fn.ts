import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  formId: z.string(),
});

export type DeleteFormRequest = z.infer<typeof request>;

export const deleteFormFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: DeleteFormRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.delete(form).where(
      and(
        eq(form.id, data.formId),
        eq(form.organizationId, context.organizationId),
      ),
    );
  });
