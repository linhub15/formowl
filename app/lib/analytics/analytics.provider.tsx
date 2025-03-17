import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = import.meta.env.VITE_POSTHOG_PUBLIC_KEY;
    if (!key) {
      return;
    }

    posthog.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_PUBLIC_KEY ||
        "https://us.i.posthog.com",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
