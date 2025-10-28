"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/contexts/langContext";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useLang();

  const switchLanguage = (newLang: "id" | "en") => {
    // Extract current path without language prefix
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Navigate to new language route
    const newPath = `/${newLang}${pathWithoutLang}`;
    router.push(newPath);
  };

  return (
    <div className="flex gap-2 items-center text-sm">
      <button
        onClick={() => switchLanguage("id")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "id" 
            ? "bg-[var(--color-foreground)] text-[var(--color-background)]" 
            : "bg-transparent"
        }`}
      >
        ID
      </button>
      <button
        onClick={() => switchLanguage("en")}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "en" 
            ? "bg-[var(--color-foreground)] text-[var(--color-background)]" 
            : "bg-transparent"
        }`}
      >
        EN
      </button>
    </div>
  );
}
