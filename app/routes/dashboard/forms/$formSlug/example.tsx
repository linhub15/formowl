import { CodeBlock } from "@/components/ui/code_block";
import { useFormActionUrl } from "@/features/form_management/hooks/use_form_action_url";
import { createFileRoute } from "@tanstack/react-router";
import Template from "./-example_form.template.html?raw";
import { Subheading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";

export const Route = createFileRoute("/dashboard/forms/$formSlug/example")({
  component: RouteComponent,
});

function RouteComponent() {
  const { formSlug } = Route.useParams();
  const url = useFormActionUrl({ formSlug: formSlug });

  const example = buildExampleFormHtml({ formUrl: url.href });

  return (
    <div className="space-y-16">
      <section>
        <Subheading>Example</Subheading>
        <P>Here's a basic example in HTML.</P>
        <div>
          <CodeBlock code={example} language="html" showCopyButton />
        </div>
      </section>
    </div>
  );
}

function buildExampleFormHtml(args: { formUrl: string }): string {
  return Template.replace("{form_url}", args.formUrl);
}
