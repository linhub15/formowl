import { db } from "@/db/database";
import { email, form, formSubmission } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
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
    const formIdOrSlug = "formId" in data
      ? eq(form.id, data.formId)
      : eq(form.slug, data.formSlug);

    const result = await db.select({
      ...getTableColumns(form),
      submissionsCount: sql<number>`count(${formSubmission.id})::int`,
      email: email.email,
    })
      .from(form)
      .leftJoin(formSubmission, eq(formSubmission.formId, form.id))
      .leftJoin(email, eq(email.id, form.emailId))
      .where(and(formIdOrSlug, eq(form.organizationId, context.activeOrgId)))
      .groupBy(form.id, email.email)
      .limit(1);

    return result.at(0);
  });
