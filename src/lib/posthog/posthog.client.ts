import { env } from "@/env.server";
import { PostHog } from "posthog-node";

const apiKey = env.VITE_POSTHOG_PUBLIC_KEY;

function buildPostHogClient() {
  if (apiKey) {
    return new PostHog(apiKey, {
      host: "https://us.i.posthog.com",
    });
  }
}

export const posthogClient = buildPostHogClient();
