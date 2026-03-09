import { useState, useEffect, useCallback } from "react";

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah"
];

interface HijriDate {
  day: number;
  month: number;
  monthName: string;
  year: number;
  formatted: string;
}

interface CalendarDay {
  day: number;
  hijriDay: number;
  hijriMonth: string;
  hijriYear: number;
  isToday: boolean;
  isImportant: boolean;
  importantLabel?: string;
  gregorian: Date;
}

// Approximate Gregorian to Hijri conversion
function gregorianToHijri(date: Date): HijriDate {
  const gd = date.getDate();
  const gm = date.getMonth() + 1;
  const gy = date.getFullYear();

  let jd = Math.floor((11 * gy + 3) / 30) + 354 * gy + 30 * gm
    - Math.floor((gm - 1) / 2) + gd - 385;

  // Julian Day Number
  const a = Math.floor((14 - gm) / 12);
  const y = gy + 4800 - a;
  const m = gm + 12 * a - 3;
  jd = gd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
    - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // JD to Hijri
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719)
    + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50)
    - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hm = Math.floor((24 * l3) / 709);
  const hd = l3 - Math.floor((709 * hm) / 24);
  const hy = 30 * n + j - 30;

  return {
    day: hd,
    month: hm,
    monthName: HIJRI_MONTHS[hm - 1] || "",
    year: hy,
    formatted: `${hd} ${HIJRI_MONTHS[hm - 1] || ""} ${hy} AH`,
  };
}

// Important Islamic dates (Hijri month, day) for highlighting
const IMPORTANT_DATES: Record<string, string> = {
  "1-1": "Islamic New Year",
  "1-10": "Day of Ashura",
  "3-12": "Mawlid an-Nabi",
  "7-27": "Isra & Mi'raj",
  "8-15": "Shab-e-Barat",
  "9-1": "Ramadan Begins",
  "9-27": "Laylat al-Qadr",
  "10-1": "Eid al-Fitr",
  "12-9": "Day of Arafah",
  "12-10": "Eid al-Adha",
};

export function useHijriDate() {
  const [today] = useState(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  const todayHijri = gregorianToHijri(today);

  const getCalendarDays = useCallback((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentYear, currentMonth, d);
      const hijri = gregorianToHijri(date);
      const key = `${hijri.month}-${hijri.day}`;
      const isImportant = key in IMPORTANT_DATES;

      days.push({
        day: d,
        hijriDay: hijri.day,
        hijriMonth: hijri.monthName,
        hijriYear: hijri.year,
        isToday: date.toDateString() === today.toDateString(),
        isImportant,
        importantLabel: isImportant ? IMPORTANT_DATES[key] : undefined,
        gregorian: date,
      });
    }
    return days;
  }, [currentMonth, currentYear, today]);

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en", { month: "long", year: "numeric" });

  const goNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const goPrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  return {
    todayHijri,
    calendarDays: getCalendarDays(),
    firstDayOfWeek,
    monthName,
    goNextMonth,
    goPrevMonth,
    gregorianToHijri,
    HIJRI_MONTHS,
  };
}
