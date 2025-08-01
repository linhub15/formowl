export const SUBSCRIPTION_PLAN = {
  free: "free",
  alpha: "alpha",
  pro: "pro",
} as const;

type Plan = {
  name: keyof typeof SUBSCRIPTION_PLAN;
  label: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  limits: Limits;
};

type Limits = {
  linkedEmails: number;
  monthlyEmailNotifications: number;
};

export function safeGetPlan(
  name: string | undefined | null,
  fallback: keyof typeof PLANS = "free",
): Plan {
  return PLANS[name as keyof typeof PLANS] ?? PLANS[fallback];
}

export const PLANS: Record<keyof typeof SUBSCRIPTION_PLAN, Plan> = {
  [SUBSCRIPTION_PLAN.free]: {
    name: SUBSCRIPTION_PLAN.free,
    label: "Free Tier",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "25 email notifications / month",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "Custom thank you page",
      "1 linked emails",
    ],
    limits: {
      linkedEmails: 1,
      monthlyEmailNotifications: 25,
    },
  },
  [SUBSCRIPTION_PLAN.alpha]: {
    name: SUBSCRIPTION_PLAN.alpha,
    label: "Alpha Tier",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "50 email notifications / month",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "Custom thank you page",
      "5 linked emails",
    ],
    limits: {
      linkedEmails: 5,
      monthlyEmailNotifications: 50,
    },
  },
  [SUBSCRIPTION_PLAN.pro]: {
    name: SUBSCRIPTION_PLAN.pro,
    label: "Pro Tier",
    monthlyPrice: 10,
    annualPrice: 100,
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "50 email notifications / month",
      "Anti-spam honeypot",
      "Cloudflare turnstile",
      "Custom thank you page",
      "5 linked emails",
    ],
    limits: {
      linkedEmails: 5,
      monthlyEmailNotifications: 50,
    },
  },
} as const;

// "Unlimited forms",
// "Unlimited submissions",
// "1000 email notifications",
// "10 linked emails",
// "Anti-spam honeypot",
// "Cloudflare turnstile",
// "Bring your own SMTP (coming soon)",
// "Custom redirect (coming soon)",
// "3 team members (coming soon)",
// "API access (coming soon)",
