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
  ...defaultColumns,
  ...organizationColumns,
});

export const formRelations = relations(form, ({ one, many }) => ({
  organization: one(organization, {
    fields: [form.organizationId],
    references: [organization.id],
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
