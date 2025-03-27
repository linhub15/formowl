import { PostHog } from "posthog-node";

const apiKey = process.env.VITE_POSTHOG_PUBLIC_KEY;

function buildPostHogClient() {
  if (apiKey) {
    return new PostHog(apiKey, {
      host: "https://us.i.posthog.com",
    });
  }
}

export const posthogClient = buildPostHogClient();
