import { useEffect, useCallback, useState, useRef } from "react";
import { PrayerTime } from "./usePrayerTimes";

export type MuezzinVoice = "makkah" | "madinah" | "simple";

const AZAN_URLS: Record<MuezzinVoice, string> = {
  makkah: "https://cdn.aladhan.com/audio/adhaan/1.mp3",
  madinah: "https://cdn.aladhan.com/audio/adhaan/2.mp3",
  simple: "https://cdn.aladhan.com/audio/adhaan/3.mp3",
};

export function useAzanNotifications(prayers: PrayerTime[]) {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("azanNotifications") === "true";
  });
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );
  const [muezzin, setMuezzinState] = useState<MuezzinVoice>(() => {
    return (localStorage.getItem("azanMuezzin") as MuezzinVoice) || "makkah";
  });
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem("azanVolume");
    return saved ? parseFloat(saved) : 0.8;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [enabled, permission, requestPermission]);

  const setMuezzin = useCallback((voice: MuezzinVoice) => {
    setMuezzinState(voice);
    localStorage.setItem("azanMuezzin", voice);
  }, []);

  const playAzan = useCallback((voice?: MuezzinVoice) => {
    const v = voice || muezzin;
    // Stop previous
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(AZAN_URLS[v]);
    audioRef.current = audio;
    audio.play().catch(() => {
      // Autoplay blocked — user interaction required
    });
  }, [muezzin]);

  const stopAzan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Schedule notifications + audio
  useEffect(() => {
    if (!enabled || permission !== "granted" || prayers.length === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const now = new Date();
    const currentMs = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000;

    prayers.forEach((prayer) => {
      if (prayer.name === "Sunrise") return;
      const prayerMs = prayer.hour * 3600000 + prayer.min * 60000;
      const diff = prayerMs - currentMs;

      if (diff > 0 && diff < 86400000) {
        const timer = setTimeout(() => {
          new Notification(`🕌 ${prayer.name}`, {
            body: `It's time for ${prayer.name} prayer (${prayer.time})`,
            icon: "/favicon.ico",
            tag: `azan-${prayer.name}`,
          });
          playAzan();
        }, diff);
        timers.push(timer);
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [enabled, permission, prayers, playAzan]);

  return { enabled, permission, toggle, muezzin, setMuezzin, playAzan, stopAzan };
}
