import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const request = z.object({
  formSlug: z.string(),
});

type Request = z.infer<typeof request>;

export const getFormIdBySlug = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: Request) => request.parse(data))
  .handler(async ({ context, data }) => {
    const form = await db.query.form.findFirst({
      where: (form, { and, eq }) =>
        and(
          eq(form.slug, data.formSlug),
          eq(form.organizationId, context.activeOrgId),
        ),
      columns: { id: true },
    });

    return { formId: form?.id };
  });
