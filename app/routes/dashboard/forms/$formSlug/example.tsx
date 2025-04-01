import { createFileRoute } from "@tanstack/react-router";
import { ExampleCard } from "@/features/form_management/example_card";

export const Route = createFileRoute("/dashboard/forms/$formSlug/example")({
  component: RouteComponent,
});

function RouteComponent() {
  const { formSlug } = Route.useParams();

  return (
    <div className="space-y-16">
      <section>
        <ExampleCard formSlug={formSlug} />
      </section>
    </div>
  );
}
