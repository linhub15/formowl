import * as schema from "./schema";
import * as authSchema from "./auth_schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL);

export const db = drizzle({
  client: queryClient,
  schema: { ...schema, ...authSchema },
});
