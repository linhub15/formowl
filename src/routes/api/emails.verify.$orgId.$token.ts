import { db } from "@/db/database";
import { email, emailVerification } from "@/db/schema";
import { emitPostHogErrorLog } from "@/lib/posthog/posthog_logs.server";
import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";

export const Route = createFileRoute("/api/emails/verify/$orgId/$token")({
  server: {
    handlers: {
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
            )
            .returning();

          if (deletedVerification.length > 1) {
            emitPostHogErrorLog(
              new Error("multiple email verifications deleted"),
              {
                body: "email verification failed",
                attributes: {
                  organization_id: orgId,
                  deleted_verification_count: deletedVerification.length,
                },
              },
            );
            return transaction.rollback();
          }

          const deleted = deletedVerification.at(0);

          if (!deleted) {
            // likely because it is already expired or deleted
            emitPostHogErrorLog(
              new Error("email verification token not found"),
              {
                body: "email verification failed",
                attributes: {
                  organization_id: orgId,
                },
              },
            );
            return transaction.rollback();
          }

          await transaction
            .update(email)
            .set({
              emailVerified: true,
            })
            .where(
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
            emitPostHogErrorLog(
              new Error(
                "email not found after deleting verification. Expected email to exist.",
              ),
              {
                body: "email verification failed",
                attributes: {
                  organization_id: orgId,
                  email_id: deleted.emailId,
                },
              },
            );
            return transaction.rollback();
          }

          return found;
        });

        return new Response(undefined, {
          status: 302,
          headers: {
            Location: `/dashboard/emails/verification-success/${emailAddress.email}`,
          },
        });
      },
    },
  },
});
