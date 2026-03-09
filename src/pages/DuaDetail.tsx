import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { duaCategories } from "@/data/duas";

const DuaDetail = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cat = duaCategories.find(c => c.key === category);
  if (!cat) return <div className="p-8 text-center text-muted-foreground">Category not found</div>;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/duas")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <span className="text-2xl">{cat.emoji}</span>
            <h1 className="text-lg font-bold flex-1">{t(cat.key as any)}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-4">
        {cat.duas.map((dua, i) => (
          <motion.div
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 bg-card rounded-xl border border-border space-y-4"
          >
            <p className="text-right font-arabic text-xl leading-loose text-foreground">{dua.arabic}</p>
            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-sm text-muted-foreground italic">{dua.transliteration}</p>
              <p className="text-sm text-foreground">{dua.translation}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DuaDetail;
