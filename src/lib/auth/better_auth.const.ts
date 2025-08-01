export const BETTERAUTH = {
  credential: "credential",
  oauth: {
    google: "google",
    github: "github",
  },
} as const;

/** https://www.better-auth.com/docs/authentication/email-password#sign-up */
export const BETTERAUTH_PASSWORD = {
  minLength: 8,
  maxLength: 32,
};

/** https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses */
// todo: might not need this
export const BETTERAUTH_STRIPE = {
  subscriptionStatus: {
    trialing: "trialing",
    active: "active",
    incomplete: "incomplete",
    incomplete_expired: "incomplete_expired",
    canceled: "canceled",
    past_due: "past_due",
    unpaid: "unpaid",
    paused: "paused",
  },
};
