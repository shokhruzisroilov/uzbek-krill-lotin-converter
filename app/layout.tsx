import type { Metadata } from "next";
import { ToastProvider } from "@/components/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/globals.css";

export const metadata: Metadata = {
  title: "O'zbek Matn O'zgartirgich | Kiril ↔ Lotin",
  description:
    "O'zbek matni Kiril va Lotin scripts o'rtasida onqaytirish. Fayllarni yuklang, haqiqiy vaqtda o'zgartirgich va natijalarni yuklab oling.",
  keywords: ["uzbek", "converter", "cyrillic", "latin", "matn", "o'zgartirish"],
  authors: [{ name: "O'zbek Matn O'zgartirgich" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "O'zbek Matn O'zgartirgich",
    description: "O'zbek matni Kiril va Lotin scripts o'rtasida o'zgartirgich",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <ThemeProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
