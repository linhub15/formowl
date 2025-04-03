import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";

export const listOrganizationEmailsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const memberEmails = await db.query.member.findMany({
      columns: {},
      with: {
        user: { columns: { email: true } },
      },
      where: (member, { eq }) => eq(member.organizationId, context.activeOrgId),
    });

    const orgEmails = await db.query.email.findMany({
      columns: { id: true, email: true, emailVerified: true },
      with: {
        forms: { columns: { id: true } },
        emailVerifications: {
          columns: { expiresAt: true },
          where: (verification, { lt }) =>
            lt(verification.expiresAt, new Date()),
          orderBy: (verification, { desc }) => [desc(verification.expiresAt)],
          limit: 1,
        },
      },
      where: (email, { eq }) => eq(email.organizationId, context.activeOrgId),
    });

    const response = {
      memberEmails: memberEmails,
      organizationEmails: orgEmails,
    };

    return response;
  });
