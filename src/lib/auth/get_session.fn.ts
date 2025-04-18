import { createServerFn } from "@tanstack/react-start";
import { auth } from "./better_auth";
import { getWebRequest } from "@tanstack/react-start/server";

export const getSessionFn = createServerFn({ method: "GET" })
  .handler(
    async () => {
      const request = getWebRequest();

      if (!request) return null;

      const { headers } = request;

      const session = await auth.api.getSession({ headers });

      return session;
    },
  );
