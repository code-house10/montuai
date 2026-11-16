/** Asks Gemini for a JSON object. Throws on missing key, HTTP errors, or unparseable output. */
export async function generateJson(prompt: string): Promise<Record<string, unknown>> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": key },
    signal: AbortSignal.timeout(45_000),
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
    }),
  });
  if (!res.ok) throw new Error(`gemini responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  const parsed: unknown = JSON.parse(text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("gemini returned non-object");
  return parsed as Record<string, unknown>;
}

/** Arabic explanation for a Gemini failure the user can act on, or null for anything else. */
export function aiErrorMessage(e: unknown): string | null {
  const m = e instanceof Error ? e.message : "";
  if (/GEMINI_API_KEY is not set/.test(m)) return "مفتاح Gemini غير مضاف في إعدادات الخادم (GEMINI_API_KEY).";
  if (/gemini responded 429/.test(m)) return "تم تجاوز حد الاستخدام لمفتاح Gemini. انتظر قليلاً أو فعّل الفوترة.";
  if (/gemini responded 40[013]/.test(m)) return "مفتاح Gemini غير صالح أو غير مسموح له.";
  if (/gemini responded 404/.test(m)) return "اسم نموذج Gemini غير صحيح (GEMINI_MODEL).";
  if (/gemini responded 5dd/.test(m)) return "خدمة Gemini غير متاحة الآن. حاول بعد قليل.";
  return null;
}
