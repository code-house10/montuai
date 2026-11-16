import { PLANS } from "@/lib/config";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/session";
import { balance } from "@/lib/tokens";

export default async function Usage() {
  const org = await requireOrg();
  const tokens = await balance(db, org.orgId);
  const rows = (
    await db.execute({
      sql: "SELECT delta, reason, created_at FROM token_ledger WHERE org_id = ? ORDER BY created_at DESC LIMIT 50",
      args: [org.orgId],
    })
  ).rows;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">الاستخدام</h1>
      <section className="rounded-xl border border-line bg-white p-4">
        <p className="text-sm text-muted">الرصيد المتاح · خطة {PLANS[org.plan].label}</p>
        <p className="text-3xl font-bold">{tokens} توكن</p>
      </section>
      <table className="w-full rounded-xl border border-line bg-white text-sm">
        <thead className="text-muted">
          <tr>
            <th className="p-3 text-start font-normal">السبب</th>
            <th className="p-3 text-start font-normal">التغيير</th>
            <th className="p-3 text-start font-normal">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              <td className="p-3">{String(r.reason)}</td>
              <td dir="ltr" className="p-3 text-end">
                {Number(r.delta) > 0 ? "+" : ""}
                {Number(r.delta)}
              </td>
              <td dir="ltr" className="p-3 text-end">
                {String(r.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
