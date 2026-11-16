import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db, ensureSchema } from "./db";
import { PLANS, type Plan } from "./config";
import { grant } from "./tokens";

/** Signed-in user + their org. Creates both (with the welcome grant) on first visit. */
export async function requireOrg() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/");
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
      args: [userId, email, session.user?.name ?? null, session.user?.image ?? null],
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
