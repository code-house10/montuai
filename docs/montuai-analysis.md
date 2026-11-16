# تحليل منصة montuai.com — تمهيداً لبناء منتج SaaS مشابه

> تاريخ الفحص: 16 نوفمبر 2026. المصادر: الصفحات العامة (الرئيسية، الأسعار، التكاليف، الأسئلة الشائعة، الشروط، الاسترداد، الأمان، التكاملات، التوثيق) + لوحة التحكم بحساب مجاني بعد تسجيل الدخول بـ Google + رصد طلبات الشبكة أثناء الاستخدام العادي.
> الهدف: وصف **الوظائف والتدفّقات** فقط لبناء منتج أصلي. لا نسخ للاسم أو الشعار أو النصوص أو التصميم.
> ملاحظة قانونية: شروط الخدمة لديهم تمنع صراحة "الهندسة العكسية أو استنساخ أنظمة الأتمتة أو استخراج الـ prompts". لذلك هذا التقرير يكتفي بما يظهر لأي مستخدم عادي، والبناء يجب أن يكون بتنفيذ وكتابة خاصّين بنا.

---

## 1. وصف المنتج وجمهوره

**الفكرة:** "فريق تسويق كامل بالذكاء الاصطناعي في مساحة عمل واحدة". المستخدم يُدخل رابط موقعه (أو ينشئ موقعاً جديداً)، فتحلّل المنصة الموقع وتبني **سياق علامة تجارية موحّد** (هوية بصرية، نبرة، جمهور، منافسون)، ثم تستخدم هذا السياق في كل أدوات الإنتاج: مقالات SEO، منشورات سوشيال، تصاميم، حملات بريد، هوية بصرية، بناء موقع، مع وكيل محادثة (Agent) ينفّذ المهام فعلياً، وطيار آلي (Pilot) يشغّلها بجدول.

**المشغّل:** شركة شخص واحد مسجّلة في مصر (طنطا). أي أن منتجاً بهذا الحجم يبنيه فريق صغير جداً.

**الجمهور:**
- الأعمال الصغيرة بدون فريق تسويق.
- الفريلانسرز (إدارة عدة عملاء).
- وكالات التسويق (مشروع وهوية منفصلة لكل عميل، فريق وصلاحيات).
- المتاجر الإلكترونية (Shopify، سلة، زد...) — تركيز واضح على السوق العربي.

**نقاط البيع الأساسية:** سعر أقل من الأدوات المتفرّقة أو الوكالات، "ينفّذ ولا يكتفي بالاقتراح"، سياق واحد مشترك، دعم كامل للعربية (RTL) وإنجليزية، الشفافية الأمنية.

---

## 2. الصفحات والمميزات

### 2.1 الموقع العام (تسويقي، ثنائي اللغة `/ar` و `/`)
| الصفحة | المحتوى |
|---|---|
| الرئيسية | Hero بحقل "أدخل رابط موقعك ← حلّل"، خيار "إنشاء موقع جديد"، معاينة لوحة تحكم، 3 خطوات، شرح السياق الموحّد، شرائح الجمهور، قائمة الأدوات، "أفكار يومية" بأمثلة، الوكيل، الأسعار، جدول مقارنة، الأمان، CTA نهائي |
| `/tools` + صفحة لكل أداة (~25 صفحة) | صفحات SEO لكل أداة |
| `/solutions/agencies` `/ecommerce` `/small-business` | صفحات حسب الشريحة |
| `/pricing` | تبويبان: أفراد / فرق وشركات، شهري/سنوي (خصم 17%) |
| `/costs` | **جدول تكلفة كل إجراء بالتوكن** (مهم جداً — انظر §3) |
| `/features` `/workflows` `/examples` `/integrations` `/vs` | مميزات، تدفّقات، أمثلة، تكاملات، مقارنات |
| `/docs` | توثيق لكل أداة (ماذا تفعل + المسار المعتاد) |
| `/faq` | أسئلة لكل أداة + الحساب والفوترة |
| `/blog` `/updates` `/about` `/contact` `/support` | محتوى ودعم |
| قانوني | `/terms` `/privacy` `/refund-policy` `/aup` `/cookie-policy` `/security` |
| `/login` `/signup` | Google OAuth + بريد/كلمة سر، Cloudflare Turnstile على التسجيل |

