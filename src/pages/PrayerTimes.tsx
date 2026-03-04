import { ArrowLeft, Bell, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const prayers = [
  { name: "Fajr", time: "05:12 AM", active: false },
  { name: "Sunrise", time: "06:34 AM", active: false },
  { name: "Dhuhr", time: "12:15 PM", active: true },
  { name: "Asr", time: "03:42 PM", active: false },
  { name: "Maghrib", time: "06:28 PM", active: false },
  { name: "Isha", time: "07:48 PM", active: false },
];

const PrayerTimes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-4">
            <button onClick={() => navigate("/")} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold flex-1">Prayer Times</h1>
            <Bell className="h-5 w-5 opacity-80" />
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
            <MapPin className="h-3 w-3" />
            <span>Your Location</span>
          </div>
          <p className="text-primary-foreground text-2xl font-bold mt-2">
            {new Date().toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden">
          {prayers.map((prayer, i) => (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-center justify-between px-5 py-4 border-b border-border last:border-0",
                prayer.active && "bg-primary/5"
              )}
            >
              <div className="flex items-center gap-3">
                {prayer.active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />}
                <span className={cn(
                  "font-medium",
                  prayer.active ? "text-primary font-semibold" : "text-foreground"
                )}>
                  {prayer.name}
                </span>
              </div>
              <span className={cn(
                "font-semibold tabular-nums",
                prayer.active ? "text-primary" : "text-muted-foreground"
              )}>
                {prayer.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
