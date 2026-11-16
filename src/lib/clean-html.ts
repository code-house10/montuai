/** Model output → one standalone HTML document, or null if it isn't one. Scripts are dropped. */
export function cleanHtml(raw: string): string | null {
  const start = raw.search(/<!doctype html|<html[\s>]/i);
  const end = raw.toLowerCase().lastIndexOf("</html>");
  if (start < 0 || end < start) return null;
  const html = raw
    .slice(start, end + 7)
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<script\b[^>]*>/gi, "");
  return html.length > 500 ? html : null;
}
