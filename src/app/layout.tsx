import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { LanguageProvider } from "@/contexts/langContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "ARARA ART - Unforgettable Designs",
  description: "Ethnic Accesories for Every Occasion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-cormorant)] antialiased">
        <ThemeProvider>
          <LanguageProvider>
          {children}
          <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}