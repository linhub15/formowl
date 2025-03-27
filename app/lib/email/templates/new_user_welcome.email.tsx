import {
  Body,
  Button,
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

const links = ["View pricing", "Read the docs", "Contact an expert"];

type Props = {
  dashboardUrl: string;
};
function NewUserWelcomeEmail({ dashboardUrl = "#" }: Props) {
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
          <Preview>Welcome to Form Owl!</Preview>
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to Form Owl!
            </Heading>

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

export default NewUserWelcomeEmail;
