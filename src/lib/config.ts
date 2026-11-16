// اسم مؤقت — غيّره هنا فقط.
export const APP_NAME = "مسوّق";

export const PLANS = {
  free: { label: "مجاني", monthlyTokens: 250, maxSites: 1 },
  starter: { label: "Starter", monthlyTokens: 2000, maxSites: 3 },
  pro: { label: "Pro", monthlyTokens: 4400, maxSites: 8 },
} as const;
export type Plan = keyof typeof PLANS;
