import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import en from "./translations/en";
import ar from "./translations/ar";
import so from "./translations/so";
import fr from "./translations/fr";
import sw from "./translations/sw";
import aa from "./translations/aa";
import om from "./translations/om";
import am from "./translations/am";

export type LanguageCode = "en" | "ar" | "so" | "fr" | "sw" | "aa" | "om" | "am";

export const LANGUAGES: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "so", name: "Somali", nativeName: "Soomaali" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
  { code: "aa", name: "Afar", nativeName: "Qafar" },
  { code: "om", name: "Oromo", nativeName: "Afaan Oromoo" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
];

const translations: Record<LanguageCode, typeof en> = { en, ar, so, fr, sw, aa, om, am };

type TranslationKey = keyof typeof en;

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("app-lang") as LanguageCode;
    return saved && translations[saved] ? saved : "en";
  });

  const setLang = useCallback((newLang: LanguageCode) => {
    setLangState(newLang);
    localStorage.setItem("app-lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    [lang]
  );

  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
