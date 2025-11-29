// файл: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ ВИПРАВЛЕНО: Імпортуємо GlobalHeader замість Navbar
import GlobalHeader from "@/components/GlobalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobFlow UA - Конструктор кар'єри",
  description: "Створіть ідеальне резюме та супровідний лист за допомогою AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.className} bg-[#0f172a] text-white min-h-screen`}>
        
        {/* ✅ ВИПРАВЛЕНО: Використовуємо GlobalHeader */}
        <GlobalHeader />

        <main className="pt-16">
          {children}
        </main>

      </body>
    </html>
  );
}