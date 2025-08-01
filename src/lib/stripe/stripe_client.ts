import { env } from "@/env.server";
import Stripe from "stripe";

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});
