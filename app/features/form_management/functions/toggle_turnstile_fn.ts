import { db } from "@/db/database";
import { cloudflareTurnstile, form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  formId: z.string().uuid(),
  cloudflareTurnstileId: z.string().uuid().optional(),
});

export type ToggleFormTurnstileRequest = z.infer<typeof request>;
export const toggleFormTurnstileFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: ToggleFormTurnstileRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    if (!data.cloudflareTurnstileId) {
      /// Disable form turnstile
      await db
        .update(form)
        .set({ cloudflareTurnstileId: null })
        .where(
          and(
            eq(form.id, data.formId),
            eq(form.organizationId, context.activeOrgId),
          ),
        );

      return;
    }

    /// Enable form turnstile
    const id = await db.query.cloudflareTurnstile.findFirst({
      columns: { id: true },
      where: and(
        eq(cloudflareTurnstile.id, data.cloudflareTurnstileId),
        eq(cloudflareTurnstile.organizationId, context.activeOrgId),
      ),
    });

    if (!id) {
      throw new Error("Cloudflare Turnstile not found, or not owned by org");
    }

    await db
      .update(form)
      .set({ cloudflareTurnstileId: data.cloudflareTurnstileId })
      .where(
        and(
          eq(form.id, data.formId),
          eq(form.organizationId, context.activeOrgId),
        ),
      );
  });
