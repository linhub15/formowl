import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";

export const listFormsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = await db.query.form.findMany({
      where: ((f, { eq }) => eq(f.organizationId, context.organizationId)),
    });

    return result;
  });
