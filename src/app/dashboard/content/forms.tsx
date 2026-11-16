"use client";

import { useActionState } from "react";
import { createArticleAction, createSocialAction } from "../actions";

const field = "rounded-lg border border-line px-3 py-2 text-sm font-normal";
const card = "flex flex-col gap-3 rounded-xl border border-line bg-white p-4";

function Submit({ pending, label, error }: { pending: boolean; label: string; error: string | null }) {
  return (
    <>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button disabled={pending} className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink disabled:opacity-60">
        {pending ? "جارٍ الإنشاء… قد يستغرق نصف دقيقة" : label}
      </button>
    </>
  );
}

export function ArticleForm({ cost }: { cost: number }) {
  const [error, action, pending] = useActionState(createArticleAction, null);
  return (
    <form action={action} className={card}>
      <h2 className="font-semibold">مقال SEO</h2>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        موضوع المقال
        <textarea name="topic" required rows={2} maxLength={500} className={field} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        الكلمة المفتاحية (اختياري)
        <input name="keyword" maxLength={100} className={field} />
      </label>
      <Submit pending={pending} label={`إنشاء المقال (${cost} توكن)`} error={error} />
    </form>
  );
}

export function SocialForm({ cost, platforms }: { cost: number; platforms: Record<string, string> }) {
  const [error, action, pending] = useActionState(createSocialAction, null);
  return (
    <form action={action} className={card}>
      <h2 className="font-semibold">منشورات السوشيال</h2>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        موضوع المنشور
        <textarea name="topic" required rows={2} maxLength={500} className={field} />
      </label>
      <fieldset className="flex flex-wrap gap-3 text-sm">
        <legend className="mb-1 font-semibold">المنصات</legend>
        {Object.entries(platforms).map(([id, label]) => (
          <label key={id} className="flex items-center gap-1">
            <input type="checkbox" name="platforms" value={id} defaultChecked={id !== "tiktok"} />
            {label}
          </label>
        ))}
      </fieldset>
      <Submit pending={pending} label={`إنشاء المنشورات (${cost} توكن)`} error={error} />
    </form>
  );
}
