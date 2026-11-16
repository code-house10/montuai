import assert from "node:assert/strict";
import { test } from "node:test";
import { cleanHtml } from "./clean-html.ts";

const body = "<p>x</p>".repeat(100);

test("cleanHtml keeps one document, drops fences and scripts", () => {
  const out = cleanHtml("```html\n<!doctype html><html><body>" + body + "<script>alert(1)</script><SCRIPT src=x></SCRIPT></body></html>\n```\nnotes");
  assert.ok(out);
  assert.ok(out.startsWith("<!doctype html>") && out.endsWith("</html>"));
  assert.ok(!/script/i.test(out));
});

test("cleanHtml rejects text that is not a full document", () => {
  assert.equal(cleanHtml("Sorry, I cannot do that."), null);
  assert.equal(cleanHtml("<html><body>tiny</body></html>"), null);
});
