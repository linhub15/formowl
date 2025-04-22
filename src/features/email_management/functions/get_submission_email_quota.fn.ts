import { authMiddleware } from "@/lib/auth/auth_middleware";
import { createServerFn } from "@tanstack/react-start";
import { getSubmissionEmailQuota } from "../server_actions/get_submission_email_quota";

export const getSubmissionsEmailQuotaFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const result = await getSubmissionEmailQuota({
      organizationId: context.activeOrgId,
    });
    return result;
  });
