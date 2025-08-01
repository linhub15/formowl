import { db } from "@/db/database";
import { email, emailVerification } from "@/db/schema";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { getHeaders } from "better-auth/react";
import { and, eq } from "drizzle-orm";

export const ServerRoute = createServerFileRoute(
  "/api/emails/verify/$orgId/$token",
).methods({
  /** note: this is public endpoint, can be an attack vector */
  GET: async ({ params }) => {
    // todo: handle scenarios
    // - token is not found
    // - orgid not found
    // - verification token is expired
    const { orgId, token } = params;

    const emailAddress = await db.transaction(async (transaction) => {
      const deletedVerification = await transaction
        .delete(emailVerification)
        .where(
          and(
            eq(emailVerification.token, token),
            eq(emailVerification.organizationId, orgId),
          ),
        ).returning();

      if (deletedVerification.length > 1) {
        console.error("REALY BAD: multiple email verifications deleted");
        return transaction.rollback();
      }

      const deleted = deletedVerification.at(0);

      if (!deleted) {
        // likely because it is already expired or deleted
        console.error("failed to delete email verification");
        return transaction.rollback();
      }

      await transaction.update(email).set({
        emailVerified: true,
      }).where(
        and(
          eq(email.id, deleted.emailId),
          eq(email.organizationId, orgId),
        ),
      );

      const found = await transaction.query.email.findFirst({
        columns: { email: true },
        where: (email, { eq }) => eq(email.id, deleted.emailId),
      });

      if (!found) {
        console.error(
          "email not found after deleting verification. Expected email to exist.",
        );
        return transaction.rollback();
      }

      return found;
    });

    return new Response(undefined, {
      status: 302,
      headers: {
        Location:
          `/dashboard/emails/verification-success/${emailAddress.email}`,
      },
    });
  },
});
