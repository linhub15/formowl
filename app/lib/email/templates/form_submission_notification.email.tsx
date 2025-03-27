import {
  Body,
  Button,
  CodeBlock,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type Props = {
  formSubmissionUrl: string;
  formData: Record<string, unknown>;
};
function FormSubmissionNotificationEmail(
  { formSubmissionUrl, formData = {} }: Props,
) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#eaebeb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans py-10">
          <Preview>You've got a new form submission</Preview>
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              New form submission
            </Heading>

            <Section className="py-6">
              <Row>
                <Text className="text-base text-center">
                  <CodeBlock
                    language="json"
                    code={JSON.stringify(formData, null, 2)}
                    theme={{}}
                  />
                </Text>
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
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              Form Owl is a product of BirdyDev Solutions Ltd.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default FormSubmissionNotificationEmail;
