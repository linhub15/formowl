import type { DbTransaction } from "@/db/database";
import { emailVerification } from "@/db/schema";
import { mailer } from "@/lib/email/mailer";
import { nanoid } from "@/lib/utils/nanoid";

type Args = {
  data: { emailId: string; email: string; activeOrgId: string };
  dependencies: {
    transaction: DbTransaction;
  };
};

export async function requestEmailVerification(
  { data, dependencies: { transaction } }: Args,
) {
  const existingPendingVerification = await transaction.query.emailVerification
    .findFirst({
      with: {
        email: { columns: { email: true } },
      },
      where: (verification, { and, eq, lt }) =>
        and(
          eq(verification.emailId, data.emailId),
          eq(verification.organizationId, data.activeOrgId),
          lt(verification.expiresAt, new Date()),
        ),
    });

  if (existingPendingVerification) {
    await sendVerificationEmail({
      email: existingPendingVerification.email.email,
      organizationId: existingPendingVerification.organizationId,
      token: existingPendingVerification.token,
    });

    return;
  }

  const token = nanoid(32);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 2);

  await transaction
    .insert(emailVerification)
    .values({
      emailId: data.emailId,
      organizationId: data.activeOrgId,
      expiresAt: expiresAt,
      token: token,
    });

  await sendVerificationEmail({
    email: data.email,
    organizationId: data.activeOrgId,
    token: token,
  });
}

async function sendVerificationEmail(
  { email, organizationId, token }: {
    email: string;
    organizationId: string;
    token: string;
  },
) {
  const verifyUrl = new URL(
    `api/emails/verify/${organizationId}/${token}`,
    process.env.VITE_APP_URL,
  );

  await mailer.verifyExternalEmail({
    to: email,
    verifyUrl: verifyUrl,
  });
}
