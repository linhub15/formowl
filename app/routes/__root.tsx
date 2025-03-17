import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import tailwind from "@/main.css?url";
import {
  CatchBoundary,
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  type ReactNode,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      links: [
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
