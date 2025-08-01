import { json } from "@tanstack/react-start";
import {
  createServerFileRoute,
  getRequestIP,
} from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/health").methods({
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
