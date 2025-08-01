/** https://www.better-auth.com/docs/plugins/stripe#set-up-stripe-webhooks
 *
 * Events:
 * - checkout.session.completed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - customer.subscription.paused
 * - customer.subscription.resumed
 */

import { env } from "@/env.server";
import Stripe from "stripe";

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});
