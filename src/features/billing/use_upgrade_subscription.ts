import { authClient } from "@/lib/auth/auth_client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upgradeToProSubscription } from "./upgrade_subscription";

export function useUpgradeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => upgradeToProSubscription(authClient),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing", "subscription"],
      });
    },
  });
}
