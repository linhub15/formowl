import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { string, z } from "zod";

const request = z.object({
  cloudflareTurnstileId: string().uuid(),
}).optional();

export type GetTurnstileRequest = z.infer<typeof request>;

export const getTurnstileFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: GetTurnstileRequest) => request.parse(data))
  .handler(async ({ context }) => {
    const result = await db.query.cloudflareTurnstile.findFirst({
      where: (turnstile, { and, eq }) =>
        and(
          // only 1 per org for now
          eq(turnstile.organizationId, context.activeOrgId),
        ),
    });
    return result;
  });
