import { db } from "@/db/database";
import { formSubmission } from "@/db/schema";
import { siteVerify } from "../cloudflare_turnstile/site_verify";
import { z } from "zod";

const CF_TURNSTILE_RESPONSE_KEY = "cf-turnstile-response";

export const submitFormRequest = z.object({
  formSlug: z.string(),
  formData: z.instanceof(FormData),
  requestIpAddress: z.string(),
});

type Request = z.infer<typeof submitFormRequest>;
type Response =
  | "ok"
  | "not_found"
  | "turnstile_missing_token"
  | "turnstile_failed";

export async function submitForm(args: Request): Promise<Response> {
  const form = await db.query.form.findFirst({
    columns: { id: true, isSubmissionsPaused: true, organizationId: true },
    where: (form, { eq }) => eq(form.slug, args.formSlug),
    with: { cloudflareTurnstile: true },
  });

  if (!form || form.isSubmissionsPaused) {
    return "not_found";
  }

  /// CLOUDFLARE TURNSTILE
  const cfTurnstileToken = args.formData.get(CF_TURNSTILE_RESPONSE_KEY);
  const cfTurnstileSecretKey = form.cloudflareTurnstile?.secretKey;
  args.formData.delete(CF_TURNSTILE_RESPONSE_KEY);

  if (cfTurnstileSecretKey && !cfTurnstileToken) {
    return "turnstile_missing_token";
  }

  if (cfTurnstileSecretKey && cfTurnstileToken) {
    const ok = await siteVerify({
      token: cfTurnstileToken.toString(),
      ip: args.requestIpAddress,
      secretKey: cfTurnstileSecretKey,
    });

    if (!ok) {
      return "turnstile_failed";
    }
  }

  await db.insert(formSubmission).values({
    formId: form.id,
    data: Object.fromEntries(args.formData),
    organizationId: form.organizationId,
  });

  return "ok";
}
