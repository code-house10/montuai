// اسم مؤقت — غيّره هنا فقط.
export const APP_NAME = "مسوّق";

export const PLANS = {
  free: { label: "مجاني", monthlyTokens: 100000, maxSites: 1 }, // ponytail: test value, back to 250 before public launch (admin panel will set per-user grants)
  starter: { label: "Starter", monthlyTokens: 2000, maxSites: 3 },
  pro: { label: "Pro", monthlyTokens: 4400, maxSites: 8 },
} as const;
export type Plan = keyof typeof PLANS;

/** Token price of each action. */
export const COSTS = { analysis: 100, article: 60, social: 30, pageBuild: 150, pageEdit: 50 } as const;
