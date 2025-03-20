import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";

const byId = z.object({
  formId: z.string(),
});

const bySlug = z.object({
  formSlug: z.string(),
});

const request = z.union([byId, bySlug]);

export type GetFormRequest = z.infer<typeof request>;

export const getFormFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: GetFormRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    const whereClause = "formId" in data
      ? eq(form.id, data.formId)
      : eq(form.slug, data.formSlug);

    const result = await db.query.form.findFirst({
      with: { submissions: true },
      where: (f, { eq, and }) =>
        and(
          whereClause,
          eq(f.organizationId, context.activeOrgId),
        ),
    });

    if (!result) {
      return;
    }

    return result;
  });
