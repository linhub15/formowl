import { BRANDING } from "@/lib/constants";
import tailwind from "@/main.css?url";
import dashboardScreenshot from "@/routes/dashboard_screenshot.png?url";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CatchBoundary,
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  type ReactNode,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { name: "charset", content: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },

        // Branding
        { name: "title", content: BRANDING.name },
        { name: "description", content: BRANDING.description },
        { name: "robots", content: "index, follow" },

        // Facebook
        { property: "og:url", content: process.env.VITE_APP_URL },
        { property: "og:type", content: "website" },
        { property: "og:title", content: BRANDING.name },
        { property: "og:description", content: BRANDING.description },
        { property: "og:image", content: dashboardScreenshot },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:domain", content: "formowl.dev" },
        { name: "twitter:url", content: process.env.VITE_APP_URL },
        { name: "twitter:title", content: BRANDING.name },
        { name: "twitter:description", content: BRANDING.description },
        { name: "twitter:image", content: dashboardScreenshot },
      ],
      links: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "stylesheet", href: tailwind },
      ],
    }),
    component: RootComponent,
    notFoundComponent: () => <>Not Found</>,
    errorComponent: (props) => <>{props.error}</>,
  },
);

function RootComponent() {
  return (
    <RootDocument>
      <Toaster theme="system" position="bottom-center" />
      <CatchBoundary
        getResetKey={() => "reset"}
        onCatch={(error) => console.error(error)}
      >
        <Outlet />
      </CatchBoundary>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 text-zinc-500 dark:text-zinc-400"
    >
      <head>
        <title>{BRANDING.name}</title>
        <HeadContent />
      </head>
      <body className="h-full">
        {children}
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
