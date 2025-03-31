import { Button, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email.layout";

type Props = {
  organizationName?: string;
  verifyUrl: string;
};

function VerifyEmailAddressEmail({ verifyUrl = "#" }: Props) {
  return (
    <EmailLayout heading="Verify your email address">
      <Section className="py-6">
        <Row>
          <Text className="text-base text-center">
            Your email has been requested to receive form submission
            notifications. Click the button to verify this email address.
          </Text>
        </Row>
      </Section>

      <Section className="text-center">
        <Button
          className="bg-brand text-white rounded-lg py-3 px-[18px]"
          href={verifyUrl}
        >
          Verify email address
        </Button>

        {/* todo: allow verification recipient to reject the verification */}
      </Section>
    </EmailLayout>
  );
}

export default VerifyEmailAddressEmail;
