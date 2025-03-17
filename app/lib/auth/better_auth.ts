import {
  account,
  organization as Organization,
  session,
  user as User,
  verification,
} from "@/db/auth_schema";
import { db } from "@/db/database";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: User,
      session: session,
      account: account,
      verification: verification,
      organization: Organization,
    },
  }),
  plugins: [organization()],
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    cookiePrefix: "fo",
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // todo: after user creation
        },
      },
    },
  },
});