### 2.2 لوحة التحكم `/dashboard` (الشريط الجانبي مقسّم لمجموعات)
- **عام:** لوحة التحكم (رحلة إعداد من 8 خطوات، "ما المهمة اليوم؟" مع اقتراحات، الأعمال الأخيرة، المهام، الحملات، تغطية الخدمات بعدّادات، نشاط 30 يوماً كـ heatmap، منحنى الإنتاج، التنفيذ المباشر، نشاط النظام)، **مُحدِّد الموقع** (Website Selector)، بحث شامل، إشعارات.
- **وكيل مونتو** `/montu-agent`: شات يعرف الموقع وينفّذ مهام (ينشئ مقالات/منشورات/تصاميم، يضيف مهام، يتتبّعها). يُحسب لكل رسالة حسب الاستهلاك.
- **العلامة التجارية:** رؤى الموقع `/website-insights`، نموذج العمل `/business-model`، قوالب البراند `/brand-templates` (شعار، ألوان HEX، خطوط، توجّه بصري + تصدير SVG لبطاقات أعمال وأوراق رسمية وتوقيعات بريد وفواتير)، **Brand IQ** `/brand-iq` (النبرة، مستوى القراءة، كلمات مفضّلة/ممنوعة ≤10، نماذج محتوى، شرائح الجمهور، التموضع، عوامل التمايز، أدلة، عروض سارية، ادعاءات ممنوعة، مع إصدارات وتنزيل).
- **مساحة العمل:** Montu Lab (أفكار يومية واقتراحات)، الحملات، المهام (قائمة/لوحة Kanban)، المخطط (لوحة مرئية)، التقويم، المكتبة، المسودات، Montu Pilot.
- **تحليل:** المنافسون، الظهور في الذكاء الاصطناعي (ذِكر مقابل استشهاد)، الترتيب (مع ربط Google Search Console)، التدقيق التقني + خريطة الموقع، Ads Taps (بريف إعلاني)، جاهزية الوكلاء.
- **إنشاء:** خطة الكلمات المفتاحية، محتوى SEO (مقالات قصير/قياسي/معمّق، منتجات، صفحات، فئات، تحديث صفحة منشورة Content Refresh، الخريطة الموضوعية)، محتوى سوشيال (فيسبوك، X، لينكدإن، إنستجرام، تيك توك)، استوديو التصميم (تصميم سوشيال، صورة بارزة، بانر، صورة منتج، شعار).
- **بناء:** بناء موقع (Montu Code — انظر §4.3)، الهوية البصرية (دليل كامل + شعار).
- **النمو:** جاذبات العملاء Lead Magnets (+ Lead Discovery بالزحف)، E-Content (نصوص بريد)، حملات البريد (إرسال فوري/مجدول/متكرر مع تتبّع فتح ونقرات)، Ads Taps.
- **الأداء:** الأهداف Targets، المؤشرات KPIs، التقارير.
- **الإدارة:** المراجعة والموافقات، تعاون الفريق، المؤسسات `/organizations` (دعوة أعضاء + حدود استخدام + صلاحيات أدوات — للخطط المدفوعة).
- **الحساب:** `/account` (اسم، هاتف بمفتاح دولة، دولة)، `/plan` (الخطة والفوترة + شراء توكن إضافي)، `/usage` (نسبة الاستهلاك + رسم زمني + "أين ذهب").

**ملاحظة سلوكية مهمة:** كل الأدوات تقريباً مقفلة حتى يُضاف موقع، وأغلب أدوات التحليل/الإنشاء تتطلب "تشغيل تحليل الموقع" أولاً — والتحليل في الخطة المجانية يظهر خلف "ترقية الخطة". أي أن **التحليل هو بوابة كل شيء** وهو نقطة التحويل للدفع.

### 2.3 Montu Pilot (الأتمتة)
إعدادات: تشغيل/إيقاف، وضع تلقائي/يدوي، تكرار يومي/أسبوعي/شهري، اختيار أنواع المخرجات (كلمات مفتاحية، مقالات، صفحات منتجات/تعريفية/أقسام، منشورات لكل شبكة، صور مقالات، تصاميم سوشيال، صور منتجات، حملات بريد، جاذب عملاء، نشر المقالات على CMS). الدورة: يفهم ← يرتّب الأولويات ← ينتج ← يجدول. حجم كل دورة يتحدد حسب الرصيد المتبقي.

