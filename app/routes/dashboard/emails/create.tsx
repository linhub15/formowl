import { SectionHeader } from "@/components/layout/section_header";
import { CreateEmailForm } from "@/features/email_management/create_email.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/emails/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <SectionHeader
        heading="Add email"
        breadcrumbs={[{ title: "Emails", to: "/dashboard/emails" }]}
      />

      <CreateEmailForm />
    </div>
  );
}
