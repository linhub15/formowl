import { stripeClient } from "@/lib/stripe/stripe_client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const request = z.object({
  subscriptionId: z.string(),
});

type GetStripeSubscriptionRequest = z.infer<typeof request>;

export const getStripeSubscriptionFn = createServerFn({ method: "GET" })
  .validator((data: GetStripeSubscriptionRequest) => request.parse(data))
  .handler(async ({ data }) => {
    /** https://docs.stripe.com/api/subscriptions/object?api-version=2025-04-30.basil */
    const response = await stripeClient.subscriptions.retrieve(
      data.subscriptionId,
    );

    if (response.items.has_more) {
      console.warn(
        "Stripe subscription has more items than was returned. Expected only 1.",
      );
    }

    const itemData = response.items.data;
    if (itemData.length > 1) {
      console.warn(
        "Stripe subscription has more than 1 item. Expected only 1.",
      );
    }

    const price = itemData[0].price;
    return {
      id: price.id,
      price: maskAsDollar(price.unit_amount),
      currency: price.currency,
      interval: price.recurring?.interval,
    };
  });

function maskAsDollar(pennyUnit: number | null) {
  if (!pennyUnit) {
    return "0.00";
  }

  const asDollars = pennyUnit / 100;
  return asDollars.toFixed(2);
}
