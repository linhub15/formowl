import { err, ok, type Result } from "neverthrow";
import type { Mailer, SendArgs } from "./mailer.types";
import nodemailer from "nodemailer";

export class NodeMailer implements Mailer {
  #transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async send(args: SendArgs): Promise<Result<void, string>> {
    try {
      const info = await this.#transport.sendMail({
        from: process.env.EMAIL_FROM,
        ...args,
      });

      console.info("Message sent: %s", info.messageId);

      return ok();
    } catch (error) {
      return err("Failed to send email");
    }
  }
}
