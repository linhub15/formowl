export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

export const FEATURE_FLAGS = {
  newUserSignup: "new_user_signup",
  submissionNotificationEmail: "submission_notification_email",
  emailManagement: "email_management",
} as const;
