import { auth } from "@/lib/auth/better_auth";
import { emitPostHogLog } from "@/lib/posthog/posthog_logs.server";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const requestSchema = z
  .object({
    source: z.string().min(1).max(100),
    pathname: z.string().max(2_048).optional(),
    errorName: z.string().min(1).max(200),
    errorMessage: z.string().min(1).max(4_000),
    errorStack: z.string().max(8_000).optional(),
  })
  .strict();

type LogClientErrorRequest = z.infer<typeof requestSchema>;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MAX_KEYS = 10_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export const logClientErrorFn = createServerFn({ method: "POST" })
  .inputValidator((data: LogClientErrorRequest) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const rateLimitKey =
      getRequestIP({ xForwardedFor: true }) ??
      getRequestIP() ??
      request?.headers.get("user-agent") ??
      "unknown";

    if (!consumeRateLimit(rateLimitKey)) {
      return { accepted: false };
    }

    const session = request
      ? await auth.api.getSession({ headers: request.headers })
      : undefined;

    emitPostHogLog({
      severityText: "error",
      body: "client error",
      attributes: {
        source: data.source,
        path: data.pathname,
        error_name: data.errorName,
        error_message: data.errorMessage,
        error_stack: data.errorStack,
        posthogDistinctId: session?.user.id,
        user_id: session?.user.id,
        organization_id: session?.session.activeOrganizationId ?? undefined,
      },
    });

    return { accepted: true };
  });

function consumeRateLimit(key: string, now = Date.now()) {
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    pruneExpiredRateLimits(now);
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

function pruneExpiredRateLimits(now: number) {
  if (rateLimits.size < 1_000) {
    return;
  }

  for (const [key, limit] of rateLimits) {
    if (limit.resetAt <= now) {
      rateLimits.delete(key);
    }
  }

  while (rateLimits.size > RATE_LIMIT_MAX_KEYS) {
    const oldestKey = rateLimits.keys().next().value;

    if (oldestKey === undefined) {
      break;
    }

    rateLimits.delete(oldestKey);
  }
}
