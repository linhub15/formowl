import { describe, expect, it } from "vitest";
import {
  MissingActiveOrganizationError,
  type UpgradeSubscriptionClient,
  type UpgradeSubscriptionRequest,
  upgradeToProSubscription,
} from "./upgrade_subscription";

describe("upgradeToProSubscription", () => {
  it("starts Stripe checkout for the active organization on the Pro annual plan", async () => {
    const upgradeCalls: UpgradeSubscriptionRequest[] = [];
    const result = { data: { url: "https://checkout.stripe.test/session" } };
    const client = {
      getSession: async () => ({
        data: {
          session: {
            activeOrganizationId: "org_123",
          },
        },
      }),
      subscription: {
        upgrade: async (request) => {
          upgradeCalls.push(request);
          return result;
        },
      },
    } satisfies UpgradeSubscriptionClient;

    const response = await upgradeToProSubscription(client);

    expect(response).toBe(result);
    expect(upgradeCalls).toEqual([
      {
        plan: "pro",
        successUrl: "/dashboard",
        cancelUrl: "/dashboard/billing",
        returnUrl: "/dashboard/billing",
        annual: true,
        referenceId: "org_123",
      },
    ]);
  });

  it("does not call Stripe when there is no active organization", async () => {
    const upgradeCalls: UpgradeSubscriptionRequest[] = [];
    const client = {
      getSession: async () => ({
        data: {
          session: {
            activeOrganizationId: null,
          },
        },
      }),
      subscription: {
        upgrade: async (request) => {
          upgradeCalls.push(request);
        },
      },
    } satisfies UpgradeSubscriptionClient;

    await expect(upgradeToProSubscription(client)).rejects.toThrow(
      MissingActiveOrganizationError,
    );
    expect(upgradeCalls).toEqual([]);
  });

  it("does not treat a missing session as a successful upgrade", async () => {
    const upgradeCalls: UpgradeSubscriptionRequest[] = [];
    const client = {
      getSession: async () => ({
        data: null,
      }),
      subscription: {
        upgrade: async (request) => {
          upgradeCalls.push(request);
        },
      },
    } satisfies UpgradeSubscriptionClient;

    await expect(upgradeToProSubscription(client)).rejects.toThrow(
      MissingActiveOrganizationError,
    );
    expect(upgradeCalls).toEqual([]);
  });
});
