import { ArrowLeft, Search, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { allSurahs } from "@/data/surahs";

const Quran = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return allSurahs;
    const q = search.toLowerCase();
    return allSurahs.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.arabic.includes(search) ||
      s.number.toString() === q
    );
  }, [search]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-4">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("alQuran")}</h1>
            <button onClick={() => setShowSearch(!showSearch)}><Search className="h-5 w-5 opacity-80" /></button>
          </div>
          {showSearch && (
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search surah..."
              className="w-full px-4 py-2 rounded-xl bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none"
              autoFocus
            />
          )}
          {!showSearch && (
            <p className="text-primary-foreground/80 font-arabic text-center text-xl">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-2">
        {filtered.map((surah, i) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            onClick={() => navigate(`/quran/${surah.number}`)}
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg islamic-gradient flex items-center justify-center text-primary-foreground text-sm font-bold">{surah.number}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{surah.name}</p>
              <p className="text-xs text-muted-foreground">{surah.type === "Meccan" ? t("meccan") : t("medinan")} • {surah.verses} {t("verses")}</p>
            </div>
            <p className="text-xl font-arabic text-primary">{surah.arabic}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Quran;
