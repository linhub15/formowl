import { SUBSCRIPTION_PLAN } from "./plans/plans.const";

export const UPGRADE_SUBSCRIPTION_SUCCESS_URL = "/dashboard";
export const UPGRADE_SUBSCRIPTION_CANCEL_URL = "/dashboard/billing";
export const UPGRADE_SUBSCRIPTION_RETURN_URL = "/dashboard/billing";

export type UpgradeSubscriptionRequest = {
  plan: typeof SUBSCRIPTION_PLAN.pro;
  successUrl: string;
  cancelUrl: string;
  returnUrl: string;
  annual: true;
  referenceId: string;
};

type SessionResponse = {
  data?: {
    session?: {
      activeOrganizationId?: string | null;
    } | null;
  } | null;
};

export type UpgradeSubscriptionClient = {
  getSession: () => Promise<SessionResponse>;
  subscription: {
    upgrade: (request: UpgradeSubscriptionRequest) => Promise<unknown>;
  };
};

export class MissingActiveOrganizationError extends Error {
  constructor() {
    super("Cannot upgrade subscription without an active organization.");
    this.name = "MissingActiveOrganizationError";
  }
}

export async function upgradeToProSubscription(
  client: UpgradeSubscriptionClient,
) {
  const { data } = await client.getSession();
  const orgId = data?.session?.activeOrganizationId;

  if (!orgId) {
    throw new MissingActiveOrganizationError();
  }

  return await client.subscription.upgrade({
    plan: SUBSCRIPTION_PLAN.pro,
    successUrl: UPGRADE_SUBSCRIPTION_SUCCESS_URL,
    cancelUrl: UPGRADE_SUBSCRIPTION_CANCEL_URL,
    returnUrl: UPGRADE_SUBSCRIPTION_RETURN_URL,
    annual: true,
    referenceId: orgId,
  });
}
