import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import type { PropsWithChildren } from "react";

type Props = {
  heading: string;
} & PropsWithChildren;

export function EmailLayout({ heading, children }: Props) {
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
          <Preview>{heading}</Preview>
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              {heading}
            </Heading>
            {children}
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
