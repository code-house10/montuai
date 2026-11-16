import Link from "next/link";
import { PAGE_GOALS, PAGE_STYLES, PAGE_TYPES, listPages } from "@/lib/builder";
import { COSTS } from "@/lib/config";
import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { setPublishedAction } from "../actions";
import { BuildForm, EditForm } from "./forms";

// Building runs inside the server action and waits for the model.
export const maxDuration = 60;

export default async function BuilderPage({ searchParams }: PageProps<"/dashboard/builder">) {
  const org = await requireOrg();
  const site = await currentSite(await listSites(org.orgId));
  if (!site)
    return (
      <p className="text-muted">
        <Link href="/dashboard" className="underline">
          أضف موقعاً
        </Link>{" "}
        أولاً لتبني صفحاته.
      </p>
    );

  const pages = await listPages(site.id);
  const wanted = (await searchParams).page;
  const page = pages.find((p) => p.id === wanted) ?? pages[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">بناء موقع</h1>
        <p className="text-sm text-muted">{site.name} · صفحة كاملة من وصفك، بألوان ونبرة ملف العلامة، ثم عدّلها بالكلام.</p>
      </div>

      <BuildForm cost={COSTS.pageBuild} types={PAGE_TYPES} styles={PAGE_STYLES} goals={PAGE_GOALS} />

      {pages.length > 1 && (
        <nav className="flex flex-wrap gap-2 text-sm">
          {pages.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/builder?page=${p.id}`}
              className={`max-w-56 truncate rounded-lg border px-3 py-1.5 ${p.id === page?.id ? "border-brand bg-white font-semibold" : "border-line hover:bg-white"}`}
            >
              {p.title}
            </Link>
          ))}
        </nav>
      )}

      {page && (
        <section className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <h2 className="min-w-0 flex-1 truncate font-semibold">{page.title}</h2>
            <a download="page.html" href={`data:text/html;charset=utf-8,${encodeURIComponent(page.html)}`} className="underline">
              تنزيل HTML
            </a>
            <form action={setPublishedAction}>
              <input type="hidden" name="pageId" value={page.id} />
              <input type="hidden" name="publish" value={page.published ? "0" : "1"} />
              <button className="rounded-lg border border-line px-3 py-1.5 hover:bg-paper">{page.published ? "إلغاء النشر" : "انشر برابط عام"}</button>
            </form>
          </div>
          {page.published && (
            <p className="text-sm text-muted">
              منشورة على:{" "}
              <a href={`/p/${page.id}`} target="_blank" rel="noreferrer" dir="ltr" className="underline">
                /p/{page.id}
              </a>
            </p>
          )}
          {/* sandbox="" : generated markup runs with no scripts and no access to this app */}
          <iframe key={page.updatedAt} title={page.title} sandbox="" srcDoc={page.html} className="h-[70vh] w-full rounded-lg border border-line" />
          <EditForm key={page.id} cost={COSTS.pageEdit} pageId={page.id} />
        </section>
      )}
    </div>
  );
}
