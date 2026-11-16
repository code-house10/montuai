import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import { db, ensureSchema } from "./db";
import { PLANS, type Plan } from "./config";
import { grant } from "./tokens";

/**
 * Dev-only bypass: DEV_USER_EMAIL in .env.local signs you in as that user without Google.
 * Ignored in production builds, so it can never open a deployed site.
 */
export async function sessionUser() {
  // Auth.js re-encrypts the session cookie (random IV) on every read; without this Next treats
  // the page as prerenderable and fails production renders with "blocking-prerender-crypto".
  await connection();
  const dev = process.env.NODE_ENV !== "production" && process.env.DEV_USER_EMAIL;
  if (dev) return { email: dev, name: null, image: null };
  const u = (await auth())?.user;
  return u?.email ? { email: u.email, name: u.name ?? null, image: u.image ?? null } : null;
}

/** Signed-in user + their org. Creates both (with the welcome grant) on first visit. */
export async function requireOrg() {
  const user = await sessionUser();
  if (!user) redirect("/");
  const email = user.email;
  await ensureSchema();

  const find = () =>
    db.execute({
      sql: `SELECT u.id AS user_id, u.name, o.id AS org_id, o.plan
            FROM users u JOIN orgs o ON o.owner_id = u.id WHERE u.email = ?`,
      args: [email],
    });
  let row = (await find()).rows[0];
  if (!row) {
    const userId = crypto.randomUUID();
    const orgId = crypto.randomUUID();
    // UNIQUE(email) makes a concurrent first request lose cleanly instead of double-granting.
    const ins = await db.execute({
      sql: "INSERT OR IGNORE INTO users (id, email, name, image) VALUES (?,?,?,?)",
      args: [userId, email, user.name, user.image],
    });
    if (ins.rowsAffected === 1) {
      await db.execute({ sql: "INSERT INTO orgs (id, owner_id) VALUES (?,?)", args: [orgId, userId] });
      await grant(db, orgId, PLANS.free.monthlyTokens, "رصيد ترحيبي");
    }
    row = (await find()).rows[0];
    if (!row) redirect("/");
  }
  return {
    userId: String(row.user_id),
    orgId: String(row.org_id),
    name: (row.name as string | null) ?? email,
    plan: (String(row.plan) in PLANS ? String(row.plan) : "free") as Plan,
  };
}
