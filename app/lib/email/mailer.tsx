import type { Mailer } from "./mailer.types";
import { NodeMailer } from "./nodemailer.client";
import { render } from "@react-email/components";
import NewUserWelcomeEmail from "./templates/new_user_welcome";

const nodeMailer = new NodeMailer();
const mailer: Mailer = nodeMailer;

export const emails = {
  // todo: write a test case to check email links are correct
  welcome: async (args: { to: string; dashboardUrl: URL }) => {
    await mailer.send({
      to: args.to,
      subject: "Welcome to Form Owl!",
      html: await render(
        <NewUserWelcomeEmail dashboardUrl={args.dashboardUrl.href} />,
      ),
    });
  },
};
