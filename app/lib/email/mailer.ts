import type { Mailer } from "./mailer.types";
import { NodeMailer } from "./nodemailer.client";

const nodeMailer = new NodeMailer();

export const mailer: Mailer = nodeMailer;
