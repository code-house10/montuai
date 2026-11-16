import { latestAnalysis } from "@/lib/analysis";
import { COSTS } from "@/lib/config";
import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { AddSiteForm } from "./add-site-form";
import { AnalyzeButton } from "./analyze-button";

// The analysis server action fetches the site and waits for the model.
export const maxDuration = 60;

function Items({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="mb-1 text-sm font-semibold">{title}</h3>
      <ul className="list-inside list-disc text-sm text-muted">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function Dashboard() {
  const org = await requireOrg();
  const sites = await listSites(org.orgId);
  const site = await currentSite(sites);
  const analysis = site ? await latestAnalysis(site.id) : null;
  const a = analysis?.data;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">مرحباً، {org.name}</h1>

      {site ? (
        <section className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4">
          <div>
            <p className="text-sm text-muted">الموقع الحالي</p>
            <p className="text-lg font-semibold">{site.name}</p>
            {site.url && (
              <p dir="ltr" className="text-end text-sm text-muted">
                {site.url}
              </p>
            )}
          </div>

          {a && (
            <div className="flex flex-col gap-4 border-t border-line pt-4">
              <div className="flex items-start gap-3">
                {a.logo && (
                  // eslint-disable-next-line @next/next/no-img-element -- arbitrary third-party host
                  <img src={a.logo} alt="" referrerPolicy="no-referrer" className="size-14 rounded-lg border border-line object-contain" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold">{a.title || site.name}</p>
                  {a.businessType && <p className="text-sm text-muted">{a.businessType}</p>}
                </div>
              </div>
              <p className="text-sm leading-7">{a.summary}</p>
              {a.tone && (
                <p className="text-sm">
                  <span className="font-semibold">نبرة الخطاب: </span>
                  <span className="text-muted">{a.tone}</span>
                </p>
              )}
              {a.colors.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold">ألوان الموقع</h3>
                  <div className="flex flex-wrap gap-2">
                    {a.colors.map((c) => (
                      <span key={c} dir="ltr" className="flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-xs">
                        <span className="size-4 rounded" style={{ background: c }} />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <Items title="الجمهور" items={a.audience} />
                <Items title="نقاط القوة" items={a.strengths} />
                <Items title="فرص تسويقية" items={a.opportunities} />
                <Items title="كلمات مفتاحية مقترحة" items={a.keywords} />
              </div>
              <p dir="ltr" className="text-end text-xs text-muted">
                {analysis.createdAt} UTC
              </p>
            </div>
          )}

          {site.url ? (
            <AnalyzeButton cost={COSTS.analysis} again={!!a} />
          ) : (
            <p className="text-sm text-muted">هذا الموقع بلا رابط، لذلك لا يمكن تحليله.</p>
          )}
        </section>
      ) : (
        <p className="text-muted">ابدأ بإضافة موقعك الأول.</p>
      )}

      <AddSiteForm />
    </div>
  );
}
