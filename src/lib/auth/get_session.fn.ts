import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "./better_auth";

export const getSessionFn = createServerFn({ method: "GET" })
  .handler(
    async () => {
      const request = getRequest();

      if (!request) return null;

      const { headers } = request;

      const session = await auth.api.getSession({ headers });

      return session;
    },
  );
