import { ResultAsync, type Result } from "neverthrow";
import type { Mailer, SendArgs } from "./mailer.types";
import nodemailer from "nodemailer";
import { env } from "@/env.server";

export class NodeMailer implements Mailer {
  #transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: +env.SMTP_PORT,
    secure: env.SMTP_SECURE === "true",
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });

  async send(args: SendArgs): Promise<Result<void, string>> {
    return await ResultAsync.fromPromise(
      this.#transport.sendMail({
        from: env.EMAIL_FROM,
        ...args,
      }),
      (error) => {
        console.error("Failed to send email", {
          to: args.to,
          subject: args.subject,
          error,
        });

        return "Failed to send email";
      },
    ).map((info) => {
      console.info("Message sent: %s", info.messageId);
    });
  }
}
