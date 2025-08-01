import { authClient } from "@/lib/auth/auth.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIPTION_PLAN } from "./plans/plans.const";

export function useUpgradeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await authClient.getSession();
      const orgId = data?.session?.activeOrganizationId;

      if (!orgId) {
        // missing org id
        return;
      }

      await authClient.subscription.upgrade({
        plan: SUBSCRIPTION_PLAN.pro,
        successUrl: "/dashboard",
        cancelUrl: "/dashboard/billing",
        returnUrl: "",
        annual: true,
        referenceId: orgId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing", "subscription"],
      });
    },
  });
}
