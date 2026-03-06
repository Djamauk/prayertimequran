## Current State Assessment

The app has a solid UI foundation with all pages created, but everything uses **hardcoded static data** and is **English-only**. Here's what's missing vs. the plan:

### What's Built (UI shells only)

- Home dashboard with prayer banner and feature grid
- Prayer Times page (static times)
- Quran page (16 of 114 surahs listed, no reader/audio)
- Qibla compass (static 45° direction)
- Dhikr counter (functional tap counter)
- Duas page (category list only, no actual duas)
- 99 Names page (12 of 99 names, no audio)
- Islamic Calendar (list of dates, no real calendar)
- Settings page (non-functional)

### What Needs to Be Built

Given the scope, I recommend building incrementally in this order:

**Phase 1 — Core Data & Multilingual Foundation**

- Create an i18n system (context + JSON translation files) for all 8 languages
- Wire up the Settings language selector to actually switch languages
- Add a dark mode toggle that works

**Phase 2 — Prayer Times (Real)**

- Integrate the free Aladhan API (`api.aladhan.com`) for location-based prayer times
- Use browser geolocation for auto-detection
- Update PrayerBanner with live countdown

**Phase 3 — Full Quran Reader**

- Integrate Al-Quran Cloud API (`api.alquran.cloud`) for all 114 surahs with Arabic text: use Supabase.
- Add surah detail page with ayah-by-ayah view
- Add audio recitation (Abdur Rashid Sufi + others via the same API)
- Bookmarks using localStorage

**Phase 4 — Complete Remaining Features**

- Qibla: Use geolocation to calculate the real bearing to the Kaaba
- 99 Names: Add all 99 names with meanings
- Duas: Add actual dua content (Arabic + transliteration + translation) per category
- Calendar: Add a proper Hijri calendar grid with a date converter

**Phase 5 — Polish**

- AR Qibla camera overlay (using device camera + compass)
- Azan notification scheduling
- Search across the Quran and duas

### Recommendation

I suggest starting with **Phase 1 (multilingual + settings)** and **Phase 2 (real prayer times)** together since they're foundational. Shall I proceed with these two phases first?