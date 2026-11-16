// Suspense boundary for every dashboard page: they all read the session at request time.
export default function Loading() {
  return <p className="text-muted">جارٍ التحميل…</p>;
}
