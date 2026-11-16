"use client";

import { useActionState } from "react";
import { addSite } from "./actions";

export function AddSiteForm() {
  const [error, action, pending] = useActionState(addSite, null);
  return (
    <form action={action} className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4">
      <h2 className="font-semibold">إضافة موقع</h2>
      <label className="flex flex-col gap-1 text-sm">
        اسم الموقع أو العلامة
        <input name="name" required maxLength={80} className="rounded-lg border border-line px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        الرابط (اختياري)
        <input name="url" dir="ltr" placeholder="https://example.com" className="rounded-lg border border-line px-3 py-2" />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        disabled={pending}
        className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink disabled:opacity-60"
      >
        {pending ? "جارٍ الإضافة…" : "إضافة"}
      </button>
    </form>
  );
}
