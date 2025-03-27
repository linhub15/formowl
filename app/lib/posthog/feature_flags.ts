import { posthogClient } from "./posthog.client";

const features = {
  newUserSignup: "new_user_signup",
  submissionNotificationEmail: "submission_notification_email",
  waitlistForm: "waitlist_form",
} as const;

const isDev = process.env.NODE_ENV === "development";

export const featureFlags = {
  newUserSignup: async (userId: string) => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      features.newUserSignup,
      userId,
    );

    return Boolean(flag);
  },
  submissionNotificationEmail: async () => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      features.submissionNotificationEmail,
      "", // anonymous person submits forms so we have no distinctId
    );

    return Boolean(flag);
  },
  waitlistForm: async (userId: string) => {
    if (isDev) return true;

    const flag = await posthogClient?.isFeatureEnabled(
      features.waitlistForm,
      userId,
    );

    return Boolean(flag);
  },
} as const;
