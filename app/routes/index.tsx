import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Marketing Page</h1>
      <Link className="underline" to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
