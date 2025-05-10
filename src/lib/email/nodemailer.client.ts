import { err, ok, type Result } from "neverthrow";
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
    try {
      const info = await this.#transport.sendMail({
        from: env.EMAIL_FROM,
        ...args,
      });

      console.info("Message sent: %s", info.messageId);

      return ok();
    } catch (error) {
      return err("Failed to send email");
    }
  }
}
