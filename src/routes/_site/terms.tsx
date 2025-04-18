import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <div className="max-w-lg mx-auto space-y-8">
        <Heading>Terms of Service</Heading>
        <ol className="list-decimal space-y-6">
          <li>
            By accessing our service, you agree to comply with these terms and
            our privacy policy.
          </li>
          <li>
            Access and Use of Service:
            <ul className="list-disc ml-6 space-y-2">
              <li>
                You are responsible for maintaining the confidentiality of your
                credentials.
              </li>
              <li>Unauthorized use of the service is prohibited.</li>
            </ul>
          </li>
          <li>
            User Content:
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Users are responsible for the content they submit through our
                service.
              </li>
              <li>
                We reserve the right to remove or refuse content that violates
                these terms or is deemed inappropriate.
              </li>
            </ul>
          </li>
          <li>
            Termination: We may terminate or suspend access to our service at
            any time, without prior notice, for violations of these terms.
          </li>
          <li>
            Disclaimer of Warranties: The service is provided "as is" without
            warranties of any kind.
          </li>
          <li>
            Limitation of Liability: We are not liable for any direct, indirect,
            incidental, consequential, or special damages arising out of or in
            any way connected with the use of our service.
          </li>
          <li>
            Governing Law: These terms are governed by and construed in
            accordance with the laws of Canada.
          </li>
        </ol>
      </div>
    </Container>
  );
}
