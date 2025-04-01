import { nanoid } from "@/lib/utils/nanoid";
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { UploadedFileData } from "uploadthing/types";
import { organization } from "./auth_schema";
import { relations } from "drizzle-orm";

/// Helpers
export const defaultColumns = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
} as const;

export const organizationColumns = {
  organizationId: text("organization_id").notNull().references(
    () => organization.id,
    { onDelete: "cascade" },
  ),
} as const;

/// Tables
export const blob = pgTable("blob", {
  id: uuid("id").primaryKey().defaultRandom(),
  uploadthingMeta: jsonb("uploadthing_meta")
    .$type<Omit<UploadedFileData, "url" | "appUrl">>(),
  ...defaultColumns,
});

export const form = pgTable("form", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique().$default(() => nanoid(6)),
  isSubmissionsPaused: boolean("is_submissions_paused").notNull().default(
    false,
  ),
  cloudflareTurnstileId: uuid("cloudflare_turnstile_id").references(
    () => cloudflareTurnstile.id,
  ),
  ...defaultColumns,
  ...organizationColumns,
});

export const formRelations = relations(form, ({ one, many }) => ({
  organization: one(organization, {
    fields: [form.organizationId],
    references: [organization.id],
  }),
  cloudflareTurnstile: one(cloudflareTurnstile, {
    fields: [form.cloudflareTurnstileId],
    references: [cloudflareTurnstile.id],
  }),
  submissions: many(formSubmission),
}));

export const formSubmission = pgTable("form_submission", {
  id: uuid("id").primaryKey().defaultRandom(),
  formId: uuid("form_id").notNull().references(() => form.id, {
    onDelete: "cascade",
  }),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: jsonb("data").$type<Record<string, any>>().notNull(),
  ...defaultColumns,
  ...organizationColumns,
});

export const formSubmissionRelations = relations(formSubmission, ({ one }) => ({
  form: one(form, {
    fields: [formSubmission.formId],
    references: [form.id],
  }),
}));

export const cloudflareTurnstile = pgTable("cloudflare_turnstile", {
  id: uuid("id").primaryKey().defaultRandom(),
  siteKey: text("site_key").notNull(),
  secretKey: text("secret_key").notNull(),
  ...defaultColumns,
  ...organizationColumns,
});

export const email = pgTable("email", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email_address").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  ...defaultColumns,
  ...organizationColumns,
});

export const emailRelations = relations(email, ({ one, many }) => ({
  organization: one(organization, {
    fields: [email.organizationId],
    references: [organization.id],
  }),
  emailVerifications: many(emailVerification),
}));

export const emailVerification = pgTable("email_verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailId: uuid("email_id").notNull().references(() => email.id, {
    onDelete: "cascade",
  }),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ...defaultColumns,
  ...organizationColumns,
});

export const emailVerificationRelations = relations(
  emailVerification,
  ({ one }) => ({
    email: one(email, {
      fields: [emailVerification.emailId],
      references: [email.id],
    }),
  }),
);

/// FEATURE FLAG SCHEMA
export const featureFlag = pgTable("feature_flag", {
  key: text("key").primaryKey(),
  isEnabled: boolean("is_enabled").notNull().default(false),
  ...defaultColumns,
});
