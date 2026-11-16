import test from "node:test";
import assert from "node:assert/strict";
import { extractFacts, fetchPublicHtml, isPrivateIp } from "./fetch-site.ts";

test("isPrivateIp blocks internal ranges and allows public ones", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "224.0.0.1", "::1", "::", "fd00::1", "fe80::1", "::ffff:10.0.0.1", "::ffff:7f00:1", "not-an-ip"])
    assert.equal(isPrivateIp(ip), true, ip);
  for (const ip of ["8.8.8.8", "172.32.0.1", "100.128.0.1", "1.1.1.1", "2606:4700:4700::1111", "::ffff:8.8.8.8"])
    assert.equal(isPrivateIp(ip), false, ip);
});

test("fetchPublicHtml refuses internal targets and odd protocols", async () => {
  await assert.rejects(() => fetchPublicHtml("http://127.0.0.1:3000/"), /blocked host/);
  await assert.rejects(() => fetchPublicHtml("http://[::1]/"), /blocked host/);
  await assert.rejects(() => fetchPublicHtml("http://169.254.169.254/latest/meta-data"), /blocked host/);
  await assert.rejects(() => fetchPublicHtml("file:///etc/passwd"), /blocked protocol/);
});

test("extractFacts reads head tags, headings, colors and visible text", () => {
  const html = `<html lang="ar"><head><title>محمصة &amp; بن</title>
    <meta name="description" content="قهوة مختصة">
    <meta property="og:image" content="/logo.png">
    <style>.a{color:#B8733D} .b{color:#b8733d;background:#ffffff} .c{color:#0f766e}</style>
    <script>var secret = "#123456 hidden";</script></head>
    <body><h1>أهلاً <b>بك</b></h1><p>نص ظاهر</p></body></html>`;
  const f = extractFacts(html, "https://example.com/shop/");
  assert.equal(f.title, "محمصة & بن");
  assert.equal(f.description, "قهوة مختصة");
  assert.equal(f.lang, "ar");
  assert.deepEqual(f.headings, ["أهلاً بك"]);
  assert.equal(f.colors[0], "#b8733d");
  assert.ok(!f.colors.includes("#ffffff"));
  assert.equal(f.logo, "https://example.com/logo.png");
  assert.match(f.text, /نص ظاهر/);
  assert.doesNotMatch(f.text, /secret/);
});
