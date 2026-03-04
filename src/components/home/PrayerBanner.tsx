import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";

const PRAYER_TIMES = [
  { name: "Fajr", time: "05:12", hour: 5, min: 12 },
  { name: "Sunrise", time: "06:34", hour: 6, min: 34 },
  { name: "Dhuhr", time: "12:15", hour: 12, min: 15 },
  { name: "Asr", time: "15:42", hour: 15, min: 42 },
  { name: "Maghrib", time: "18:28", hour: 18, min: 28 },
  { name: "Isha", time: "19:48", hour: 19, min: 48 },
];

function getNextPrayer() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const prayer of PRAYER_TIMES) {
    const prayerMinutes = prayer.hour * 60 + prayer.min;
    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes;
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      return { name: prayer.name, time: prayer.time, countdown: `${hours}h ${mins}m` };
    }
  }
  return { name: PRAYER_TIMES[0].name, time: PRAYER_TIMES[0].time, countdown: "Tomorrow" };
}

function getHijriDate(): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(new Date());
  } catch {
    return "8 Sha'ban 1447";
  }
}

const PrayerBanner = () => {
  const [next, setNext] = useState(getNextPrayer);
  const hijriDate = getHijriDate();

  useEffect(() => {
    const interval = setInterval(() => setNext(getNextPrayer()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="islamic-gradient islamic-pattern rounded-2xl p-5 text-primary-foreground shadow-lg">
      <div className="flex items-center gap-1.5 text-xs opacity-80 mb-1">
        <MapPin className="h-3 w-3" />
        <span>Your Location</span>
      </div>
      <p className="text-xs opacity-70 font-arabic mb-3">{hijriDate}</p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs opacity-80 uppercase tracking-wider">Next Prayer</p>
          <p className="text-2xl font-bold">{next.name}</p>
          <p className="text-lg font-semibold opacity-90">{next.time}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs opacity-80 mb-1">
            <Clock className="h-3 w-3" />
            <span>Time remaining</span>
          </div>
          <p className="text-xl font-bold animate-pulse-glow">{next.countdown}</p>
        </div>
      </div>
    </div>
  );
};

export default PrayerBanner;
