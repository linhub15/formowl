import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/forms/create"!</div>;
}
