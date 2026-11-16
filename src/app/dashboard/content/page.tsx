import Link from "next/link";
import { COSTS } from "@/lib/config";
import { PLATFORMS, listArtifacts } from "@/lib/content";
import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { ArticleForm, SocialForm } from "./forms";

// Generation runs inside the server action and waits for the model.
export const maxDuration = 60;

export default async function ContentPage() {
  const org = await requireOrg();
  const site = await currentSite(await listSites(org.orgId));
  if (!site)
    return (
      <p className="text-muted">
        <Link href="/dashboard" className="underline">
          أضف موقعاً
        </Link>{" "}
        أولاً لتنشئ محتواه.
      </p>
    );

  const items = await listArtifacts(site.id);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">إنشاء المحتوى</h1>
        <p className="text-sm text-muted">
          {site.name} · كل ما يُنشأ هنا يلتزم بـ
          <Link href="/dashboard/brand" className="underline">
            ملف العلامة
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ArticleForm cost={COSTS.article} />
        <SocialForm cost={COSTS.social} platforms={PLATFORMS} />
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">المكتبة ({items.length})</h2>
        {items.length === 0 && <p className="text-sm text-muted">لم تُنشئ أي محتوى بعد.</p>}
        {items.map((it) => (
          <details key={it.id} className="rounded-xl border border-line bg-white p-4">
            <summary className="cursor-pointer text-sm">
              <span className="rounded bg-paper px-2 py-0.5 text-xs text-muted">{it.kind === "article" ? "مقال" : "سوشيال"}</span>{" "}
              <span className="font-semibold">{it.title}</span>
            </summary>
            <div dir="auto" className="mt-4 flex flex-col gap-4 text-sm leading-7">
              {it.kind === "article" ? (
                <article className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold">{it.data.title}</h3>
                  {it.data.metaDescription && <p className="rounded-lg bg-paper p-2 text-muted">الوصف التعريفي: {it.data.metaDescription}</p>}
                  <p className="whitespace-pre-line">{it.data.intro}</p>
                  {it.data.sections.map((s, i) => (
                    <section key={i}>
                      <h4 className="text-base font-bold">{s.heading}</h4>
                      <p className="whitespace-pre-line">{s.body}</p>
                    </section>
                  ))}
                  {it.data.faq.length > 0 && <h4 className="text-base font-bold">أسئلة شائعة</h4>}
                  {it.data.faq.map((f, i) => (
                    <div key={i}>
                      <p className="font-semibold">{f.q}</p>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </article>
              ) : (
                it.data.map((p, i) => (
                  <div key={i} className="rounded-lg border border-line p-3">
                    <p className="mb-1 text-xs font-semibold text-brand">{PLATFORMS[p.platform] ?? p.platform}</p>
                    <p className="whitespace-pre-line">{p.text}</p>
                    {p.hashtags.length > 0 && <p className="mt-2 text-muted">{p.hashtags.map((h) => `#${h}`).join(" ")}</p>}
                  </div>
                ))
              )}
            </div>
          </details>
        ))}
      </section>
    </div>
  );
}
