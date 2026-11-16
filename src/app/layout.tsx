import type { Metadata } from "next";
import { Suspense } from "react";
import { Cairo } from "next/font/google";
import { APP_NAME } from "@/lib/config";
import "./globals.css";

const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: "مساحة عمل تسويقية بالذكاء الاصطناعي",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        {/* Every page is per-user, so the whole tree streams. */}
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
