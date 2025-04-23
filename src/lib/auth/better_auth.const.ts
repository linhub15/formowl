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
