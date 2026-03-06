import { ArrowLeft, Bell, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePrayerTimes, getNextPrayer } from "@/hooks/usePrayerTimes";

const PrayerTimes = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { prayers, loading, locationName } = usePrayerTimes();

  const prayerNameMap: Record<string, string> = {
    Fajr: t("fajr"),
    Sunrise: t("sunrise"),
    Dhuhr: t("dhuhr"),
    Asr: t("asr"),
    Maghrib: t("maghrib"),
    Isha: t("isha"),
  };

  const next = getNextPrayer(prayers);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-4">
            <button onClick={() => navigate("/")} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold flex-1">{t("prayerTimes")}</h1>
            <Bell className="h-5 w-5 opacity-80" />
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
            <MapPin className="h-3 w-3" />
            <span>{loading ? t("loadingLocation") : locationName || t("yourLocation")}</span>
          </div>
          <p className="text-primary-foreground text-2xl font-bold mt-2">
            {new Date().toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        {loading ? (
          <div className="bg-card rounded-2xl border border-border shadow-md p-8 text-center">
            <p className="text-muted-foreground text-sm">{t("loadingLocation")}</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden">
            {prayers.map((prayer, i) => {
              const isActive = prayer.name === next.name;
              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-center justify-between px-5 py-4 border-b border-border last:border-0",
                    isActive && "bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isActive && <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />}
                    <span className={cn("font-medium", isActive ? "text-primary font-semibold" : "text-foreground")}>
                      {prayerNameMap[prayer.name] || prayer.name}
                    </span>
                  </div>
                  <span className={cn("font-semibold tabular-nums", isActive ? "text-primary" : "text-muted-foreground")}>
                    {prayer.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimes;
