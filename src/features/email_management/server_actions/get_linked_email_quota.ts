import { db } from "@/db/database";
import { safeGetPlan } from "@/features/billing/plans/plans.const";

type Args = {
  organizationId: string;
};

export async function getLinkedEmailQuota(args: Args) {
  const subscription = await db.query.subscription.findFirst({
    where: (subscription, { and, eq }) =>
      and(
        eq(subscription.referenceId, args.organizationId),
        eq(subscription.status, "active"),
      ),
  });

  const maxQuota = safeGetPlan(subscription?.plan, "free").limits.linkedEmails;

  const linkedEmails = await db.query.email.findMany({
    columns: { id: true },
    where: (quota, { and, eq }) =>
      and(
        eq(quota.organizationId, args.organizationId),
      ),
  });

  return {
    used: linkedEmails.length,
    max: maxQuota,
    exceeded: linkedEmails.length >= maxQuota,
  };
}
