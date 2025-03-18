import { Container } from "@/components/layout/container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      Product landing page
    </Container>
  );
}
