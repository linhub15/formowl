import { createMiddleware } from "@tanstack/react-start";
import { getSessionFn } from "./get_session.fn";

export const authMiddleware = createMiddleware().server(
  async ({ next }) => {
    const session = await getSessionFn();

    if (!session) {
      throw new Error("No session found");
    }

    return await next({ context: { session } });
  },
);
