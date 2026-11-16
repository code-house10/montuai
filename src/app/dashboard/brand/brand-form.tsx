"use client";

import { useActionState } from "react";
import type { Brand } from "@/lib/brand";
import { saveBrandAction } from "../actions";

const LISTS: { name: keyof Brand; label: string; hint: string }[] = [
  { name: "audience", label: "شرائح الجمهور", hint: "من تخاطب؟ شريحة في كل سطر." },
  { name: "differentiators", label: "عوامل التمايز", hint: "لماذا أنت لا البديل؟ حقائق لا شعارات." },
  { name: "alwaysWords", label: "كلمات نستخدمها دائماً", hint: "اسم المنتج والفئة والعبارات الخاصة بك." },
  { name: "neverWords", label: "كلمات لا نستخدمها أبداً", hint: "ممنوعة في كل المحتوى." },
  { name: "bannedClaims", label: "ادعاءات ممنوعة", hint: "ما لا يصح قوله قانونياً أو واقعياً." },
];

const field = "rounded-lg border border-line px-3 py-2 text-sm";

export function BrandForm({ brand }: { brand: Brand }) {
  const [message, action, pending] = useActionState(saveBrandAction, null);
  return (
    <form action={action} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4">
      <label className="flex flex-col gap-1 text-sm font-semibold">
        التموضع
        <span className="font-normal text-muted">ما الذي تقدمه ولمن، في فقرة قصيرة.</span>
        <textarea name="positioning" rows={4} maxLength={1200} defaultValue={brand.positioning} className={`${field} font-normal`} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        نبرة الخطاب
        <input name="tone" maxLength={300} defaultValue={brand.tone} className={`${field} font-normal`} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        {LISTS.map((l) => (
          <label key={l.name} className="flex flex-col gap-1 text-sm font-semibold">
            {l.label}
            <span className="font-normal text-muted">{l.hint} حتى 10 أسطر.</span>
            <textarea name={l.name} rows={4} defaultValue={(brand[l.name] as string[]).join("\n")} className={`${field} font-normal`} />
          </label>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink disabled:opacity-60">
          {pending ? "جارٍ الحفظ…" : "حفظ"}
        </button>
        {message && (
          <p role="status" className="text-sm text-muted">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
