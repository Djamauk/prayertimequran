import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const names = [
  { number: 1, arabic: "ٱلرَّحْمَٰنُ", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { number: 2, arabic: "ٱلرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful" },
  { number: 3, arabic: "ٱلْمَلِكُ", transliteration: "Al-Malik", meaning: "The King" },
  { number: 4, arabic: "ٱلْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Sacred" },
  { number: 5, arabic: "ٱلسَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { number: 6, arabic: "ٱلْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Guardian of Faith" },
  { number: 7, arabic: "ٱلْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Protector" },
  { number: 8, arabic: "ٱلْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { number: 9, arabic: "ٱلْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { number: 10, arabic: "ٱلْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { number: 11, arabic: "ٱلْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { number: 12, arabic: "ٱلْبَارِئُ", transliteration: "Al-Bari", meaning: "The Originator" },
];

const Names = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("namesOfAllah")}</h1>
          </div>
          <p className="text-primary-foreground font-arabic text-center text-xl mt-2">أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 grid grid-cols-2 gap-3">
        {names.map((name, i) => (
          <motion.div
            key={name.number}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 bg-card rounded-xl border border-border text-center space-y-1 hover:shadow-md transition-shadow cursor-pointer"
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
