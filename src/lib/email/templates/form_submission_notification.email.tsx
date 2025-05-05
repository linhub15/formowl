import { Heading, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email.layout";

type Props = {
  formSubmissionUrl: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formData: Record<string, any>;
  formName: string;
};
function FormSubmissionNotificationEmail(
  {
    formSubmissionUrl = "#",
    formData = {},
    formName = "",
  }: Props,
) {
  return (
    <EmailLayout heading={`New form submission for: ${formName}`}>
      <Section className="py-6">
        <Row>
          {Object.entries(formData).map(([key, value]) => {
            return (
              <div key={key} className="pb-2">
                <Heading as="h3">{key}</Heading>
                <Text>{value}</Text>
              </div>
            );
          })}
        </Row>
      </Section>
    </EmailLayout>
  );
}

export default FormSubmissionNotificationEmail;
