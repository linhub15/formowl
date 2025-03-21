import { CodeBlock } from "@/components/ui/code_block";
import { useFormActionUrl } from "@/features/form_management/hooks/use_form_action_url";
import { createFileRoute } from "@tanstack/react-router";
import Template from "./-example_form.template.html?raw";
import { Subheading } from "@/components/ui/heading";
import { P } from "@/components/ui/text";
import { Card, CardBody } from "@/components/layout/card";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

      <section>
        <Subheading>Test Form [DEV ONLY]</Subheading>
        <form
          className="p-8 border rounded-lg"
          action={url.href}
          method="POST"
        >
          <FieldGroup>
            <Field>
              <Label>Fill out any text</Label>
              <Input type="text" name="random" defaultValue="yes" />
            </Field>
            <Button type="submit">Submit the test form</Button>
          </FieldGroup>
        </form>
      </section>
    </div>
  );
}

function buildExampleFormHtml(args: { formUrl: string }): string {
  return Template.replace("{form_url}", args.formUrl);
}
