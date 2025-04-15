import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { getEmailQuota } from "../server_actions/get_email_quota";

export const getEmailQuotaFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = await getEmailQuota({ organizationId: context.activeOrgId });
    return result;
  });
