import { cookies } from "next/headers";
import { db } from "./db";

export type Site = { id: string; name: string; url: string | null };

export async function listSites(orgId: string): Promise<Site[]> {
  const r = await db.execute({
    sql: "SELECT id, name, url FROM websites WHERE org_id = ? ORDER BY created_at",
    args: [orgId],
  });
  return r.rows.map((x) => ({ id: String(x.id), name: String(x.name), url: x.url as string | null }));
}

/** The cookie only picks among the org's own sites, so a forged id falls back to the first one. */
export async function currentSite(sites: Site[]): Promise<Site | undefined> {
  const id = (await cookies()).get("site")?.value;
  return sites.find((s) => s.id === id) ?? sites[0];
}
