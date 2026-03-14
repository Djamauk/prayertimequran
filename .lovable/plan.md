

# Azan Audio & Notifications Enhancement

## Current State
- Browser notifications are implemented (`useAzanNotifications.ts`) with scheduled `setTimeout` timers
- Toggle exists in Settings page
- No audio playback — notifications are silent text-only
- No muezzin voice selection

## Plan

### 1. Add Azan Audio Playback
- Enhance `useAzanNotifications.ts` to play an azan audio clip when each prayer time fires
- Use free, publicly hosted azan audio files (e.g., from Islamic audio CDNs or bundled MP3s in `/public/audio/`)
- Provide 3 muezzin options stored in localStorage:
  - **Makkah** (Abdul Rahman Al-Sudais style)
  - **Madinah** (classic Madinah style)  
  - **Simple** (short azan)
- Use the Web Audio API / `HTMLAudioElement` to play the selected azan sound alongside the browser notification

### 2. Add Muezzin Voice Selector in Settings
- Add a new expandable setting row in `SettingsPage.tsx` under the Prayer section (similar to language picker)
- Icon: `Volume2` from lucide-react
- Shows current muezzin name, expands to show 3 options
- Add translation keys: `azanSound`, `muezzinMakkah`, `muezzinMadinah`, `muezzinSimple`

### 3. Add "Test Azan" Button
- Small play button next to the muezzin selector to preview the selected azan sound
- Helps users confirm audio works before waiting for prayer time

### 4. Enhance Notification with Sound
- When notification fires at prayer time, simultaneously trigger `new Audio(selectedAzanUrl).play()`
- Handle audio autoplay restrictions gracefully (user interaction required — the toggle in settings counts)

### 5. Translation Updates
- Add new keys (`azanSound`, `muezzinMakkah`, `muezzinMadinah`, `muezzinSimple`, `testAzan`) to all 8 language files

### Files to Modify
- `src/hooks/useAzanNotifications.ts` — add audio playback logic and muezzin selection
- `src/pages/SettingsPage.tsx` — add muezzin voice picker + test button
- `src/i18n/translations/en.ts` + 7 other language files — new keys

### Audio Sources
Will use freely available azan MP3 URLs from public Islamic audio APIs (e.g., `azan.mp3` hosted on CDN) to avoid bundling large files.

