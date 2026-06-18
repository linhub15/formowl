import { emitPostHogLog } from "@/lib/posthog/posthog_logs.server";

type Params = {
  token: string;
  ip: string;
  secretKey: string;
};

type Result = {
  "success": boolean;
  "challenge_ts"?: string;
  "hostname"?: string;
  "error-codes"?: [];
  "action"?: string;
  "cdata"?: string;
  "metadata"?: Record<string, unknown>;
};

export async function siteVerify(
  { token, ip, secretKey }: Params,
): Promise<"ok" | undefined> {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  formData.append("remoteip", ip);
  const idempotencyKey = crypto.randomUUID();
  formData.append("idempotency_key", idempotencyKey);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const json = await response.json() as Result;

  if (!json.success) {
    emitPostHogLog({
      severityText: "warn",
      body: "cloudflare turnstile verification failed",
      attributes: {
        ip,
        hostname: json.hostname,
        action: json.action,
        error_codes: json["error-codes"] ?? [],
      },
    });

    return;
  }

  return "ok";
}
