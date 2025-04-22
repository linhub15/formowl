import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { getLinkedEmailQuota } from "../server_actions/get_linked_email_quota";

export const getLinkedEmailQuotaFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = await getLinkedEmailQuota({
      organizationId: context.activeOrgId,
    });
    return result;
  });
