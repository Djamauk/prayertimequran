import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHijriDate } from "@/hooks/useHijriDate";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const IslamicCalendar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { todayHijri, calendarDays, firstDayOfWeek, monthName, goNextMonth, goPrevMonth } = useHijriDate();

  const importantDays = calendarDays.filter(d => d.isImportant);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold flex-1">{t("islamicCalendar")}</h1>
          </div>
          <p className="text-primary-foreground/80 text-sm mt-1 font-arabic">{todayHijri.formatted}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={goPrevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h2 className="font-semibold text-foreground">{monthName}</h2>
          <button onClick={goNextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-card rounded-xl border border-border p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {calendarDays.map(day => (
              <div
                key={day.day}
                className={`relative p-1.5 rounded-lg text-center cursor-default transition-colors ${
                  day.isToday ? "bg-primary text-primary-foreground" :
                  day.isImportant ? "bg-accent/20 text-accent-foreground" :
                  "hover:bg-muted"
                }`}
              >
                <p className="text-sm font-medium">{day.day}</p>
                <p className="text-[10px] text-muted-foreground leading-none">{day.hijriDay}</p>
                {day.isImportant && (
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important dates this month */}
        {importantDays.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("importantDates")}</h3>
            <div className="space-y-2">
              {importantDays.map(day => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{day.importantLabel}</p>
                    <p className="text-xs text-muted-foreground">{day.hijriDay} {day.hijriMonth} {day.hijriYear} AH</p>
                  </div>
                  <p className="text-xs font-medium text-primary">
                    {day.gregorian.toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IslamicCalendar;
