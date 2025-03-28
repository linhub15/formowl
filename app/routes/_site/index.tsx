import { Container } from "@/components/layout/container";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { SpinningPyramid } from "@/components/spinning_pyramid";

export const Route = createFileRoute("/_site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <section className="flex flex-col lg:grid grid-cols-2 items-center justify-between min-h-[456px] gap-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-center w-full overflow-clip">
          <SpinningPyramid />
        </div>
        <div className="space-y-6 lg:order-first">
          <div>
            <Badge className="rounded-full" color="green">
              Coming Soon
            </Badge>
            <Heading className="text-5xl sm:text-6xl lg:text-7xl tracking-tight py-6 font-medium">
              Form API
              <br />for startups
            </Heading>
            <p>
              Perfect for waitlists, user feedback and contact forms.
            </p>
          </div>

          <div className="flex gap-4">
            <Button to="/waitlist">Join the waitlist</Button>
            <Button to="/dashboard" outline>Try the Alpha</Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
