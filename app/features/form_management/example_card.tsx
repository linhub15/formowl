import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { CodeBlock } from "@/components/ui/code_block";
import { useFormActionUrl } from "./hooks/use_form_action_url";
import { Subheading } from "@/components/ui/heading";
import { Code, P } from "@/components/ui/text";
import Template from "./-example_form.template.html?raw";

export function ExampleCard(props: { formSlug: string }) {
  const url = useFormActionUrl({ formSlug: props.formSlug });

  const example = buildExampleFormHtml({ formUrl: url.href });

  return (
    <Card>
      <CardBody>
        <Subheading>Form Action URL</Subheading>
        <P>
          Use this url in your form action, and set <Code>method="post"</Code>
        </P>

        <CodeBlock code={url.href} language="html" showCopyButton />
      </CardBody>
      <CardBody>
        <Subheading>Example Form</Subheading>
        <P>Here's a basic example in HTML.</P>
        <div>
          <CodeBlock code={example} language="html" showCopyButton />
        </div>
      </CardBody>
    </Card>
  );
}

function buildExampleFormHtml(args: { formUrl: string }): string {
  return Template.replace("{form_url}", args.formUrl);
}
