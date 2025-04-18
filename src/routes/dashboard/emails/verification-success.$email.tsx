import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/emails/verification-success/$email",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { email } = Route.useParams();
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader>
          ✅ Email verified
        </CardHeader>
        <CardBody>
          <code>{email}</code>
        </CardBody>
        <CardFooter>
          <Button to="/dashboard/emails">Back to emails</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
