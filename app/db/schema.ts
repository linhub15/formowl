import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { UploadedFileData } from "uploadthing/types";

/// Helpers
export const defaultColumns = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
};

/// Tables
export const blob = pgTable("blob", {
  id: uuid("id").primaryKey().defaultRandom(),
  uploadthingMeta: jsonb("uploadthing_meta")
    .$type<Omit<UploadedFileData, "url" | "appUrl">>(),
  ...defaultColumns,
});
