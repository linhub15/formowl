import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router";
import { z } from "zod";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);

/** dotenv validation - not sure the best place to put it */
const env = z.object({
  VITE_APP_URL: z.string(),
  VITE_POSTHOG_HOST: z.string().optional(),
  VITE_POSTHOG_PUBLIC_KEY: z.string().optional(),

  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  GOOGLE_OAUTH_ID: z.string(),
  GOOGLE_OAUTH_SECRET: z.string(),
  UPLOADTHING_TOKEN: z.string(),

  // EMAIL
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().default("465"),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_SECURE: z.union([z.literal("true"), z.literal("")]).optional(),
  EMAIL_FROM: z.string(),
});

process.env = { ...process.env, ...env.parse(process.env) };

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
