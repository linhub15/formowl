import { AnalyticsProvider } from "@/lib/analytics/analytics.provider";
import { getSessionFn } from "@/lib/auth/get_session.fn";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    // todo: this is called on every navigation consider optimizing this by using a cache to reduce web requests
    // maybe stale time?
    const session = await getSessionFn();
    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AnalyticsProvider>
      <div>Dashboard</div>
    </AnalyticsProvider>
  );
}
