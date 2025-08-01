import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getStripeSubscriptionFn } from "./get_stripe_subscription.fn";

export function useGetStripeSubscription(stripeSubscriptionId?: string) {
  const getStripeSubscription = useServerFn(getStripeSubscriptionFn);
  return useQuery({
    queryKey: ["billing", "stripe", "price", stripeSubscriptionId],
    enabled: !!stripeSubscriptionId,
    queryFn: async () => {
      if (!stripeSubscriptionId) {
        return;
      }

      const subscription = await getStripeSubscription({
        data: { subscriptionId: stripeSubscriptionId },
      });
      return subscription;
    },
  });
}
