import { createFileRoute, redirect } from "@tanstack/react-router";
import { Route as SubmissionRoute } from "./submissions";

export const Route = createFileRoute("/dashboard/forms/$formSlug/")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: SubmissionRoute.to, params });
  },
});
