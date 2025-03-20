import { db } from "@/db/database";
import { form, formSubmission } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { eq, getTableColumns } from "drizzle-orm";

export const listFormsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = db.select({
      ...getTableColumns(form),
      submissionsCount: db.$count(formSubmission).as("submissionsCount"),
    })
      .from(form)
      .innerJoin(formSubmission, eq(formSubmission.formId, form.id))
      .where(eq(form.organizationId, context.organizationId))
      .groupBy(form.id);

    return result;
  });
