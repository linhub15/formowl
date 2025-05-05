import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { A, P } from "@/components/ui/text";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  referer: z.string().url(),
});

export const Route = createFileRoute("/form/submission-received")({
  validateSearch: (search) => {
    return searchSchema.parse(search);
  },
  component: RouteComponent,
  headers: () => ({
    "Access-Control-Allow-Origin": "*",
  }),
});

function RouteComponent() {
  const { referer } = Route.useSearch();
  return (
    <Container>
      <div className="max-w-sm mx-auto">
        <Card>
          <CardBody>
            <Heading className="text-center py-8">🎉 Form submitted!</Heading>
          </CardBody>
          <CardFooter className="text-center">
            {referer
              ? (
                <A href={referer}>
                  Return to site
                </A>
              )
              : <P>Use your browser back button to return to site</P>}
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
