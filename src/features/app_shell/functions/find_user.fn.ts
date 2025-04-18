import { account, user } from "@/db/auth_schema";
import { db } from "@/db/database";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";

const request = z.object({
  email: z.string().email(),
});

type FindAccountRequest = z.infer<typeof request>;

export const findUserFn = createServerFn({ method: "GET" })
  .middleware([])
  .validator((data: FindAccountRequest) => request.parse(data))
  .handler(async ({ data }) => {
    const found = await db.select({
      id: user.id,
      accountProviders: account.providerId,
    })
      .from(user)
      .innerJoin(account, eq(account.userId, user.id))
      .where(eq(user.email, data.email))
      .limit(1);

    const single = found.at(0);

    if (!single) {
      return { found: false } as const;
    }

    if (single.accountProviders.includes("credential")) {
      return { found: true, usesCredential: true } as const;
    }

    return { found: true, usesCredential: false } as const;
  });
