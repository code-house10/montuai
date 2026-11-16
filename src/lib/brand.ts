import { latestAnalysis } from "./analysis";
import { db } from "./db";

/** Editorial brand profile. Every content tool reads this so the output stays on-brand. */
export type Brand = {
  positioning: string;
  tone: string;
  audience: string[];
  differentiators: string[];
  alwaysWords: string[];
  neverWords: string[];
  bannedClaims: string[];
};

export const BRAND_LISTS = ["audience", "differentiators", "alwaysWords", "neverWords", "bannedClaims"] as const;

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "").split(/\r?\n/).map((x) => x.trim().slice(0, 200)).filter(Boolean).slice(0, 10);

export function brandFromForm(form: FormData): Brand {
  return {
    positioning: String(form.get("positioning") ?? "").trim().slice(0, 1200),
    tone: String(form.get("tone") ?? "").trim().slice(0, 300),
    audience: lines(form.get("audience")),
    differentiators: lines(form.get("differentiators")),
    alwaysWords: lines(form.get("alwaysWords")),
    neverWords: lines(form.get("neverWords")),
    bannedClaims: lines(form.get("bannedClaims")),
  };
}

/** The saved profile, or a draft pre-filled from the latest analysis. Manual edits are never overwritten by a re-analysis. */
export async function getBrand(websiteId: string): Promise<{ brand: Brand; saved: boolean }> {
  const r = await db.execute({ sql: "SELECT data FROM brand_profiles WHERE website_id = ?", args: [websiteId] });
  if (r.rows[0]) return { brand: JSON.parse(String(r.rows[0].data)) as Brand, saved: true };
  const a = (await latestAnalysis(websiteId))?.data;
  return {
    saved: false,
    brand: {
      positioning: a?.summary ?? "",
      tone: a?.tone ?? "",
      audience: a?.audience ?? [],
      differentiators: a?.strengths ?? [],
      alwaysWords: [],
      neverWords: [],
      bannedClaims: [],
    },
  };
}

export async function saveBrand(websiteId: string, brand: Brand) {
  await db.execute({
    sql: `INSERT INTO brand_profiles (website_id, data) VALUES (?, ?)
          ON CONFLICT(website_id) DO UPDATE SET data = excluded.data, updated_at = datetime('now')`,
    args: [websiteId, JSON.stringify(brand)],
  });
}
