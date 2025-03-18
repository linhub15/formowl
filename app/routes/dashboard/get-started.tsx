import { Heading } from "@/components/ui/heading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/get-started")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Heading>Get Started</Heading>
    </div>
  );
}
