import * as schema from "./schema";
import * as authSchema from "./auth_schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env.server";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle({
  client: queryClient,
  schema: { ...schema, ...authSchema },
});

export type DbTransaction = Parameters<
  Parameters<typeof db["transaction"]>[0]
>[0];
