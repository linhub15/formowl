import { db } from "@/db/database";

type Args = {
  organizationId: string;
};

export async function getLinkedEmailQuota(args: Args) {
  const maxQuota = 5; // quota during Alpha

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
