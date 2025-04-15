import { db } from "@/db/database";

type Args = {
  organizationId: string;
};

export async function getEmailQuota(args: Args) {
  const maxQuota = 50; // 50 emails for during Alpha

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const submissions = await db.query.formSubmission.findMany({
    columns: { id: true },
    where: (submission, { and, eq, gte, lt, isNotNull }) =>
      and(
        eq(submission.organizationId, args.organizationId),
        isNotNull(submission.emailedTo),
        gte(submission.createdAt, startOfMonth),
        lt(submission.createdAt, startOfNextMonth),
      ),
  });

  return {
    used: submissions.length,
    max: maxQuota,
    exceeded: submissions.length >= maxQuota,
  };
}
