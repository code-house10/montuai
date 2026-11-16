import { createClient } from "@libsql/client";
import { LEDGER_SQL } from "./tokens";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

// ponytail: schema created on first use; move to real migrations once a column needs changing.
let ready: Promise<unknown> | undefined;
export function ensureSchema() {
  return (ready ??= db.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT, image TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS orgs (
      id TEXT PRIMARY KEY, owner_id TEXT NOT NULL UNIQUE REFERENCES users(id),
      plan TEXT NOT NULL DEFAULT 'free',
      created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS websites (
      id TEXT PRIMARY KEY, org_id TEXT NOT NULL REFERENCES orgs(id),
      name TEXT NOT NULL, url TEXT, type TEXT, language TEXT NOT NULL DEFAULT 'ar',
      created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS analyses (
      id TEXT PRIMARY KEY, website_id TEXT NOT NULL REFERENCES websites(id),
      data TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS brand_profiles (
      website_id TEXT PRIMARY KEY REFERENCES websites(id),
      data TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS artifacts (
      id TEXT PRIMARY KEY, website_id TEXT NOT NULL REFERENCES websites(id),
      kind TEXT NOT NULL, title TEXT NOT NULL, data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    LEDGER_SQL,
  ]));
}
