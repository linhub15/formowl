import { createMiddleware } from "@tanstack/react-start";
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

    return await next({ context: { session, activeOrgId: orgId } });
  },
);
