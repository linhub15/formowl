import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
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
    },
  },
});
