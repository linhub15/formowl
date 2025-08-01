import { z } from "zod";

const envServerSchema = z.object({
  VITE_APP_URL: z.string(),
  VITE_POSTHOG_HOST: z.string().optional(),
  VITE_POSTHOG_PUBLIC_KEY: z.string().optional(),

  DATABASE_URL: z.string(),
  UPLOADTHING_TOKEN: z.string(),

  AUTH_SECRET: z.string(),
  GOOGLE_OAUTH_ID: z.string(),
  GOOGLE_OAUTH_SECRET: z.string(),
  GITHUB_OAUTH_ID: z.string(),
  GITHUB_OAUTH_SECRET: z.string(),

  STRIPE_WEBHOOK_SECRET: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PRICE_PRO_YEARLY: z.string(),

  // EMAIL
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().default("465"),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_SECURE: z.union([z.literal("true"), z.literal("")]).optional(),
  EMAIL_FROM: z.string(),
});

export type EnvServer = z.infer<typeof envServerSchema>;

/** This should only be imported on server code. Client has no access to this. */
export const env = envServerSchema.parse(process.env);
