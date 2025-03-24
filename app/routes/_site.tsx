import { MarketingFooter } from "@/features/marketing_site/marketing_footer";
import { MarketingNav } from "@/features/marketing_site/marketing_navigation";
import { AnalyticsProvider } from "@/lib/analytics/analytics.provider";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_site")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const { data: session } = useSession();
  return (
    <AnalyticsProvider>
      <MarketingNav
        isAuthenticated={!!session}
        pathname={location.pathname}
      />
      <Outlet />
      <MarketingFooter />
    </AnalyticsProvider>
  );
}
