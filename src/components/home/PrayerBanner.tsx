import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePrayerTimes, getNextPrayer } from "@/hooks/usePrayerTimes";

function getHijriDate(): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(new Date());
  } catch {
    return "";
  }
}

const PrayerBanner = () => {
  const { t, lang } = useLanguage();
  const { prayers, loading, locationName } = usePrayerTimes();
  const [next, setNext] = useState({ name: "", time: "--:--", countdown: "--" });
  const hijriDate = getHijriDate();

  useEffect(() => {
    if (prayers.length === 0) return;
    setNext(getNextPrayer(prayers));
    const interval = setInterval(() => setNext(getNextPrayer(prayers)), 30000);
    return () => clearInterval(interval);
  }, [prayers]);

  const prayerNameMap: Record<string, string> = {
    Fajr: t("fajr"),
    Sunrise: t("sunrise"),
    Dhuhr: t("dhuhr"),
    Asr: t("asr"),
    Maghrib: t("maghrib"),
    Isha: t("isha"),
  };

  return (
    <div className="islamic-gradient islamic-pattern bg-primary rounded-2xl p-4 sm:p-5 text-primary-foreground shadow-lg">
      {/* Location & Hijri date row — compact on small screens */}
      <div className="flex items-center justify-between gap-2 mb-1 sm:mb-1.5">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-foreground truncate">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{loading ? t("loadingLocation") : locationName || t("yourLocation")}</span>
        </div>
        <p className={`text-xs sm:text-sm text-primary-foreground whitespace-nowrap ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
          {hijriDate}
        </p>
      </div>

      {/* Next prayer + countdown */}
      <div className="flex items-end justify-between mt-2 sm:mt-3">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-0.5">
            {t("nextPrayer")}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-primary-foreground leading-tight truncate">
            {prayerNameMap[next.name] || next.name}
          </p>
          <p className="text-base sm:text-lg font-semibold text-primary-foreground">{next.time}</p>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center justify-end gap-1 text-[10px] sm:text-xs font-semibold text-primary-foreground mb-0.5 sm:mb-1">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>{t("timeRemaining")}</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-primary-foreground">
            {next.countdown === "Tomorrow" ? t("tomorrow") : next.countdown}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerBanner;

