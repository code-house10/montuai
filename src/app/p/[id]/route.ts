import { publishedHtml } from "@/lib/builder";
import { ensureSchema } from "@/lib/db";

/** Public view of a published page. The CSP sandbox keeps generated markup away from the app's cookies and origin. */
export async function GET(_req: Request, ctx: RouteContext<"/p/[id]">) {
  const { id } = await ctx.params;
  await ensureSchema();
  const html = await publishedHtml(id);
  if (!html) return new Response("Not found", { status: 404 });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy": "sandbox allow-popups; default-src 'none'; style-src 'unsafe-inline'; img-src data: https:; font-src data:",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex",
    },
  });
}
