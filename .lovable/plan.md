## Islamic All-in-One App

A beautiful, multilingual Islamic companion app with a teal/green theme inspired by the top-rated apps on Google Play.

### Supported Languages

English, Arabic, Somali, French, Swahili, Afar, Oromo, Amharic — with a language switcher accessible from settings.

### Design

- Teal/green gradient theme with Islamic geometric patterns and subtle crescent/star motifs
- Card-based home screen with icons for each feature (like the screenshots)
- Smooth animations, rounded cards, and elegant Arabic typography
- Mobile-first responsive design

### Pages & Features

**1. Home Dashboard**

- Grid of feature cards with icons: Prayer Times, Quran, Qibla, Dhikr, Duas, 99 Names, Calendar
- Current prayer time banner at the top with countdown to next prayer
- Hijri date display

**2. Prayer Times**

- Location-based daily schedule (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- Countdown timer to next prayer
- Azan notification settings with multiple muezzin voice options
- Monthly prayer timetable view

**3. Quran Reader + Audio**

- Full Quran text in Arabic with surah/juz navigation
- Side-by-side translations (all 8 languages)
- Audio recitation with multiple reciters, including Abdur Rashid Sufi (play/pause per ayah or continuous)
- Bookmarks, search, and last-read position tracking
- Beautiful Arabic calligraphy rendering

**4. Qibla Compass**

- Compass pointing toward Mecca based on device location
- Distance to Kaaba display
- AR camera mode overlay showing Qibla direction on the live camera view

**5. Dhikr Counter (Tasbih)**

- Digital bead counter with tap-to-count
- Preset dhikr texts (SubhanAllah, Alhamdulillah, Allahu Akbar, etc.)
- Progress tracking (e.g., 2/33, Total: 77)
- Reset and history

**6. Hisnul Muslim (Duas)**

- Categorised duas: Morning & Evening, Home & Family, Travel, Food & Drink, Prayer, Hajj & Umrah, Nature, Good Etiquette, Sickness & Death, etc.
- Arabic text + transliteration + translation in selected language
- Audio playback for each dua

**7. 99 Names of Allah**

- Scrollable list of all 99 names in Arabic calligraphy
- Transliteration, meaning, and benefit/description for each name
- Audio pronunciation

**8. Islamic Calendar**

- Hijri calendar with important dates highlighted (Ramadan, Eid, etc.)
- Gregorian ↔ Hijri date converter

**9. Settings**

- Language selector (8 languages)
- Prayer calculation method (Hanafi, Shafi, etc.)
- Azan sound selection
- Dark/light theme toggle
- Location settings (auto-detect or manual)

### Backend Needs

- Supabase for storing Quran data, duas, prayer calculation, and user preferences
- Edge functions for prayer time calculation API and location services
- Audio file hosting for Quran recitation, azan sounds, and dua audio