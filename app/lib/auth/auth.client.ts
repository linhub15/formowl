import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

const authServer = new URL("/api/auth", import.meta.env.VITE_APP_URL)
  .toString();

export const authClient = createAuthClient({
  baseURL: authServer,
  plugins: [organizationClient()],
});