### 2.4 التكاملات
- **نشر تلقائي (بتوكن API مشفّر):** WordPress، Shopify، Webflow، Ghost، Medium، سلة، زد.
- **إنتاج محتوى لـ (بدون نشر مباشر):** فيسبوك، إنستجرام، لينكدإن، X، تيك توك، Threads، Pinterest، Google Business. (أزالوا النشر المباشر للسوشيال في سبتمبر 2026.)
- **قراءة النتائج:** Google Search Console.
- **على خارطة الطريق:** WooCommerce، Wix، Google Analytics.

---

## 3. الباقات والحدود

### الأسعار (شهري؛ السنوي خصم ~17%)
| الخطة | السعر/شهر | توكن شهرياً | المشاريع (مواقع) | الفريق | إضافات |
|---|---|---|---|---|---|
| مجاني | 0 | ~250 توكن ترحيبي (للحسابات المؤهلة) | — | — | التحليل الكامل مقفل |
| Starter | $29 | 2,000 | 3 | — | كل الأدوات الأساسية |
| Pro | $59 | 4,400 | 8 | — | + تخطيط، بريد، Pilot والوكيل... |
| Growth | $89 | 7,100 | 20 | — | + REST API و Webhooks موقّعة، أولوية طابور، نماذج متقدمة، تقارير مجانية |
| Team | $159 | 13,700 | 10 | 3 أعضاء | + ملخصات بريد/Webhook |
| Scale | $359 | 33,800 | 25 | 5 أعضاء | + نماذج متقدمة |
| Agency | $559 | 57,800 | غير محدود | 8 أعضاء | + مدير حساب |

- **شحن توكن إضافي** متاح فقط للمشتركين.
- التوكن **لا يُرحَّل**، ويُعاد ضبطه كل دورة فوترة.
- **التشغيل الفاشل يُردّ تلقائياً**، والـ batch الجزئي يُردّ جزؤه غير المسلَّم.
- لا استرداد بعد بدء الاستخدام؛ الإلغاء يسري نهاية الدورة؛ نزاعات الفوترة خلال 7 أيام.
- شات الدعم الذاتي (AI): 15 رسالة/ساعة، مُطبّق على الخادم، لا يرى بيانات الحساب.

### تكلفة الإجراءات (بالتوكن)
| الإجراء | التكلفة |
|---|---|
| تحليل الموقع | 200 / تشغيل |
| المنافسون | 95 |
| تقني + خريطة الموقع | 210 |
| الترتيب | 90 |
| الظهور في الذكاء الاصطناعي | 640 |
| جاهزية الوكلاء 45 · Ads Taps 50 · الكرييتف الإعلاني 70 · الأهداف 45 · المؤشرات 45 | — |
| ترجمة النتائج | 85 لكل لغة (مُخزّنة) |
| مقال قصير/قياسي/معمّق | 115 / 170 / 240 |
| منتج/صفحة/فئة موجز/قياسي/مفصّل | 50 / 65 / 85 |
| كلمة مفتاحية | 5 لكل كلمة |
| الخريطة الموضوعية 70 · تحسين صفحة 240 · ملخص العلامة 65 | — |
| منشور سوشيال | 70 (أي شبكة) |
| صورة تصميم (سوشيال/بارزة/بانر/منتج) | 130 |
| شعار | 80 |
| الهوية البصرية (مستند + شعار) | 390 |
| إعادة إنشاء تصميم | 100% من الأصل |
| جاذب عملاء | 100 + 4 لكل lead |
| محتوى إيميل 45 · حملة 35 · إرسال 20 لكل 100 مستلم | — |
| تقرير | 20 (مجاني من Growth) |
| رادار المنافسين | 240 لكل منافس كل 7 أيام |
| الوكيل / بناء الموقع / Pilot | حسب الاستهلاك الفعلي لكل رسالة/دورة |
| الجدولة والتكرار والنشر | مجاناً |

> رصدنا عملياً: توليد النسخة الأولى من صفحة هبوط في Website Builder استهلك **26% من الرصيد المجاني** (≈ 65 توكن إن كان الرصيد 250).

**درس التسعير:** التوكن طبقة تجريد فوق تكلفة الـ LLM الفعلية. كل إجراء له سعر ثابت مُعلن، والإجراءات المفتوحة (شات، بناء) تُحسب بالاستهلاك الحقيقي.

---

## 4. تدفّق المستخدم

