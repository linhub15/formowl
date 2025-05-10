import {
  account,
  invitation,
  member,
  organization as Organization,
  session,
  user as User,
  userVerification,
} from "@/db/auth_schema";
import { db } from "@/db/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { mailer } from "../email/mailer";
import { env } from "@/env.server";

export const auth = betterAuth({
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: User,
      session: session,
      account: account,
      verification: userVerification,
      organization: Organization,
      member: member,
      invitation: invitation,
    },
  }),
  plugins: [organization({
    organizationLimit: 1,
  })],
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }, _request) => {
      console.info(`auth: Sending verification email to ${user.email}`);

      const verifyUrl = new URL(url);
      verifyUrl.searchParams.set("callbackURL", "/dashboard");

      await mailer.verifyAccountEmail({
        to: user.email,
        verifyUrl: verifyUrl.href,
      });
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_OAUTH_ID,
      clientSecret: env.GOOGLE_OAUTH_SECRET,
      scope: ["profile", "email"],
    },
    github: {
      enabled: true,
      clientId: env.GITHUB_OAUTH_ID,
      clientSecret: env.GITHUB_OAUTH_SECRET,
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
          if (user.emailVerified) {
            await mailer.welcome({
              to: user.email,
              dashboardUrl: new URL("/dashboard", env.VITE_APP_URL),
            });
          }
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          const result = await db.query.member.findFirst({
            columns: { organizationId: true },
            where: (m, { eq }) => eq(m.userId, session.userId),
          });

          return {
            data: {
              ...session,
              activeOrganizationId: result?.organizationId ?? null,
            },
          };
        },
      },
    },
  },
});
