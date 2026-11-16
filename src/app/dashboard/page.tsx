import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { AddSiteForm } from "./add-site-form";

export default async function Dashboard() {
  const org = await requireOrg();
  const sites = await listSites(org.orgId);
  const site = await currentSite(sites);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">مرحباً، {org.name}</h1>
      {site ? (
        <section className="rounded-xl border border-line bg-white p-4">
          <p className="text-sm text-muted">الموقع الحالي</p>
          <p className="text-lg font-semibold">{site.name}</p>
          {site.url && (
            <p dir="ltr" className="text-end text-sm text-muted">
              {site.url}
            </p>
          )}
          <p className="mt-3 text-sm text-muted">تحليل الموقع وأدوات الإنشاء تأتي في المرحلة التالية.</p>
        </section>
      ) : (
        <p className="text-muted">ابدأ بإضافة موقعك الأول.</p>
      )}
      <AddSiteForm />
    </div>
  );
}
