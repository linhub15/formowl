import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { emitPostHogErrorLog } from "../posthog/posthog_logs.server";
import { getSessionFn } from "./get_session.fn";

export const authMiddleware = createMiddleware().server(
  async ({ next }) => {
    const session = await getSessionFn();

    if (!session) {
      throw new Error("No session found");
    }

    const orgId = session.session.activeOrganizationId;

    if (!orgId) {
      throw new Error(
        "Not found: expected `session.activeOrganizationId` to have a value",
      );
    }

    const request = getRequest();
    const requestAttributes = getRequestAttributes(request);

    try {
      return await next({ context: { session, activeOrgId: orgId } });
    } catch (error) {
      emitPostHogErrorLog(error, {
        body: "authenticated server function failed",
        attributes: {
          ...requestAttributes,
          posthogDistinctId: session.user.id,
          user_id: session.user.id,
          organization_id: orgId,
        },
      });

      throw error;
    }
  },
);

function getRequestAttributes(request: Request | undefined) {
  if (!request) {
    return {
      method: "unknown",
      path: "unknown",
    };
  }

  return {
    method: request.method,
    path: new URL(request.url).pathname,
  };
}
