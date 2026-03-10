import { useEffect, useCallback, useState } from "react";
import { PrayerTime } from "./usePrayerTimes";

export function useAzanNotifications(prayers: PrayerTime[]) {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("azanNotifications") === "true";
  });
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === "undefined") return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === "granted";
  }, []);

  const toggle = useCallback(async () => {
    if (!enabled) {
      const granted = permission === "granted" || (await requestPermission());
      if (granted) {
        setEnabled(true);
        localStorage.setItem("azanNotifications", "true");
      }
    } else {
      setEnabled(false);
      localStorage.setItem("azanNotifications", "false");
    }
  }, [enabled, permission, requestPermission]);

  // Schedule notifications
  useEffect(() => {
    if (!enabled || permission !== "granted" || prayers.length === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const now = new Date();
    const currentMs = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000;

    prayers.forEach((prayer) => {
      if (prayer.name === "Sunrise") return; // No azan for sunrise
      const prayerMs = prayer.hour * 3600000 + prayer.min * 60000;
      const diff = prayerMs - currentMs;

      if (diff > 0 && diff < 86400000) {
        const timer = setTimeout(() => {
          new Notification(`🕌 ${prayer.name}`, {
            body: `It's time for ${prayer.name} prayer (${prayer.time})`,
            icon: "/favicon.ico",
            tag: `azan-${prayer.name}`,
          });
        }, diff);
        timers.push(timer);
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [enabled, permission, prayers]);

  return { enabled, permission, toggle };
}
