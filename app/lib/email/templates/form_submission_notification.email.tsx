import {
  Button,
  CodeBlock,
  dracula,
  Row,
  Section,
} from "@react-email/components";
import { EmailLayout } from "./email.layout";

type Props = {
  formSubmissionUrl: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formData: Record<string, any>;
};
function FormSubmissionNotificationEmail(
  { formSubmissionUrl = "#", formData = {} }: Props,
) {
  return (
    <EmailLayout heading="You've got a new form submission">
      <Section className="py-6">
        <Row>
          <CodeBlock
            language="json"
            code={JSON.stringify(formData, null, 2)}
            theme={dracula}
          />
        </Row>
      </Section>

      <Section className="text-center">
        <Button
          className="bg-brand text-white rounded-lg py-3 px-[18px]"
          href={formSubmissionUrl}
        >
          View form submission
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default FormSubmissionNotificationEmail;
