import { db } from "@/db/database";
import { form } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

const request = createInsertSchema(form).pick({
  name: true,
});

export type CreateFormRequest = z.infer<typeof request>;

export const createFormFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: CreateFormRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    const result = await db.insert(form).values({
      ...data,
      organizationId: context.activeOrgId,
    }).returning();

    return result.at(0);
  });
