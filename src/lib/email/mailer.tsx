import { NodeMailer } from "./nodemailer.client";
import { render } from "@react-email/components";
import NewUserWelcomeEmail from "./templates/new_user_welcome.email";
import FormSubmissionNotificationEmail from "./templates/form_submission_notification.email";
import VerifyExternalEmail from "./templates/verify_external_email.email";
import VerifyAccountEmail from "./templates/verify_account_email.email";

const nodeMailer = new NodeMailer();

export const mailer = {
  // todo: write a test case to check email links are correct
  welcome: async (args: { to: string; dashboardUrl: URL }) => {
    return await nodeMailer.send({
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
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      formData: Record<string, any>;
      formName: string;
    },
  ) => {
    return await nodeMailer.send({
      to: args.to,
      subject: `Form Owl: New submission for "${args.formName}"`,
      html: await render(
        <FormSubmissionNotificationEmail
          formData={args.formData}
          formSubmissionUrl={args.formSubmissionUrl.href}
          formName={args.formName}
        />,
      ),
    });
  },
  verifyExternalEmail: async (args: {
    to: string;
    verifyUrl: URL;
  }) => {
    return await nodeMailer.send({
      to: args.to,
      subject: "Form Owl: verify your email",
      html: await render(
        <VerifyExternalEmail verifyUrl={args.verifyUrl.href} />,
      ),
    });
  },
  verifyAccountEmail: async (args: {
    to: string;
    verifyUrl: string;
  }) => {
    return await nodeMailer.send({
      to: args.to,
      subject: "Form Owl: verify your email",
      html: await render(
        <VerifyAccountEmail verifyUrl={args.verifyUrl} />,
      ),
    });
  },
};
