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

  async send(args: SendArgs): Promise<void> {
    const info = await this.#transport.sendMail({
      from: process.env.EMAIL_FROM,
      ...args,
    });

    console.info("Message sent: %s", info.messageId);
  }
}
