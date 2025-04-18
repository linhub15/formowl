import type { Result } from "neverthrow";

export type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export interface Mailer {
  send: (args: SendArgs) => Promise<Result<void, string>>;
}
