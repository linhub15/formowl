import {
  account,
  invitation,
  member,
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
      member: member,
      invitation: invitation,
    },
  }),
  plugins: [organization({
    organizationLimit: 1,
  })],
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    },
    github: undefined, // todo: Github OAuth
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
          // Email user created
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
