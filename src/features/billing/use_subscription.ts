import { authClient } from "@/lib/auth/auth_client";
import { useQuery } from "@tanstack/react-query";
export function useSubscription() {
  return useQuery({
    queryKey: ["billing", "subscription"],
    queryFn: async () => {
      const { data } = await authClient.getSession();
      const orgId = data?.session.activeOrganizationId;

      if (!orgId) {
        return;
      }

      const list = await authClient.subscription.list({
        query: {
          referenceId: orgId,
        },
      });
      const subscription = list.data?.at(0);

      return subscription;
    },
  });
}