### 4.1 التسجيل
1. الزائر يُدخل رابط موقعه في الصفحة الرئيسية ← `/signup` (أو أزرار `signup?plan=pro&interval=month`).
2. التسجيل بـ **Google** (OAuth) أو بريد/كلمة سر (+ Turnstile).
3. دخول مباشر للوحة بالخطة المجانية مع رصيد ترحيبي.
4. أحداث تتبّع: GA4 `sign_up` (مفتاح في localStorage باسم `ga:sign_up:<userId>` لمنع التكرار)، Meta Pixel، TikTok Pixel، Affonso (إحالات)، كوكي `montu_first_touch` (مصدر الإحالة الأول).

### 4.2 الإعداد (Onboarding) — "رحلتك التسويقية: 8 خطوات"
1. **إضافة موقع** — خياران:
   - **لدي موقع:** اسم، رابط، النوع (متجر، مدونة، خدمات، SaaS، سوق، شركة، أخرى)، المنصة (WordPress، Shopify، WooCommerce، Magento، Webflow، Ghost، Salla، Zid، Custom)، لغة الموقع، منطقة السوق (دولة).
   - **إنشاء موقع جديد:** اسم البراند، النوع (Business, Landing, SaaS, E-commerce, Portfolio, Blog)، اللغة ← ينشئ مساحة فارغة ويفتح Website Builder.
2. تشغيل تحليل الموقع (بوابة باقي الأدوات).
3. ضبط Brand IQ وقالب البراند.
4. ثم الإنتاج / الوكيل / Pilot / الربط بالـ CMS / النشر.

### 4.3 تدفّق بناء موقع (جرّبناه فعلياً)
1. نموذج: اسم الموقع، وصف حرّ "ماذا تريد أن يبني؟"، النوع، الستايل (بسيط، فاخر، جريء، تحريري، مرح، مؤسسي)، الهدف (عملاء محتملون، مبيعات، حجوزات، تسجيلات، تنزيلات، وعي)، التخطيط (متوازن، بصري أولاً، محتوى أولاً، تحويل أولاً...)، الحركة (ثابت، خفيف، ديناميكي)، الهوية (من إعدادات مساحة العمل).
2. "بدء البناء" ← `POST /api/montu-code` ينشئ سجل موقع بحالة `DRAFT` ويحوّل كل الاختيارات إلى نص `notes` (BUILD PREFERENCES) يُمرَّر للنموذج.
3. صفحة محرّر `/dashboard/build-website/{siteId}`: شات يسار + معاينة يمين، مع اقتراحات سريعة ("اكتب النسخة الأولى"، "خلّي الواجهة أقصر"، "استخدم ألوان هويتي"، "ضيف FAQ").
4. الرسالة ← `POST /api/montu-code/{siteId}/message` (رد متدفّق Streaming). النموذج يكتب أولاً "اتجاه التصميم" كنص، ثم يبني الصفحة مع عدّاد "تم كتابة 12…21 كيلوبايت".
5. الناتج **ملف HTML واحد** (CSS داخلي بمتغيّرات `:root`، بلا سكربتات خارجية، `lang="ar" dir="rtl"`) يُعرض في `iframe` بـ `srcdoc` و `sandbox=""` (عزل كامل).
6. المعاينة خاصة؛ زر "انشر" يتطلّب **دومين خاص مُتحقَّق منه** (DNS ← حالات VERIFYING / ACTIVE + SSL). لم نضغط "انشر".

### 4.4 الاستخدام اليومي
اختيار الموقع ← (الوكيل أو صفحة الأداة) ← تحديد الإعدادات ← تشغيل مهمة خلفية ← polling لحالة المهمة ← النتيجة في صفحة الأداة + المكتبة ← مراجعة/موافقة ← جدولة في التقويم ← نشر على CMS (إن كان مربوطاً) ← قياس عبر Search Console/التقارير.

---

## 5. الـ APIs المرصودة (أثناء الاستخدام العادي فقط)

> المعرّفات بصيغة **cuid** (مثل `cmwjn...`) ← غالباً Prisma ORM. الصفحات نفسها Server Components (طلبات `?_rsc=`)، وجزء من الكتابة عبر مسارات `/api/*` و/أو Server Actions.

