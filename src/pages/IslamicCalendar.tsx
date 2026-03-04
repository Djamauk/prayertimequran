import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const importantDates = [
  { name: "Ramadan Begins", hijri: "1 Ramadan 1447", gregorian: "Mar 1, 2026", emoji: "🌙" },
  { name: "Laylat al-Qadr", hijri: "27 Ramadan 1447", gregorian: "Mar 27, 2026", emoji: "✨" },
  { name: "Eid al-Fitr", hijri: "1 Shawwal 1447", gregorian: "Mar 31, 2026", emoji: "🎉" },
  { name: "Day of Arafah", hijri: "9 Dhul Hijjah 1447", gregorian: "Jun 6, 2026", emoji: "🕋" },
  { name: "Eid al-Adha", hijri: "10 Dhul Hijjah 1447", gregorian: "Jun 7, 2026", emoji: "🐑" },
  { name: "Islamic New Year", hijri: "1 Muharram 1448", gregorian: "Jun 27, 2026", emoji: "🌟" },
  { name: "Mawlid an-Nabi", hijri: "12 Rabi al-Awwal 1448", gregorian: "Sep 5, 2026", emoji: "💚" },
];

const IslamicCalendar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold flex-1">Islamic Calendar</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Important Dates
        </h2>
        <div className="space-y-2">
          {importantDates.map((date, i) => (
            <motion.div
              key={date.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
            >
              <span className="text-2xl">{date.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{date.name}</p>
                <p className="text-xs text-muted-foreground">{date.hijri}</p>
              </div>
              <p className="text-xs font-medium text-primary">{date.gregorian}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IslamicCalendar;
