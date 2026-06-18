import { BRANDING } from "@/lib/constants";
import { logClientErrorFn } from "@/lib/posthog/log_client_error.fn";
import tailwind from "@/main.css?url";
import dashboardScreenshot from "@/routes/dashboard_screenshot.png?url";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CatchBoundary,
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { ReactNode } from "react";
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
  const location = useLocation();
  const logClientError = useServerFn(logClientErrorFn);

  return (
    <RootDocument>
      <Toaster theme="system" position="bottom-center" />
      <CatchBoundary
        getResetKey={() => "reset"}
        onCatch={(error) => {
          console.error(error);
          void logClientError({
            data: {
              source: "root_catch_boundary",
              pathname: location.pathname,
              ...serializeClientError(error),
            },
          }).catch((loggingError) => {
            console.error("Failed to report root error:", loggingError);
          });
        }}
      >
        <Outlet />
      </CatchBoundary>
    </RootDocument>
  );
}

function serializeClientError(error: unknown) {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };
  }

  return {
    errorName: typeof error,
    errorMessage: stringifyClientError(error),
  };
}

function stringifyClientError(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
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
