import { shutdownPostHogLogs } from "../../src/lib/posthog/posthog_logs.server";
import { definePlugin } from "nitro";

export default definePlugin((nitro) => {
  nitro.hooks.hook("close", async () => {
    await shutdownPostHogLogs();
  });
});