### المصادقة (Auth.js / NextAuth)
| الطريقة | المسار | ملاحظات |
|---|---|---|
| GET | `/api/auth/providers` | قائمة المزوّدين (google + credentials) |
| GET | `/api/auth/csrf` | توكن CSRF |
| POST | `/api/auth/signin/google` | بدء OAuth مع Google ← callback ← كوكي جلسة httpOnly |

الجلسة عبر كوكي httpOnly (لا تظهر لـ JS)، وكلمات السر bcrypt cost 12 (حسب صفحة الأمان).

### التطبيق
| الطريقة | المسار | مثال الرد |
|---|---|---|
| GET | `/api/version` | `{"sha":"efde319…","shortSha":"efde319","ref":"main","deploymentId":"dpl_…","builtAt":"…"}` — لاكتشاف نسخة جديدة وإعادة التحميل |
| GET | `/api/notifications[?websiteId=]` | `{"notifications":[],"unreadCount":0}` |
| GET | `/api/job-status[?websiteId=]` | خريطة حالة كل أداة: `{"/dashboard/keywords":{"s":"idle"}, "/dashboard/articles":{"s":"idle"}, …}` (~35 أداة) — لإظهار مؤشرات "قيد التنفيذ" في الشريط الجانبي |
| GET | `/api/jobs?websiteId=` | `{"jobs":[],"blocked":[]}` — طابور المهام الجارية والمحجوبة |
| GET | `/api/track/retention-context` | `{"userId":"cm…","createdAt":"…"}` — لتحليلات الاحتفاظ |
| GET | `/api/track/ga4-bridge` | جسر GA4 من الخادم |
| POST | `/api/artifact-events` | `{"ok":true}` — تتبّع أحداث المخرجات/الصفحات |
| POST | `/api/meta/route-event` | 204 — أحداث Meta Conversions API من الخادم |
| GET | `/api/brand-assets/logo-lockup?v=` | شعار المنصة |
| POST | `/api/websites` | إنشاء موقع/مساحة عمل ← `{"ok":true,"id":"cm…","name":"…"}` |
| POST | `/api/montu-code` | إنشاء مشروع بناء موقع ← (انظر المثال أدناه) |
| POST | `/api/montu-code/{siteId}/message` | رسالة للمولّد، رد متدفّق |

**مثال رد `POST /api/montu-code` (مختصر):**
```json
{
  "site": {
    "id": "cm…", "websiteId": "cm…", "name": "…", "slug": "…",
    "status": "DRAFT", "goal": "leads", "audience": "", "tone": "premium",
    "language": "ar",
    "sections": ["hero","features","howItWorks","faq","cta"],
    "ctaLabel": "", "ctaUrl": "",
    "notes": "<وصف المستخدم> + BUILD PREFERENCES: type, style, goal, layout, motion, identity",
    "identity": {"logoUrl":"","colors":[],"fonts":[],"voice":"","audience":"","positioning":"","proof":[],"source":"none"},
    "hasDraft": false, "hasUnpublishedChanges": false, "tokenCost": 0,
    "publishedAt": null, "createdAt": "…", "updatedAt": "…"
  },
  "onboarding": false
}
```

**نمط الـ polling:** اللوحة تستعلم كل ~2–3 ثوانٍ عن `notifications` و `job-status` و `jobs`. (بديل أفضل لنا: SSE أو polling تكيّفي يتوقف عند عدم وجود مهام.)

### الخدمات الخارجية (من الكود المرصود + صفحة الأمان)
| الفئة | الخدمة |
|---|---|
| الاستضافة | **Vercel** (Next.js App Router، `dpl_` في روابط الـ chunks، Vercel Analytics/Speed Insights عبر مسارات `/<hash>/script.js` و `/view`) |
| قاعدة البيانات | **Neon PostgreSQL** (الاتحاد الأوروبي) |
| الدفع | **Dodo Payments** (تاجر مُسجّل MoR — يحلّ الضرائب، مناسب لشركة مصرية) |
| الذكاء الاصطناعي | **OpenAI** (نصوص + صور) |
| بيانات SEO | **DataForSEO** (أحجام بحث، SERP، ترتيب، بيانات عربية حسب الدولة) |
| البريد | **Resend** (معاملاتي + الحملات) |
| مكافحة البوتات | **Cloudflare Turnstile** |
| التحليلات/الإعلانات | GA4، Meta Pixel + Conversions API، TikTok Pixel |
| الإحالات | **Affonso** (برنامج شركاء/أفلييت) |

