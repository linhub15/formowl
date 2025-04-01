import { member, user } from "@/db/auth_schema";
import { db } from "@/db/database";
import { form as formSchema, formSubmission } from "@/db/schema";
import { mailer } from "@/lib/email/mailer";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { siteVerify } from "../../cloudflare_turnstile/site_verify";
import { featureFlags } from "@/lib/feature_flags/is_feature_enabled.server";

const CF_TURNSTILE_RESPONSE_KEY = "cf-turnstile-response";
const HONEY_POT_KEY = "_honey_pot";

export const submitFormRequest = z.object({
  formSlug: z.string(),
  formData: z.instanceof(FormData),
  requestIpAddress: z.string(),
});

type Request = z.infer<typeof submitFormRequest>;
type Response =
  | "ok"
  | "not_found"
  | "save_failed"
  | "turnstile_missing_token"
  | "turnstile_failed";

export async function submitForm(args: Request): Promise<Response> {
  const form = await db.query.form.findFirst({
    columns: {
      id: true,
      isSubmissionsPaused: true,
      organizationId: true,
      slug: true,
    },
    where: (form, { eq }) => eq(form.slug, args.formSlug),
    with: { cloudflareTurnstile: true },
  });

  if (!form || form.isSubmissionsPaused) {
    return "not_found";
  }

  /// 1. Upstream Integrations

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

  /// HONEY POT
  const honeyPot = args.formData.get(HONEY_POT_KEY);
  if (honeyPot?.toString()) {
    console.warn(
      "Honeypot triggered by ip:",
      args.requestIpAddress,
    );
    return "not_found";
  }
  args.formData.delete(HONEY_POT_KEY);

  /// 2. Form Submission
  const result = await db.insert(formSubmission).values({
    formId: form.id,
    data: Object.fromEntries(args.formData),
    organizationId: form.organizationId,
  }).returning();

  const firstFormSubmission = result.at(0);

  if (!firstFormSubmission) {
    return "save_failed";
  }

  /// 3. Downstream Integrations

  if (await featureFlags.submissionNotificationEmail()) {
    const selected = await db.select(
      { email: user.email },
    )
      .from(formSchema)
      .innerJoin(member, eq(member.organizationId, formSchema.organizationId))
      .innerJoin(user, eq(user.id, member.userId))
      .where(eq(formSchema.id, form.id))
      .limit(1);

    const firstUser = selected.at(0);

    if (firstUser) {
      await mailer.submissionNotification({
        to: firstUser.email, // todo: get the email from the form
        formSubmissionUrl: new URL(
          `/dashboard/forms/${form.slug}`,
          process.env.VITE_APP_URL,
        ),
        formData: firstFormSubmission.data,
      });
    }
  }

  return "ok";
}
