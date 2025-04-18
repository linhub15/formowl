import { db } from "@/db/database";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requestEmailVerification } from "../server_actions/request_email_verification";

const request = z.object({
  emailId: z.string().uuid(),
});

export type ResendEmailVerificationRequest = z.infer<typeof request>;

export const resendEmailVerificationFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: ResendEmailVerificationRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.transaction(async (transaction) => {
      const email = await transaction.query.email.findFirst({
        columns: { email: true },
        where: (email, { eq }) => eq(email.id, data.emailId),
      });

      if (!email) {
        console.error("email not found, cannot resend verification");
        return transaction.rollback();
      }

      await requestEmailVerification({
        data: {
          emailId: data.emailId,
          email: email.email,
          activeOrgId: context.activeOrgId,
        },
        dependencies: { transaction: transaction },
      });
    });
  });
