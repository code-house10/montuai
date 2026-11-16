import Link from "next/link";
import { APP_NAME, PLANS } from "@/lib/config";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { balance } from "@/lib/tokens";
import { logout, selectSite } from "./actions";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const org = await requireOrg();
  const sites = await listSites(org.orgId);
  const site = await currentSite(sites);
  const tokens = await balance(db, org.orgId);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
      <aside className="flex shrink-0 flex-col gap-4 md:w-56">
        <Link href="/dashboard" className="text-xl font-bold text-brand">
          {APP_NAME}
        </Link>

        {sites.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted">الموقع الحالي</p>
            {sites.map((s) => (
              <form key={s.id} action={selectSite}>
                <input type="hidden" name="id" value={s.id} />
                <button
                  className={`w-full rounded-lg border px-3 py-2 text-start text-sm ${
                    s.id === site?.id ? "border-brand bg-white font-semibold" : "border-line hover:bg-white"
                  }`}
                >
                  {s.name}
                </button>
              </form>
            ))}
          </div>
        )}

        <nav className="flex gap-2 text-sm md:flex-col">
          <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-white">
            لوحة التحكم
          </Link>
          <Link href="/dashboard/brand" className="rounded-lg px-3 py-2 hover:bg-white">
            ملف العلامة
          </Link>
          <Link href="/dashboard/content" className="rounded-lg px-3 py-2 hover:bg-white">
            إنشاء المحتوى
          </Link>
          <Link href="/dashboard/builder" className="rounded-lg px-3 py-2 hover:bg-white">
            بناء موقع
          </Link>
          <Link href="/dashboard/usage" className="rounded-lg px-3 py-2 hover:bg-white">
            الاستخدام
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2 rounded-xl border border-line bg-white p-3 text-sm">
          <p className="truncate font-semibold">{org.name}</p>
          <p className="text-muted">
            {PLANS[org.plan].label} · {tokens} توكن
          </p>
          <form action={logout}>
            <button className="text-muted underline hover:text-ink">تسجيل الخروج</button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