### ممارسات أمنية مُعلنة تستحق التقليد
- تشفير توكنات الـ CMS بـ AES-256-GCM مع IV لكل قيمة ومفتاح بإصدار (key rotation).
- عميل DB مقيّد بالمستخدم في كل طلب (row scoping) + فحص ملكية صريح.
- اختبار توكن CMS بطلب قراءة واحد قبل حفظه.
- حماية SSRF عند جلب روابط المستخدم (رفض العناوين الداخلية في كل redirect).
- Rate limiting عبر قاعدة البيانات (يعمل عبر كل نسخ serverless).
- المهام الطويلة تُسلَّم لنقاط داخلية بسرّ مشترك + توكن لكل تشغيل.
- CSP، HSTS preload، X-Frame-Options DENY.

---

## 6. نموذج بيانات مقترح (Postgres / Prisma أو Drizzle)

```
User(id, email, name, image, passwordHash?, phone?, country?, locale, createdAt)
Account(userId, provider, providerAccountId, …)            -- Auth.js
Session / VerificationToken                                 -- Auth.js

Organization(id, name, ownerId, planId)
Membership(orgId, userId, role[owner|admin|member], toolPermissions json, usageCap?)

Subscription(id, orgId, plan[free|starter|pro|growth|team|scale|agency],
             interval[month|year], status, providerCustomerId, providerSubId,
             currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd)
TokenLedger(id, orgId, delta, reason[grant|topup|charge|refund], jobId?, createdAt)
   -- الرصيد = SUM(delta) للدورة الحالية؛ سجل غير قابل للتعديل (append-only)

Website(id, orgId, name, url?, type, platform, language, market, createdAt)
BrandProfile(websiteId, voice, readingLevel, alwaysWords[], neverWords[], samples[],
             positioning, differentiators[], proof[], offers[], bannedClaims[], version)
BrandTemplate(websiteId, logoUrl, colors[], fonts[], visualDirection)
Audience(id, websiteId, name, description)
Competitor(id, websiteId, domain, notes)

Job(id, websiteId, orgId, tool, params json, status[queued|running|done|failed|partial],
    tokenCost, tokensRefunded, error?, startedAt, finishedAt)
Artifact(id, websiteId, jobId, kind[article|product|page|category|social_post|design|
         email|lead_magnet|ads_brief|report|brand_identity|keyword_plan|analysis],
         channel?, title, content json/text, assetUrl?, status[draft|review|approved|scheduled|published],
         version, createdAt)
AnalysisSnapshot(id, websiteId, type[site|technical|competitors|ranking|ai_visibility], data json, createdAt)
Keyword(id, websiteId, term, volume?, volumeSource[measured|estimated|none], intent, difficulty?, rank?)

Task(id, websiteId, title, status, assigneeId?, artifactId?, dueAt?)
Campaign(id, websiteId, name, status, goal, startAt, endAt)
CalendarItem(id, websiteId, artifactId, channel, scheduledAt, recurrence?, status)
PilotConfig(websiteId, enabled, mode[auto|manual], cadence, enabledKinds[], budgetTokens)

Integration(id, websiteId, provider[wordpress|shopify|webflow|ghost|medium|salla|zid|gsc],
            encryptedCredentials, keyVersion, status, lastVerifiedAt)
EmailList(id, websiteId, name) / Contact(id, listId, email, consent, …)
EmailSend(id, campaignId, recipients, delivered, opens, clicks, scheduledAt, repeat?)

BuiltSite(id, websiteId, slug, status[DRAFT|PUBLISHED], prefs json, html text,
          hasUnpublishedChanges, publishedAt)
BuiltSiteMessage(id, siteId, role, content, tokenCost, createdAt)
Domain(id, siteId, hostname, status[PENDING|VERIFYING|ACTIVE], sslStatus)

AgentThread(id, websiteId, userId) / AgentMessage(id, threadId, role, content, toolCalls json, tokenCost)
Notification(id, userId, kind, payload, readAt)
ApiKey(id, orgId, hashedKey, lastUsedAt) / Webhook(id, orgId, url, secret, events[])
RateLimit(key, windowStart, count)
```

---

