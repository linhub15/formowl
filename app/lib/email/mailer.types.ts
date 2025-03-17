export type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export interface Mailer {
  send: (args: SendArgs) => Promise<void>;
}
