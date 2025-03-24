import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Field, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { P } from "@/components/ui/text";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/waitlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <div className="max-w-lg mx-auto">
        <Heading>
          Nice, you're ready before we are!
        </Heading>
        <P className="py-4 text-base sm:text-lg">
          Please fill out our form 😉 and we'll let you know when we're up and
          running.
        </P>

        <form>
          <Card className="my-8">
            <CardBody>
              <Field>
                <Label>Email</Label>
                <Input type="email" disabled />
              </Field>
            </CardBody>
            <CardFooter>
              <Button disabled>Waitlist me!</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Container>
  );
}
