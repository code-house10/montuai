import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@libsql/client";
import { LEDGER_SQL, balance, charge, grant } from "./tokens.ts";

test("ledger: grant, charge, refuse overdraft", async () => {
  const db = createClient({ url: ":memory:" });
  await db.execute(LEDGER_SQL);
  await grant(db, "o1", 250, "welcome");
  assert.equal(await charge(db, "o1", 200, "analysis"), true);
  assert.equal(await charge(db, "o1", 100, "article"), false);
  assert.equal(await balance(db, "o1"), 50);
  assert.equal(await balance(db, "other"), 0);
  await assert.rejects(() => charge(db, "o1", -5, "x"));
});
