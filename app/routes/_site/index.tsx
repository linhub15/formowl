import { Container } from "@/components/layout/container";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { SpinningPyramid } from "@/components/spinning_pyramid";
import { CodeBlock } from "@/components/ui/code_block";
import ExampleForm from "@/features/marketing_site/example_form.html?raw";
import { LockClosedIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { Faq } from "@/features/marketing_site/faq";

export const Route = createFileRoute("/_site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <div className="space-y-32 md:space-y-52">
        <section className="flex flex-col lg:grid grid-cols-2 items-center justify-between min-h-[456px] gap-8">
          <div className="flex items-center justify-center w-full overflow-clip">
            <SpinningPyramid />
          </div>
          <div className="space-y-6 lg:order-first">
            <div>
              <Badge className="rounded-full" color="green">
                Alpha Release
              </Badge>
              <Heading className="text-5xl sm:text-6xl lg:text-7xl tracking-tight py-6 font-medium">
                Form API for static sites
              </Heading>
              <p>
                You supply the form, we supply the backend.
              </p>
            </div>

            <div className="flex gap-4">
              <Button to="/waitlist">Join the waitlist</Button>
              <Button to="/dashboard" outline>Try the Alpha</Button>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="flex flex-col lg:flex-row justify-between gap-16">
            <div className="space-y-4">
              <div>
                <Heading className="sm:text-3xl pb-3" level={2}>
                  Features
                </Heading>
              </div>

              <dl className="space-y-8">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <LockClosedIcon className="absolute top-1 left-1 size-5" />
                    Spam protection.
                  </dt>
                  <dd className="inline">
                    {" "}
                    Use Cloudflare turnstile and a honey pot field to protect
                    against spam and bots.
                  </dd>
                </div>

                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <PaperAirplaneIcon className="absolute top-1 left-1 size-5" />
                    Email notifications.
                  </dt>
                  <dd className="inline">
                    {" "}
                    Get submissions directly to your email when someone submits
                    your form.
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <CodeBlock
                code={ExampleForm}
                language="html"
                showCopyButton
                copyButtonPosition="bottom"
              />
            </div>
          </div>
        </section>

        <section className="" id="faq">
          <div className="rounded-lg px-3 py-1 text-sm text-center">FAQ</div>
          <Heading className="sm:text-3xl pb-3 text-center" level={2}>
            Frequently Asked Questions
          </Heading>

          <Faq />
        </section>
      </div>
    </Container>
  );
}
