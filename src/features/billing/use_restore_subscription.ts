import { authClient } from "@/lib/auth/auth.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRestoreSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionId: string) => {
      const { data } = await authClient.getSession();
      const orgId = data?.session?.activeOrganizationId;

      if (!orgId) {
        // missing org id
        return;
      }

      await authClient.subscription.restore({
        subscriptionId: subscriptionId,
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
