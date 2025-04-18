import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <div className="max-w-lg mx-auto space-y-8">
        <Heading>Privacy Policy</Heading>
        <ol className="list-decimal space-y-6">
          <li>
            Information We Collect: We collect information provided during
            onboarding process, including but not limited to name, and email
            address, Also, information about how users interact with our
            service, including log data, device information, and usage patterns.
          </li>

          <li>
            How We Use Your Information: We may use collected data to
            personalize user experience and improve our services.
          </li>

          <li>
            Sharing Your Information: We do not sell or share personally
            identifiable information with third parties, except as required by
            law or with your explicit consent.
          </li>

          <li>
            Security: We implement industry-standard security measures to
            protect your information from unauthorized access, disclosure,
            alteration, and destruction.
          </li>

          <li>
            Data Retention: We retain user data as long as necessary to provide
            our services and for legitimate business purposes.
          </li>

          <li>
            Your Choices: Users can review and request their data be deleted by
            emailing hubert@birdy.dev
          </li>
        </ol>
      </div>
    </Container>
  );
}
