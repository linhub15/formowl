import { member, user } from "@/db/auth_schema";
import { db } from "@/db/database";
import {
  form as formSchema,
  formSubmission,
  statistic,
  submissionEmailQuota,
} from "@/db/schema";
import { mailer } from "@/lib/email/mailer";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { siteVerify } from "../../cloudflare_turnstile/site_verify";
import { featureFlags } from "@/lib/feature_flags/is_feature_enabled.server";
import { getSubmissionEmailQuota } from "@/features/email_management/server_actions/get_submission_email_quota";

const CF_TURNSTILE_RESPONSE_KEY = "cf-turnstile-response";
const HONEY_POT_KEY = "_honey_pot";

export const submitFormRequest = z.object({
  formSlug: z.string(),
  formData: z.instanceof(FormData),
  requestIpAddress: z.string(),
  requestReferer: z.string().optional(),
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
    with: { cloudflareTurnstile: true, email: { columns: { email: true } } },
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

    await db.insert(statistic).values({
      type: "honeypot",
      meta: { ip: args.requestIpAddress, referer: args.requestReferer },
    });

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

  const quota = await getSubmissionEmailQuota({
    organizationId: form.organizationId,
  });

  if (quota.exceeded) {
    // todo: notify user that email quota is exceeded. Suggest they upgrade to continue receiving email notifications
  }

  if (await featureFlags.submissionNotificationEmail() && !quota.exceeded) {
    const selected = await db.select(
      { email: user.email, formName: formSchema.name },
    )
      .from(formSchema)
      .innerJoin(member, eq(member.organizationId, formSchema.organizationId))
      .innerJoin(user, eq(user.id, member.userId))
      .where(eq(formSchema.id, form.id))
      .limit(1);

    // assuming only one user in each org
    const firstUser = selected.at(0);

    if (firstUser) {
      const to = form.email?.email ?? firstUser.email;

      const result = await mailer.submissionNotification({
        to: to,
        formSubmissionUrl: new URL(
          `/dashboard/forms/${form.slug}`,
          process.env.VITE_APP_URL,
        ),
        formData: firstFormSubmission.data,
        formName: firstUser.formName,
      });

      if (result.isOk()) {
        await db.transaction(async (transaction) => {
          await transaction.update(formSubmission)
            .set({ emailedTo: to })
            .where(
              and(
                eq(formSubmission.id, firstFormSubmission.id),
                eq(formSubmission.organizationId, form.organizationId),
              ),
            );

          await transaction
            .insert(submissionEmailQuota)
            .values({
              submissionId: firstFormSubmission.id,
              organizationId: form.organizationId,
            });
        });
      }
    }
  }

  return "ok";
}
