import type { Metadata } from "next";
import { ToastProvider } from "@/components/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/globals.css";

export const metadata: Metadata = {
  title: "Kiril lotin konvertor",
  description:
    "O‘zbek matni va fayllarni Kiril ↔ Lotin yozuvlari o‘rtasida tez va oson konvertatsiya qiling. Matn kiriting yoki fayl yuklang va natijani darhol oling.",
  keywords: [
    "kiril lotin konvertor",
    "o‘zbek konvertor",
    "kiril",
    "lotin",
    "matn",
    "fayl",
    "docx",
    "txt",
    "transliteratsiya",
  ],
  authors: [{ name: "Kiril Lotin Konvertor" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Kiril Lotin Konvertor",
    description:
      "O‘zbek matni va fayllarni Kiril va Lotin yozuvlari o‘rtasida oson va tez konvertatsiya qiling.",
    type: "website",
    locale: "uz_UZ",
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
