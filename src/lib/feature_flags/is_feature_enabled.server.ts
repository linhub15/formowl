import { db } from "@/db/database";
import { FEATURE_FLAGS } from "./feature_flags";

export async function isFeatureEnabled(key: string) {
  const feature = await db.query.featureFlag.findFirst({
    columns: { isEnabled: true },
    where: (flag, { eq }) => eq(flag.key, key),
  });

  if (!feature) {
    return false;
  }

  return feature.isEnabled;
}

export const featureFlags = {
  submissionNotificationEmail: async () => {
    return await isFeatureEnabled(FEATURE_FLAGS.submissionNotificationEmail);
  },
  emailManagement: async () => {
    return await isFeatureEnabled(FEATURE_FLAGS.emailManagement);
  },
} as const;
