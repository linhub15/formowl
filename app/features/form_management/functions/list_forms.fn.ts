import { db } from "@/db/database";
import { createServerFn } from "@tanstack/react-start";

export const listFormsFn = createServerFn({ method: "GET" })
  .middleware([]) // todo: implement middleware to get orgId
  .handler(async ({ context }) => {
    // todo: implement this
    await db.query.form.findMany();
  });
