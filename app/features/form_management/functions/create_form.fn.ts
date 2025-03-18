import { db } from "@/db/database";
import { form } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

const request = createInsertSchema(form);

export type CreateFormRequest = z.infer<typeof request>;

export const createFormFn = createServerFn({ method: "POST" })
  .middleware([])
  .validator((data: CreateFormRequest) => request.parse(data))
  .handler(async ({ data }) => {
    await db.insert(form).values(data);
  });
