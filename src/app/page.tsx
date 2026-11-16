import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { APP_NAME } from "@/lib/config";

export default async function Home() {
  if ((await auth())?.user) redirect("/dashboard");
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm font-semibold text-brand">{APP_NAME}</p>
      <h1 className="text-4xl font-bold leading-snug">تسويق موقعك من مكان واحد</h1>
      <p className="text-muted">
        أضف موقعك، وابنِ ملف علامتك التجارية، ثم أنشئ المقالات والمنشورات والتصاميم بنفس الهوية.
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button className="rounded-xl bg-brand px-6 py-3 font-semibold text-brand-ink hover:opacity-90">
          المتابعة باستخدام Google
        </button>
      </form>
    </main>
  );
}
