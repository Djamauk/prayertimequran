import { ArrowLeft, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useQibla } from "@/hooks/useQibla";

const Qibla = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { qiblaBearing, distance, compassDir, loading, compassHeading } = useQibla();

  const needleRotation = qiblaBearing != null ? qiblaBearing - compassHeading : 0;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-white">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("qiblaCompass")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center mt-12">
        {loading ? (
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-2 rounded-full border-2 border-border" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-primary">N</div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">S</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">W</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">E</div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: needleRotation }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Navigation className="h-16 w-16 text-primary fill-primary/20" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-primary shadow-lg" /></div>
            </motion.div>
            <div className="mt-8 text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">{t("qiblaDirection")}</p>
              <p className="text-3xl font-bold text-primary">{qiblaBearing != null ? `${Math.round(qiblaBearing)}° ${compassDir}` : "—"}</p>
              <p className="text-sm text-muted-foreground">{t("distanceToKaaba")}: {distance != null ? `~${distance.toLocaleString()} km` : "—"}</p>
              <p className="text-xs text-muted-foreground mt-4">{t("enableLocationQibla")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Qibla;
