import { useNavigate } from "react-router-dom";
import PrayerBanner from "@/components/home/PrayerBanner";
import FeatureGrid from "@/components/home/FeatureGrid";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{t("bismillah")}</h1>
            <p className="text-sm text-muted-foreground">{t("greeting")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/search")}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="w-10 h-10 rounded-full islamic-gradient flex items-center justify-center text-primary-foreground text-lg font-arabic">☪</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PrayerBanner />
        </motion.div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t("features")}</h2>
          <FeatureGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
