import { AppNavigation } from "@/features/app_shell/app_navigation";
import { PostHogProvider } from "@/lib/posthog/posthog.provider";
import { authGuard } from "@/lib/auth/auth.guard";
import { useSession } from "@/lib/auth/hooks/use_session";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    await authGuard({ location });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSession();
  const location = useLocation();
  return (
    <PostHogProvider>
      <AppNavigation email={data?.user.email} pathname={location.pathname}>
        <Outlet />
      </AppNavigation>
    </PostHogProvider>
  );
}
