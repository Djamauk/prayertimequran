

## Add Quran Verse Translations

**Current state**: SurahDetail only fetches Arabic recitation (`ar.alafasy` etc.) — no translation text is displayed.

**Goal**: Show a translation below each Arabic ayah, matching the user's selected app language.

### Approach

Use the Al-Quran Cloud API's translation editions. Fetch two resources in parallel per surah:
1. Arabic audio edition (existing) — for text + audio
2. Translation edition — for the user's language

**API translation edition mapping** (language code → API edition identifier):
- `en` → `en.asad`
- `ar` → (no translation needed, Arabic is the source)
- `fr` → `fr.hamidullah`
- `so` → `so.abdulwali` (if available, fallback to `en.asad`)
- `sw` → fallback to `en.asad`
- `am` → fallback to `en.asad`
- `aa` → fallback to `en.asad`
- `om` → fallback to `en.asad`

### Changes

**`src/pages/SurahDetail.tsx`**:
- Add `translationText` state (array of strings, one per ayah)
- Add a `TRANSLATION_EDITIONS` map from `LanguageCode` → API edition string
- Fetch translation in parallel with Arabic: `GET /v1/surah/{num}/{translationEdition}`
- Display translation text below the Arabic text in each ayah card (smaller font, muted color)
- When `lang === "ar"`, skip the translation fetch entirely
- Re-fetch when language changes (add `lang` to the dependency array)

**UI per ayah card**:
```
┌─────────────────────────────┐
│ [1]              ▶ 🔖      │
│                             │
│   بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ   │  ← Arabic (existing)
│                             │
│   In the name of God, the   │  ← Translation (new)
│   Most Gracious...          │
└─────────────────────────────┘
```

Single file change, no new dependencies needed. The Al-Quran Cloud API supports these editions for free.

