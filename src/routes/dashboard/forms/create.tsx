import { SectionHeader } from "@/components/layout/section_header";
import { CreateFormForm } from "@/features/form_management/create_form.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <SectionHeader
        heading="New Form"
        breadcrumbs={[{ title: "Forms", to: "/dashboard/forms" }]}
      />
      <CreateFormForm />
    </div>
  );
}
