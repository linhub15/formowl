import { Card, CardBody } from "@/components/layout/card";
import { Heading } from "@/components/ui/heading";
import { CreateForm } from "@/features/form_management/create_form.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <Heading>New form</Heading>
      <CreateForm />
    </div>
  );
}
