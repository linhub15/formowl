import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { type PropsWithChildren, useEffect } from "react";

export function PostHogProvider({ children }: PropsWithChildren) {
  const key = import.meta.env.VITE_POSTHOG_PUBLIC_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST;

  useEffect(() => {
    if (!key) {
      return;
    }

    posthog.init(key, {
      api_host: host || "https://us.i.posthog.com",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
