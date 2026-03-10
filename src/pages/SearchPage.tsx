import { ArrowLeft, Search, BookOpen, BookHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { allSurahs } from "@/data/surahs";
import { duaCategories } from "@/data/duas";

type ResultType = "surah" | "dua";

interface SearchResult {
  type: ResultType;
  title: string;
  subtitle: string;
  path: string;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const out: SearchResult[] = [];

    // Search surahs
    allSurahs.forEach((s) => {
      if (
        s.name.toLowerCase().includes(q) ||
        s.arabic.includes(query) ||
        s.number.toString() === q
      ) {
        out.push({
          type: "surah",
          title: `${s.number}. ${s.name}`,
          subtitle: `${s.arabic} • ${s.verses} ${t("verses")}`,
          path: `/quran/${s.number}`,
        });
      }
    });

    // Search duas
    duaCategories.forEach((cat) => {
      const catName = t(cat.key as any);
      if (catName.toLowerCase().includes(q)) {
        out.push({
          type: "dua",
          title: catName,
          subtitle: `${cat.duas.length} duas`,
          path: `/duas/${cat.key}`,
        });
      }
      cat.duas.forEach((dua) => {
        if (
          dua.translation.toLowerCase().includes(q) ||
          dua.transliteration.toLowerCase().includes(q) ||
          dua.arabic.includes(query)
        ) {
          out.push({
            type: "dua",
            title: dua.transliteration.slice(0, 50) + "...",
            subtitle: dua.translation.slice(0, 60) + "...",
            path: `/duas/${cat.key}`,
          });
        }
      });
    });

    return out.slice(0, 30);
  }, [query, t]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-6 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-3">
            <button onClick={() => navigate(-1)} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold">{t("search")}</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        {query.length > 0 && query.length < 2 && (
          <p className="text-center text-sm text-muted-foreground py-10">
            Type at least 2 characters...
          </p>
        )}

        {query.length >= 2 && results.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-10">
            No results found
          </p>
        )}

        <AnimatePresence mode="popLayout">
          <div className="space-y-2">
            {results.map((r, i) => (
              <motion.div
                key={`${r.path}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                onClick={() => navigate(r.path)}
                className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  {r.type === "surah" ? (
                    <BookOpen className="h-4 w-4 text-primary" />
                  ) : (
                    <BookHeart className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {r.type === "surah" ? t("quran") : t("duas")}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;
