import tailwind from "@/main.css?url";
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
      <Toaster theme="system" />
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
