import { authClient } from "@/lib/auth/auth.client";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionId: string) => {
      const { data } = await authClient.getSession();
      const orgId = data?.session?.activeOrganizationId;

      if (!orgId) {
        // missing org id
        return;
      }

      await authClient.subscription.cancel({
        referenceId: orgId,
        subscriptionId: subscriptionId,
        returnUrl: "/dashboard/billing",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing", "subscription"],
      });
    },
  });
}
