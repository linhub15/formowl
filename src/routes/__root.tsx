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

const imgeUrl = new URL(dashboardScreenshot, import.meta.env.VITE_APP_URL).href;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { name: "charset", content: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },

        // Branding
        { name: "title", content: BRANDING.name },
        { name: "type", content: "website" },
        { name: "description", content: BRANDING.description },
        { name: "robots", content: "index, follow" },
        { name: "image", content: imgeUrl },
        { name: "url", content: import.meta.env.VITE_APP_URL },

        // Facebook
        { property: "og:title", content: BRANDING.name },
        { property: "og:type", content: "website" },
        { property: "og:description", content: BRANDING.description },
        { property: "og:image", content: imgeUrl },
        { property: "og:url", content: import.meta.env.VITE_APP_URL },

        // Twitter
        { name: "twitter:title", content: BRANDING.name },
        { name: "twitter:description", content: BRANDING.description },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imgeUrl },
        { name: "twitter:url", content: import.meta.env.VITE_APP_URL },
        { name: "twitter:domain", content: "formowl.dev" },
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
