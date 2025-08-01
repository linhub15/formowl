import { db } from "@/db/database";
import { safeGetPlan } from "@/features/billing/plans/plans.const";

type Args = {
  organizationId: string;
};

export async function getSubmissionEmailQuota(args: Args) {
  const subscription = await db.query.subscription.findFirst({
    where: (subscription, { eq }) =>
      eq(subscription.referenceId, args.organizationId),
  });

  const maxQuota =
    safeGetPlan(subscription?.plan, "free").limits.monthlyEmailNotifications;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const submissions = await db.query.submissionEmailQuota.findMany({
    columns: { id: true },
    where: (quota, { and, eq, gte, lt, isNotNull }) =>
      and(
        eq(quota.organizationId, args.organizationId),
        gte(quota.createdAt, startOfMonth),
        lt(quota.createdAt, startOfNextMonth),
      ),
  });

  return {
    used: submissions.length,
    max: maxQuota,
    exceeded: submissions.length >= maxQuota,
  };
}
