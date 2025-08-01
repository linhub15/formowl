import { authClient } from "@/lib/auth/auth.client";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getStripeSubscriptionFn } from "./get_stripe_subscription.fn";

export function useSubscription() {
  const getStripePrice = useServerFn(getStripeSubscriptionFn);
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
