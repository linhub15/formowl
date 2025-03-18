import { Heading } from "@/components/ui/heading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return (
    <div>
      <Heading>Forms {params.formId}</Heading>
    </div>
  );
}
