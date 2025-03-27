import { NodeMailer } from "./nodemailer.client";
import { render } from "@react-email/components";
import NewUserWelcomeEmail from "./templates/new_user_welcome.email";
import FormSubmissionNotificationEmail from "./templates/form_submission_notification.email";

const nodeMailer = new NodeMailer();

export const mailer = {
  // todo: write a test case to check email links are correct
  welcome: async (args: { to: string; dashboardUrl: URL }) => {
    await nodeMailer.send({
      to: args.to,
      subject: "Welcome to Form Owl!",
      html: await render(
        <NewUserWelcomeEmail dashboardUrl={args.dashboardUrl.href} />,
      ),
    });
  },
  submissionNotification: async (
    args: {
      to: string;
      formSubmissionUrl: URL;
      formData: Record<string, string>;
    },
  ) => {
    await nodeMailer.send({
      to: args.to,
      subject: "New form submitted",
      html: await render(
        <FormSubmissionNotificationEmail
          formData={args.formData}
          formSubmissionUrl={args.formSubmissionUrl.href}
        />,
      ),
    });
  },
};
