import { Button, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email.layout";

type Props = {
  organizationName?: string;
  verifyUrl: string;
};

function VerifyAccountEmail({ verifyUrl = "#" }: Props) {
  return (
    <EmailLayout heading="Welcome to Form Owl!">
      <Section className="py-6">
        <Row>
          <Text className="text-base text-center">
            Please verify your email address.
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
      </Section>
    </EmailLayout>
  );
}

export default VerifyAccountEmail;
