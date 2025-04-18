import { db } from "@/db/database";
import { cloudflareTurnstile, form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const upsertTurnstileRequest = z.object({
  turnstileId: z.string().uuid().optional(),
  siteKey: z.string(),
  secretKey: z.string(),
});

export type UpsertTurnstileRequest = z.infer<typeof upsertTurnstileRequest>;

export const upsertTurnstileFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: UpsertTurnstileRequest) =>
    upsertTurnstileRequest.parse(data)
  )
  .handler(async ({ context, data }) => {
    if (data.turnstileId) {
      await db.update(cloudflareTurnstile)
        .set({
          siteKey: data.siteKey,
          secretKey: data.secretKey,
        })
        .where(
          and(
            eq(cloudflareTurnstile.id, data.turnstileId),
            eq(
              cloudflareTurnstile.organizationId,
              context.activeOrgId,
            ),
          ),
        );
      return;
    }

    await db.transaction(async (transaction) => {
      const inserted = await transaction
        .insert(cloudflareTurnstile)
        .values({
          id: data.turnstileId,
          organizationId: context.activeOrgId,
          siteKey: data.siteKey,
          secretKey: data.secretKey,
        })
        .returning({ id: cloudflareTurnstile.id });
    });
  });
