"use client";

import { useActionState } from "react";
import { analyzeSite } from "./actions";

export function AnalyzeButton({ cost, again }: { cost: number; again: boolean }) {
  const [error, action, pending] = useActionState(analyzeSite, null);
  return (
    <form action={action} className="flex flex-col gap-2">
      <button
        disabled={pending}
        className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink disabled:opacity-60"
      >
        {pending ? "جارٍ التحليل… قد يستغرق نصف دقيقة" : `${again ? "إعادة التحليل" : "تحليل الموقع"} (${cost} توكن)`}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
