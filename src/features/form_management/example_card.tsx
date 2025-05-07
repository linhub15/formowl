import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { CodeBlock } from "@/components/ui/code_block";
import { useFormActionUrl } from "./hooks/use_form_action_url";
import { Subheading } from "@/components/ui/heading";
import { Code, P } from "@/components/ui/text";
import Template from "./-example_form.template.html?raw";
import { Badge } from "@/components/ui/badge";

export function ExampleCard(props: { formSlug: string }) {
  const url = useFormActionUrl({ formSlug: props.formSlug });

  const example = buildExampleFormHtml({ formUrl: url.href });

  return (
    <div className="space-y-12">
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

      <Card>
        <CardHeader>
          Reserved field names <Badge color="green">New</Badge>
        </CardHeader>
        <CardBody>
          <Subheading className="font-mono">_honey_pot</Subheading>
          <P>
            You can include a honey pot field to help mitigate spam and bots.
            Remember to hide it from users.
          </P>

          <CodeBlock
            code={`<input name="_honey_pot" style="display:none;" />`}
            language="html"
            showCopyButton
          />
        </CardBody>

        <CardBody>
          <div className="space-y-6">
            <div>
              <Subheading className="font-mono">_success_url</Subheading>
              <P>
                Redirect to your own success page by providing a path, or URL as
                the value.
              </P>
            </div>

            <div>
              <P>
                Using a path, will redirect to the same origin as the form.
              </P>
              <CodeBlock
                code={`<input name="_success_url" value="/success" style="display:none;" />`}
                language="html"
                showCopyButton
              />
            </div>
            <div>
              <P>
                Using a fully qualifieid URL, you can redirect to a different
                origin if prefered.
              </P>
              <CodeBlock
                code={`<input name="_success_url" value="https://different-site.com/success" style="display:none;"/>`}
                language="html"
                showCopyButton
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function buildExampleFormHtml(args: { formUrl: string }): string {
  return Template.replace("{form_url}", args.formUrl);
}
