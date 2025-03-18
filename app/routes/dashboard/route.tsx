import { Layout } from "@/components/layout";
import { AnalyticsProvider } from "@/lib/analytics/analytics.provider";
import { authGuard } from "@/lib/auth/auth.guard";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    await authGuard({ location });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSession();
  return (
    <AnalyticsProvider>
      <Layout email={data?.user.email}>
        <Outlet />
      </Layout>
    </AnalyticsProvider>
  );
}
