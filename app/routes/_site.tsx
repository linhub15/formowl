import { MarketingFooter } from "@/features/marketing_site/marketing_footer";
import { MarketingNav } from "@/features/marketing_site/marketing_navigation";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_site")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const { data: session } = useSession();
  return (
    <>
      <MarketingNav isAuthenticated={!!session} pathname={location.pathname} />
      <Outlet />
      <MarketingFooter />
    </>
  );
}
