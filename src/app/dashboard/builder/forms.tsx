"use client";

import { useActionState } from "react";
import { buildPageAction, editPageAction } from "../actions";

const field = "rounded-lg border border-line px-3 py-2 text-sm font-normal";
const button = "self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink disabled:opacity-60";
type Options = Record<string, string>;

function Select({ name, label, options }: { name: string; label: string; options: Options }) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-sm font-semibold">
      {label}
      <select name={name} className={field}>
        {Object.entries(options).map(([id, text]) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

export function BuildForm({ cost, types, styles, goals }: { cost: number; types: Options; styles: Options; goals: Options }) {
  const [error, action, pending] = useActionState(buildPageAction, null);
  return (
    <form action={action} className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4">
      <h2 className="font-semibold">صفحة جديدة</h2>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        ماذا تريد أن تبني؟
        <textarea
          name="brief"
          required
          rows={3}
          maxLength={1500}
          placeholder="مثال: صفحة لمحمصة قهوة مختصة في القاهرة، تعرض الأصناف وطريقة الطلب ونموذج تواصل."
          className={field}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <Select name="type" label="النوع" options={types} />
        <Select name="style" label="الأسلوب" options={styles} />
        <Select name="goal" label="الهدف" options={goals} />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button disabled={pending} className={button}>
        {pending ? "جارٍ البناء… قد يستغرق دقيقة" : `ابنِ الصفحة (${cost} توكن)`}
      </button>
    </form>
  );
}

export function EditForm({ cost, pageId }: { cost: number; pageId: string }) {
  const [error, action, pending] = useActionState(editPageAction, null);
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="pageId" value={pageId} />
      <label className="flex flex-col gap-1 text-sm font-semibold">
        اطلب تعديلاً
        <textarea
          name="instruction"
          required
          rows={2}
          maxLength={1000}
          placeholder="مثال: اجعل القسم الأول أقصر، وأضف قسم أسئلة شائعة."
          className={field}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button disabled={pending} className={button}>
        {pending ? "جارٍ التعديل… قد يستغرق دقيقة" : `عدّل الصفحة (${cost} توكن)`}
      </button>
    </form>
  );
}
