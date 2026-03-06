import { useState, useEffect } from "react";

export interface PrayerTime {
  name: string;
  time: string;
  hour: number;
  min: number;
}

interface PrayerTimesState {
  prayers: PrayerTime[];
  loading: boolean;
  error: string | null;
  locationName: string;
}

const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

function parseTime(timeStr: string): { hour: number; min: number } {
  const [h, m] = timeStr.split(":").map(Number);
  return { hour: h, min: m };
}

export const usePrayerTimes = () => {
  const [state, setState] = useState<PrayerTimesState>({
    prayers: [],
    loading: true,
    error: null,
    locationName: "",
  });

  useEffect(() => {
    let cancelled = false;

    const fetchTimes = async (lat: number, lon: number) => {
      try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();

        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lon}&method=3`
        );
        const data = await res.json();

        if (cancelled) return;

        const timings = data.data.timings;
        const meta = data.data.meta;

        const prayers: PrayerTime[] = PRAYER_KEYS.map((key) => {
          const { hour, min } = parseTime(timings[key]);
          const h12 = hour % 12 || 12;
          const ampm = hour < 12 ? "AM" : "PM";
          return {
            name: key,
            time: `${String(h12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${ampm}`,
            hour,
            min,
          };
        });

        setState({
          prayers,
          loading: false,
          error: null,
          locationName: meta.timezone || "Your Location",
        });
      } catch {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: "Failed to fetch prayer times" }));
        }
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchTimes(pos.coords.latitude, pos.coords.longitude),
        () => {
          // Fallback: Mecca coordinates
          fetchTimes(21.4225, 39.8262);
        },
        { timeout: 10000 }
      );
    } else {
      fetchTimes(21.4225, 39.8262);
    }

    return () => { cancelled = true; };
  }, []);

  return state;
};

export function getNextPrayer(prayers: PrayerTime[]) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const prayer of prayers) {
    const prayerMinutes = prayer.hour * 60 + prayer.min;
    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes;
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      return { name: prayer.name, time: prayer.time, countdown: `${hours}h ${mins}m` };
    }
  }

  if (prayers.length > 0) {
    return { name: prayers[0].name, time: prayers[0].time, countdown: "Tomorrow" };
  }
  return { name: "Fajr", time: "--:--", countdown: "--" };
}
