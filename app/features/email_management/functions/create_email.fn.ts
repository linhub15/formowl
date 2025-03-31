import { member, user } from "@/db/auth_schema";
import { db } from "@/db/database";
import { email } from "@/db/schema";
import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import { requestEmailVerification } from "../server_actions/request_email_verification";

const request = createInsertSchema(email).pick({
  email: true,
}).transform((data) => ({
  email: data.email.toLowerCase().trim(),
}));
export type CreateEmailRequest = z.infer<typeof request>;

export const createEmailFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: CreateEmailRequest) => request.parse(data))
  .handler(async ({ context, data }) => {
    await db.transaction(async (transaction) => {
      const emails = await transaction.query.email.findMany({
        columns: { id: true },
        with: { organization: { columns: { id: true } } },
        where: and(
          eq(email.email, data.email),
          eq(email.organizationId, context.activeOrgId),
        ),
      });

      if (emails.length > 0) {
        console.info("Cannot add email; Email already exists for this org");
        return transaction.rollback();
      }

      const userEmails = await transaction.select().from(member)
        .innerJoin(user, eq(user.id, member.userId))
        .where(and(
          eq(member.organizationId, context.activeOrgId),
          eq(user.email, data.email),
        ));

      if (userEmails.length > 0) {
        console.info("Cannot add email; User with this email exists.");
        return transaction.rollback();
      }

      const inserted = await transaction.insert(email).values({
        email: data.email,
        organizationId: context.activeOrgId,
      }).returning({ id: email.id });

      const emailId = inserted.at(0)?.id;
      if (!emailId) {
        console.info("Email insert did not return ID");
        return transaction.rollback();
      }

      await requestEmailVerification({
        data: {
          emailId: emailId,
          email: data.email,
          activeOrgId: context.activeOrgId,
        },
        dependencies: { transaction: transaction },
      });
    });
  });
