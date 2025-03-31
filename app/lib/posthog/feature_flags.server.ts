import { FEATURE_FLAGS } from "./feature_flags";
import { posthogClient } from "./posthog.client";

const isDev = process.env.NODE_ENV === "development";

export const featureFlags = {
  newUserSignup: async (userId: string) => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      FEATURE_FLAGS.newUserSignup,
      userId,
    );

    return Boolean(flag);
  },
  submissionNotificationEmail: async () => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      FEATURE_FLAGS.submissionNotificationEmail,
      "", // anonymous person submits forms so we have no distinctId
    );

    return Boolean(flag);
  },
  emailManagement: async (userId: string) => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      FEATURE_FLAGS.emailManagement,
      userId,
    );

    return Boolean(flag);
  },
} as const;
