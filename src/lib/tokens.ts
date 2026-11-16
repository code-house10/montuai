import type { Client } from "@libsql/client";

export const LEDGER_SQL = `CREATE TABLE IF NOT EXISTS token_ledger (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`;

export async function balance(db: Client, orgId: string): Promise<number> {
  const r = await db.execute({
    sql: "SELECT COALESCE(SUM(delta),0) AS b FROM token_ledger WHERE org_id = ?",
    args: [orgId],
  });
  return Number(r.rows[0].b);
}

export async function grant(db: Client, orgId: string, amount: number, reason: string) {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error("bad amount");
  await db.execute({
    sql: "INSERT INTO token_ledger (id, org_id, delta, reason) VALUES (?,?,?,?)",
    args: [crypto.randomUUID(), orgId, amount, reason],
  });
}

/** Charges atomically; returns false (and writes nothing) if the balance is too low. */
export async function charge(db: Client, orgId: string, amount: number, reason: string): Promise<boolean> {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error("bad amount");
  const r = await db.execute({
    sql: `INSERT INTO token_ledger (id, org_id, delta, reason)
          SELECT ?, ?, ?, ?
          WHERE (SELECT COALESCE(SUM(delta),0) FROM token_ledger WHERE org_id = ?) >= ?`,
    args: [crypto.randomUUID(), orgId, -amount, reason, orgId, amount],
  });
  return r.rowsAffected === 1;
}
