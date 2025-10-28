"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

type Lang = "en" | "id";

interface LangContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => any; 
}

const translations: Record<Lang, Record<string, any>> = { en, id }; 

function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
}

const LanguageContext = createContext<LangContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>("id");

  // Sync language with URL
  useEffect(() => {
    const pathLang = pathname.split('/')[1] as Lang;
    if (pathLang === "en" || pathLang === "id") {
      setLang(pathLang);
    }
  }, [pathname]);

  const t = (key: string): any => {
    const value = getNestedValue(translations[lang], key);
    return value ?? key; // fallback 
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
};
