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

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET,
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
    autoSignInAfterVerification: true,
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
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      scope: ["profile", "email"],
    },
    github: {
      enabled: true,
      clientId: process.env.GITHUB_OAUTH_ID,
      clientSecret: process.env.GITHUB_OAUTH_SECRET,
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
              dashboardUrl: new URL("/dashboard", process.env.VITE_APP_URL),
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
