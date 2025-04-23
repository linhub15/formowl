import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getRequestIP } from "@tanstack/react-start/server";

export const APIRoute = createAPIFileRoute("/api/health")({
  GET: () => {
    const ip = getRequestIP();
    const xForwardedFor = getRequestIP({ xForwardedFor: true });
    return json({
      message: "ok",
      ip: ip,
      "ip_xForwardedFor": xForwardedFor,
      env: process.env.NODE_ENV,
    });
  },
});
