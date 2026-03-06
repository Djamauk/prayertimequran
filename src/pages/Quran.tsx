import { ArrowLeft, Search, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const surahs = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, type: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan" },
  { number: 3, name: "Aal-E-Imran", arabic: "آل عمران", verses: 200, type: "Medinan" },
  { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan" },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medinan" },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, type: "Meccan" },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, type: "Meccan" },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, type: "Medinan" },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, type: "Medinan" },
  { number: 10, name: "Yunus", arabic: "يونس", verses: 109, type: "Meccan" },
  { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83, type: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, type: "Medinan" },
  { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30, type: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan" },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan" },
  { number: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan" },
];

const Quran = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-4">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("alQuran")}</h1>
            <Search className="h-5 w-5 opacity-80" />
            <Bookmark className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-primary-foreground/80 text-sm font-arabic text-center text-xl">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-2">
        {surahs.map((surah, i) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
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
