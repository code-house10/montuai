/** Raw model text. Throws on missing key or HTTP errors. */
export async function generateText(prompt: string, json = false): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  // The lite model has its own (larger) free quota, so it covers the main one when that is
  // out of quota (429), overloaded (503) or retired (404).
  const models = [process.env.GEMINI_MODEL || "gemini-flash-latest", "gemini-flash-lite-latest"];
  const signal = AbortSignal.timeout(50_000); // one deadline for all attempts; the route allows 60s

  let res!: Response;
  for (const model of models) {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      signal,
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { ...(json && { responseMimeType: "application/json" }), temperature: 0.4 },
      }),
    });
    if (![404, 429, 503].includes(res.status)) break;
  }
  if (!res.ok) throw new Error(`gemini responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
}

/** Asks Gemini for a JSON object. Throws additionally on unparseable output. */
export async function generateJson(prompt: string): Promise<Record<string, unknown>> {
  const parsed: unknown = JSON.parse(await generateText(prompt, true));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("gemini returned non-object");
  return parsed as Record<string, unknown>;
}

/** Arabic explanation for a Gemini failure the user can act on, or null for anything else. */
export function aiErrorMessage(e: unknown): string | null {
  const m = e instanceof Error ? e.message : "";
  if (/GEMINI_API_KEY is not set/.test(m)) return "مفتاح Gemini غير مضاف في إعدادات الخادم (GEMINI_API_KEY).";
  if (/gemini responded 429/.test(m)) return "تم تجاوز حد الاستخدام لمفتاح Gemini. انتظر قليلاً أو فعّل الفوترة.";
  if (/location is not supported/i.test(m)) return "Gemini غير متاح من منطقة الخادم. غيّر منطقة الدوال في Vercel إلى منطقة أمريكية.";
  // ponytail: shows Google's own reason while testing; drop the detail before public launch.
  const detail = /"message":\s*"([^"]{0,160})/.exec(m)?.[1] ?? "";
  if (/gemini responded 40[13]/.test(m) || /API key/i.test(m)) return `مفتاح Gemini غير صالح أو غير مسموح له. (${detail})`;
  if (/gemini responded 400/.test(m)) return `Gemini رفض الطلب. (${detail})`;
  if (/gemini responded 404/.test(m)) return "اسم نموذج Gemini غير صحيح (GEMINI_MODEL).";
  if (/gemini responded 5\d\d/.test(m)) return "خدمة Gemini غير متاحة الآن. حاول بعد قليل.";
  return null;
}
