import { AppNavigation } from "@/features/app_shell/app_navigation";
import { getSessionFn } from "@/lib/auth/get_session.fn";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchParams = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_site/login")({
  validateSearch: (search) => searchParams.parse(search),

  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute blur-sm inset-0 -z-10 select-none">
        {/* <AppNavigation email="test@gmail.com" pathname="/dashboard/forms" /> */}
      </div>

      <div className="flex flex-1 flex-col justify-center py-32 lg:py-52 px-4 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
