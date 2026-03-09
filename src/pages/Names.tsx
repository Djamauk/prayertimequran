import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { namesOfAllah } from "@/data/namesOfAllah";

const Names = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return namesOfAllah;
    const q = search.toLowerCase();
    return namesOfAllah.filter(n =>
      n.transliteration.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q) ||
      n.arabic.includes(search)
    );
  }, [search]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("namesOfAllah")}</h1>
            <Search className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-primary-foreground font-arabic text-center text-xl mt-2">أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ</p>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search names..."
            className="w-full mt-3 px-4 py-2 rounded-xl bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none"
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 grid grid-cols-2 gap-3">
        {filtered.map((name, i) => (
          <motion.div
            key={name.number}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            className="p-4 bg-card rounded-xl border border-border text-center space-y-1 hover:shadow-md transition-shadow"
          >
            <span className="text-xs text-muted-foreground">#{name.number}</span>
            <p className="text-2xl font-arabic text-primary">{name.arabic}</p>
            <p className="text-xs font-semibold text-foreground">{name.transliteration}</p>
            <p className="text-xs text-muted-foreground">{name.meaning}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Names;
