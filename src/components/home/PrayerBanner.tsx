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
    <div className="islamic-gradient islamic-pattern bg-primary rounded-2xl p-5 text-primary-foreground shadow-lg">
      <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-foreground mb-1.5">
        <MapPin className="h-4 w-4" />
        <span>{loading ? t("loadingLocation") : locationName || t("yourLocation")}</span>
      </div>

      <p className={`text-sm mb-3 text-primary-foreground ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
        {hijriDate}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-0.5">
            {t("nextPrayer")}
          </p>
          <p className="text-2xl font-bold text-primary-foreground leading-tight">
            {prayerNameMap[next.name] || next.name}
          </p>
          <p className="text-lg font-semibold text-primary-foreground">{next.time}</p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs font-semibold text-primary-foreground mb-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{t("timeRemaining")}</span>
          </div>
          <p className="text-xl font-bold text-primary-foreground">
            {next.countdown === "Tomorrow" ? t("tomorrow") : next.countdown}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerBanner;

