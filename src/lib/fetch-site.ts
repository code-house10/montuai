import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_BYTES = 600_000;
const MAX_REDIRECTS = 3;

/** True for loopback, private, link-local, CGNAT, multicast and other non-public addresses. */
export function isPrivateIp(ip: string): boolean {
  const mapped = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) ip = mapped[1];
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  if (isIP(ip) === 6) {
    const s = ip.toLowerCase();
    return s === "::" || s === "::1" || /^f[cd]/.test(s) || /^fe[89ab]/.test(s) || s.startsWith("ff") || s.startsWith("::ffff:");
  }
  return true; // not an IP at all
}

async function assertPublic(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("blocked protocol");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (addrs.length === 0 || addrs.some((a) => isPrivateIp(a.address))) throw new Error("blocked host");
}

/**
 * Fetches a user-supplied page, re-validating every redirect hop so it can't be bounced to an internal address.
 * ponytail: the host is resolved once here and again by fetch, so a DNS-rebinding attacker could still slip
 * through; pin the resolved IP with a custom dispatcher if this ever runs next to private services.
 */
export async function fetchPublicHtml(rawUrl: string): Promise<{ url: string; html: string }> {
  let url = new URL(rawUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublic(url);
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(12_000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; SiteAnalyzer/1.0)", accept: "text/html,*/*;q=0.5" },
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new Error("redirect without location");
      url = new URL(loc, url);
      continue;
    }
    if (!res.ok) throw new Error(`site responded ${res.status}`);
    if (!/html/i.test(res.headers.get("content-type") ?? "")) throw new Error("not an html page");

    const reader = res.body!.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (size < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      size += value.length;
    }
    await reader.cancel().catch(() => {});
    return { url: url.href, html: Buffer.concat(chunks).toString("utf8") };
  }
  throw new Error("too many redirects");
}

export type PageFacts = {
  title: string;
  description: string;
  lang: string;
  headings: string[];
  colors: string[];
  logo: string | null;
  text: string;
};

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

const clean = (s: string) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function meta(html: string, key: string): string {
  const tag = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]*>`, "i"))?.[0];
  return clean(tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? "");
}

/** ponytail: regex extraction, good enough for head tags and visible text; swap for a real parser if it misreads pages. */
export function extractFacts(html: string, baseUrl: string): PageFacts {
  const body = html.replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");

  const counts = new Map<string, number>();
  for (const m of html.matchAll(/#([0-9a-f]{6})\b/gi)) {
    const c = "#" + m[1].toLowerCase();
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    if (Math.max(r, g, b) - Math.min(r, g, b) < 24) continue; // skip greys, black, white
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  const colors = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c);
  const theme = meta(html, "theme-color");
  if (/^#[0-9a-f]{6}$/i.test(theme) && !colors.includes(theme.toLowerCase())) colors.unshift(theme.toLowerCase());

  const icon = html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/i)?.[0].match(/href=["']([^"']+)["']/i)?.[1];
  const rawLogo = meta(html, "og:image") || icon || "";
  let logo: string | null = null;
  try {
    const u = rawLogo ? new URL(rawLogo, baseUrl) : null;
    if (u && (u.protocol === "http:" || u.protocol === "https:")) logo = u.href;
  } catch {}

  return {
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") || meta(html, "og:title"),
    description: meta(html, "description") || meta(html, "og:description"),
    lang: html.match(/<html[^>]+lang=["']([a-zA-Z-]{2,10})["']/i)?.[1] ?? "",
    headings: [...body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => clean(m[1])).filter(Boolean).slice(0, 20),
    colors: colors.slice(0, 5),
    logo,
    text: clean(body).slice(0, 6000),
  };
}
