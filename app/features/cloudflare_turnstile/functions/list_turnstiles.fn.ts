import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";

export const listTurnstilesFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = await db.query.cloudflareTurnstile.findMany({
      where: (turnstile, { eq }) =>
        eq(turnstile.organizationId, context.activeOrgId),
    });

    return result;
  });
