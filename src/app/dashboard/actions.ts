"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { PLANS } from "@/lib/config";
import { requireOrg } from "@/lib/session";
import { brandFromForm, saveBrand } from "@/lib/brand";
import { runAnalysis } from "@/lib/analysis";
import { currentSite, listSites } from "@/lib/sites";

export async function addSite(_prev: string | null, form: FormData): Promise<string | null> {
  const { orgId, plan } = await requireOrg();
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  const rawUrl = String(form.get("url") ?? "").trim();
  if (!name) return "اكتب اسم الموقع.";

  let url: string | null = null;
  if (rawUrl) {
    try {
      const u = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
      url = u.origin + u.pathname.replace(/\/$/, "");
    } catch {
      return "رابط الموقع غير صالح.";
    }
  }

  const id = crypto.randomUUID();
  // Limit enforced inside the INSERT so two parallel submits can't both pass the check.
  const r = await db.execute({
    sql: `INSERT INTO websites (id, org_id, name, url)
          SELECT ?, ?, ?, ? WHERE (SELECT COUNT(*) FROM websites WHERE org_id = ?) < ?`,
    args: [id, orgId, name, url, orgId, PLANS[plan].maxSites],
  });
  if (r.rowsAffected !== 1) return `خطتك الحالية تسمح بـ ${PLANS[plan].maxSites} موقع فقط.`;

  (await cookies()).set("site", id, { httpOnly: true, sameSite: "lax", path: "/" });
  revalidatePath("/dashboard", "layout");
  return null;
}

export async function selectSite(form: FormData) {
  await requireOrg();
  // Ownership is checked where the cookie is read (currentSite), not here.
  (await cookies()).set("site", String(form.get("id") ?? ""), { httpOnly: true, sameSite: "lax", path: "/" });
  revalidatePath("/dashboard", "layout");
}

export async function analyzeSite(): Promise<string | null> {
  const { orgId } = await requireOrg();
  const site = await currentSite(await listSites(orgId));
  if (!site) return "أضف موقعاً أولاً.";
  const error = await runAnalysis(orgId, site);
  revalidatePath("/dashboard", "layout");
  return error;
}

export async function saveBrandAction(_prev: string | null, form: FormData): Promise<string | null> {
  const { orgId } = await requireOrg();
  const site = await currentSite(await listSites(orgId));
  if (!site) return "أضف موقعاً أولاً.";
  await saveBrand(site.id, brandFromForm(form));
  revalidatePath("/dashboard/brand");
  return "تم الحفظ.";
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