## 7. التقنيات المرجّحة لديهم
- **Frontend/Backend:** Next.js (App Router + Server Components)، React، Tailwind CSS (أسماء كلاسات مثل `bg-surface-3/70 backdrop-blur-xl`)، وضع داكن/فاتح.
- **Auth:** Auth.js (NextAuth) مع Google + Credentials.
- **ORM:** Prisma على الأرجح (معرّفات cuid).
- **DB:** Neon Postgres. **Hosting:** Vercel. **Jobs:** مهام خلفية عبر نقاط داخلية (ربما Vercel Cron + queue في DB) مع polling من الواجهة.
- **AI:** OpenAI (نصوص + صور)، و"نماذج متقدمة" للخطط الأعلى.
- **i18n:** مسارات `/ar` للعامة، اللوحة تتبع لغة الحساب.

---

## 8. خطة بناء نسختنا الخاصة

### 8.1 المكدس المقترح (يتوافق مع خبرتك الحالية في مشروع فصيح)
| الطبقة | الاختيار | السبب |
|---|---|---|
| إطار العمل | **Next.js 16** (App Router) + TypeScript + Tailwind | نفس ما تستخدمه، ونشر سهل على Vercel |
| قاعدة البيانات | **Turso (libSQL)** + Drizzle — أو Neon Postgres إن احتجنا JSONB/بحث متقدم | أنت تستخدم Turso بالفعل؛ Drizzle يدعم الاثنين |
| المصادقة | **Auth.js v5** بمزوّد Google (+ Magic link عبر Resend اختياري بدل كلمات السر) | أقل كود، لا كلمات سر لنحميها |
| الذكاء الاصطناعي | **Gemini** (لديك خبرة) للنصوص + Gemini/Imagen للصور؛ طبقة `ai.ts` واحدة لتبديل المزوّد لاحقاً | تكلفة أقل، عربية جيدة |
| بيانات SEO | **DataForSEO** (pay-as-you-go) | نفس مصدرهم، لا بديل رخيص بنفس التغطية العربية |
| الجلب والتحليل | `fetch` + parser HTML (cheerio) على الخادم، مع حماية SSRF | تحليل الموقع |
| المهام الخلفية | جدول `Job` + **Vercel Cron** / أو **Inngest** أو **QStash** للمهام الطويلة | Vercel functions لها حد زمني |
| البريد | **Resend** | معاملاتي + حملات |
| الدفع | **Dodo Payments** أو **Paddle** أو **Lemon Squeezy** (كلها MoR) | مناسبة لمطوّر في مصر — تتولّى الضرائب وتحويل الأرباح؛ Stripe غير متاح مباشرة لحسابات مصرية |
| التخزين | Vercel Blob أو Cloudflare R2 | صور التصاميم والشعارات |
| مكافحة البوتات | Cloudflare Turnstile | مجاني |
| التحليلات | Vercel Analytics + GA4 | |

### 8.2 Google OAuth (خطوات)
1. Google Cloud Console ← مشروع جديد ← OAuth consent screen (External، الاسم، الشعار، روابط الخصوصية والشروط، النطاقات `openid email profile` فقط).
2. Credentials ← OAuth Client ID (Web) ← Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://<دومينك>/api/auth/callback/google`
3. متغيّرات البيئة: `AUTH_GOOGLE_ID`، `AUTH_GOOGLE_SECRET`، `AUTH_SECRET`، `AUTH_URL`.
4. `auth.ts` بـ Auth.js + Drizzle adapter، و `middleware`/`proxy` يحمي `/dashboard/*`.
5. عند أول تسجيل: إنشاء Organization شخصية + منح رصيد ترحيبي في `TokenLedger` + حدث `sign_up`.
6. نشر التطبيق (Publish) في الـ consent screen قبل الإطلاق (النطاقات الأساسية لا تحتاج مراجعة Google).
7. لاحقاً عند ربط Search Console: نطاق `webmasters.readonly` منفصل (incremental auth) — يحتاج مراجعة Google.

### 8.3 الدفع
- خطط ومنتجات في لوحة مزوّد الدفع (شهري + سنوي) + منتج "شحن توكن".
- `POST /api/billing/checkout` ← رابط Checkout ← المستخدم يدفع عندهم.
- `POST /api/billing/webhook` (تحقق من التوقيع) ← تحديث `Subscription` + منح توكن الدورة في `TokenLedger`.
- بوابة العميل (Customer Portal) للإلغاء وتغيير الخطة وتحميل الفواتير.
- **الحجز قبل التنفيذ:** عند بدء أي Job نخصم التكلفة (أو نحجزها)، وعند الفشل نُرجعها تلقائياً — نفس سلوكهم ويبني الثقة.

