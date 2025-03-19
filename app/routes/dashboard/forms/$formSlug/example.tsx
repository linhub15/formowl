import { useFormActionUrl } from "@/features/form_management/hooks/use_form_action_url";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/example")({
  component: RouteComponent,
});

function RouteComponent() {
  const { formSlug } = Route.useParams();
  const url = useFormActionUrl({ formSlug: formSlug });

  return (
    <div>
      <form action={url.href} method="POST">
        <input type="text" name="random" value="yes" />
        <button type="submit">Test submit</button>
      </form>
    </div>
  );
}
