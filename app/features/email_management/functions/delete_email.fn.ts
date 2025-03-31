import { db } from "@/db/database";
import { email } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  id: z.string().uuid(),
});

export type DeleteEmailRequest = z.infer<typeof request>;

export const deleteEmailFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: string }) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.delete(email).where(
      and(eq(email.id, data.id), eq(email.organizationId, context.activeOrgId)),
    );
  });
