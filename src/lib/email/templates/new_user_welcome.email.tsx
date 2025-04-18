import { Button, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email.layout";

type Props = {
  dashboardUrl: string;
};

function NewUserWelcomeEmail({ dashboardUrl = "#" }: Props) {
  return (
    <EmailLayout heading="Welcome to Form Owl!">
      <Section className="py-6">
        <Row>
          <Text className="text-base text-center">
            You're ready to start making forms.
          </Text>
        </Row>
      </Section>

      <Section className="text-center">
        <Button
          className="bg-brand text-white rounded-lg py-3 px-[18px]"
          href={dashboardUrl}
        >
          Go to your dashboard
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default NewUserWelcomeEmail;
