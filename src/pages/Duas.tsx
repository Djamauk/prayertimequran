import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { duaCategories } from "@/data/duas";

const Duas = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("hisnulMuslim")}</h1>
          </div>
          <p className="text-primary-foreground/80 text-xs mt-1">{t("dailyDuas")}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-2">
        {duaCategories.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => navigate(`/duas/${cat.key}`)}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="text-2xl">{cat.emoji}</span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{t(cat.key as any)}</p>
              <p className="text-xs text-muted-foreground">{cat.duas.length} {t("duas").toLowerCase()}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Duas;
