import Spline from "@splinetool/react-spline";
import { Container } from "@/components/layout/container";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <section className="flex flex-col lg:grid grid-cols-2 items-center justify-between h-[456px] gap-8 max-w-5xl mx-auto">
        <div className="h-full flex items-center justify-center">
          <Spline
            className="max-h-60 size-full"
            scene="https://prod.spline.design/wt5t9EKstXGagppe/scene.splinecode"
          />
        </div>
        <div className="space-y-6 lg:order-first">
          <div>
            <h1 className="text-5xl lg:text-7xl font-medium text-white/90 tracking-tight py-6">
              Form API
              <br />for static sites
            </h1>
            <p>The best form backend for static websites.</p>
            <p>No server required.</p>
          </div>

          <div>
            <Button to="/login">Get started</Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
