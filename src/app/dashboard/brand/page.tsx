import Link from "next/link";
import { getBrand } from "@/lib/brand";
import { requireOrg } from "@/lib/session";
import { currentSite, listSites } from "@/lib/sites";
import { BrandForm } from "./brand-form";

export default async function BrandPage() {
  const org = await requireOrg();
  const site = await currentSite(await listSites(org.orgId));

  if (!site)
    return (
      <p className="text-muted">
        <Link href="/dashboard" className="underline">
          أضف موقعاً
        </Link>{" "}
        أولاً لتبني ملف علامته.
      </p>
    );

  const { brand, saved } = await getBrand(site.id);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">ملف العلامة التجارية</h1>
        <p className="text-sm text-muted">
          {site.name} ·{" "}
          {saved
            ? "محفوظ. إعادة تحليل الموقع لا تغيّر ما كتبته هنا."
            : brand.positioning
              ? "مسودة مملوءة من تحليل الموقع. راجعها ثم احفظ."
              : "فارغ. حلّل الموقع لملئه تلقائياً، أو اكتبه بنفسك."}
        </p>
      </div>
      {/* key: switching sites must reset the uncontrolled fields */}
      <BrandForm key={site.id} brand={brand} />
    </div>
  );
}