### 8.4 المراحل
**المرحلة 0 — الأساس (أسبوع):** Next.js + Auth.js/Google + DB + layout اللوحة RTL/LTR + Organization/Website + مُحدِّد الموقع + نظام التوكن (Ledger) + صفحة الاستخدام.

**المرحلة 1 — MVP قابل للبيع (2–3 أسابيع):**
- إضافة موقع + **تحليل الموقع** (زحف الصفحة الرئيسية + sitemap، استخراج الشعار/الألوان/الخطوط/النبرة، ملخص النشاط والجمهور) ← يملأ Brand Profile تلقائياً.
- Brand IQ + Brand Template قابلة للتعديل.
- مقالات SEO + منشورات سوشيال (لكل شبكة) + نصوص بريد — كلها تأخذ سياق البراند.
- المكتبة + حالات المخرج (draft/review/approved).
- نظام Jobs + polling + ردّ التوكن عند الفشل.
- الدفع (خطتان أو ثلاث فقط في البداية) + صفحات قانونية + Landing page.

**المرحلة 2 — التمايز (3–4 أسابيع):**
- استوديو التصميم (صور بالذكاء الاصطناعي + قوالب HTML/SVG بألوان البراند — أرخص وأثبت من توليد صورة كاملة).
- بحث الكلمات المفتاحية + تحليل المنافسين + التدقيق التقني (DataForSEO + فحص داخلي).
- التقويم + الجدولة + التكرار.
- النشر إلى WordPress (Application Passwords) ثم Shopify/سلة/زد، بتوكنات مشفّرة AES-GCM.
- الوكيل (Agent): شات بـ function-calling يستدعي نفس دوال الأدوات (create_article, create_post, add_task…).

**المرحلة 3 — الأتمتة والفرق (3–4 أسابيع):**
- Pilot: Cron يومي/أسبوعي يختار مهاماً حسب الإعدادات والرصيد وينفّذها.
- بناء المواقع (مولّد HTML واحد + معاينة `iframe sandbox srcdoc` + نشر على subdomain/دومين مخصّص عبر Vercel Domains API).
- الحملات البريدية (قوائم، إرسال عبر Resend، تتبّع فتح/نقر، إلغاء اشتراك إلزامي).
- المؤسسات والأعضاء والصلاحيات، الموافقات، التقارير.

**المرحلة 4 — النمو:** الظهور في محركات الذكاء الاصطناعي (سؤال عدة نماذج عن الفئة وقياس ذكر/استشهاد البراند)، Search Console، Lead Magnets/Discovery، REST API + Webhooks موقّعة، برنامج إحالة، Montu-Lab-style "أفكار يومية".

### 8.5 قرارات وتوصيات
- **ابدأ ضيّقاً:** التحليل + Brand IQ + مقالات + سوشيال + تصاميم + الدفع يكفي للإطلاق. الـ 25 أداة لديهم تراكمت تدريجياً.
- **التوكن من اليوم الأول:** اجعل كل أداة تُعلن تكلفتها، وسجّل التكلفة الفعلية للـ LLM لكل Job لتضبط الهامش.
- **العربية ميزة تنافسية:** دعم سلة وزد واللهجات وأسواق الخليج/مصر.
- **ميّز نفسك فعلاً:** تصميم وتجربة ونصوص أصلية، وربما شريحة أضيق (مثلاً متاجر سلة/زد فقط) بدل نسخة عامة من نفس المنتج.

---

## 9. ما فعلناه داخل حسابك أثناء الفحص (للشفافية)
- أنشأنا مساحة موقع تجريبية باسم "Bun Coffee Demo" (الاسم تكرّر خطأً إلى "Bun Coffee DemoBun Coffee Demo" داخل المنشئ) — بطلبك.
- ولّدنا النسخة الأولى من صفحة هبوط واحدة في Website Builder (معاينة خاصة، **لم تُنشر**) ← استهلكت 26% من الرصيد المجاني.
- لم نُجرِ أي دفع أو نشر أو حذف أو إرسال، ولم نرسل طلبات مباشرة خارج ما ترسله الواجهة.
- لم نشغّل "تحليل الموقع" لأنه يظهر خلف الترقية في الخطة المجانية.
