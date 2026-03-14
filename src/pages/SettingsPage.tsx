import { ArrowLeft, Globe, Moon, Sun, MapPin, Bell, Calculator, ChevronRight, Volume2, Play, Square, Volume1 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useLanguage, LANGUAGES } from "@/i18n/LanguageContext";
import { useTheme } from "@/hooks/useTheme";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAzanNotifications, type MuezzinVoice } from "@/hooks/useAzanNotifications";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const MUEZZIN_OPTIONS: { value: MuezzinVoice; labelKey: string }[] = [
  { value: "makkah", labelKey: "muezzinMakkah" },
  { value: "madinah", labelKey: "muezzinMadinah" },
  { value: "simple", labelKey: "muezzinSimple" },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { prayers } = usePrayerTimes();
  const azan = useAzanNotifications(prayers);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showMuezzinPicker, setShowMuezzinPicker] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playingRef = useRef(false);

  const currentLangName = LANGUAGES.find((l) => l.code === lang)?.nativeName || "English";
  const currentMuezzinLabel = t((MUEZZIN_OPTIONS.find((m) => m.value === azan.muezzin)?.labelKey || "muezzinMakkah") as any);

  const handleTestAzan = () => {
    if (isPlaying) {
      azan.stopAzan();
      setIsPlaying(false);
      playingRef.current = false;
    } else {
      azan.playAzan();
      setIsPlaying(true);
      playingRef.current = true;
      // Auto-reset after 30s
      setTimeout(() => {
        if (playingRef.current) {
          azan.stopAzan();
          setIsPlaying(false);
          playingRef.current = false;
        }
      }, 30000);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-6 rounded-b-3xl">
        <div className="max-w-lg mx-auto flex items-center gap-3 text-white">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">{t("settings")}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-6">
        {/* General */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("general")}</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Language */}
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-border w-full hover:bg-muted/50 transition-colors"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground text-left">{t("language")}</span>
              <span className="text-xs text-muted-foreground">{currentLangName}</span>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", showLangPicker && "rotate-90")} />
            </button>

            {showLangPicker && (
              <div className="border-b border-border bg-muted/30 px-4 py-2 space-y-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangPicker(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      lang === l.code ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {l.nativeName} <span className="text-xs opacity-60">({l.name})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Theme */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0">
              {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <span className="flex-1 text-sm font-medium text-foreground">{t("theme")}</span>
              <span className="text-xs text-muted-foreground mr-2">{theme === "dark" ? t("dark") : t("light")}</span>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>

        {/* Prayer */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("prayerSettings")}</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground">{t("location")}</span>
              <span className="text-xs text-muted-foreground">{t("autoDetect")}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground">{t("calculationMethod")}</span>
              <span className="text-xs text-muted-foreground">MWL</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Bell className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground">{t("azanNotifications")}</span>
              <span className="text-xs text-muted-foreground mr-2">{azan.enabled ? t("on") : t("off")}</span>
              <Switch checked={azan.enabled} onCheckedChange={azan.toggle} />
            </div>

            {/* Muezzin Voice Selector */}
            <button
              onClick={() => setShowMuezzinPicker(!showMuezzinPicker)}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-border w-full hover:bg-muted/50 transition-colors"
            >
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground text-left">{t("azanSound")}</span>
              <span className="text-xs text-muted-foreground">{currentMuezzinLabel}</span>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", showMuezzinPicker && "rotate-90")} />
            </button>

            {showMuezzinPicker && (
              <div className="border-b border-border bg-muted/30 px-4 py-2 space-y-1">
                {MUEZZIN_OPTIONS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { azan.setMuezzin(m.value); setShowMuezzinPicker(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      azan.muezzin === m.value ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {t(m.labelKey as any)}
                  </button>
                ))}
              </div>
            )}

            {/* Test Azan */}
            <button
              onClick={handleTestAzan}
              className="flex items-center gap-3 px-4 py-3.5 w-full hover:bg-muted/50 transition-colors"
            >
              {isPlaying ? (
                <Square className="h-5 w-5 text-destructive" />
              ) : (
                <Play className="h-5 w-5 text-primary" />
              )}
              <span className="flex-1 text-sm font-medium text-foreground text-left">{t("testAzan")}</span>
              {isPlaying && <span className="text-xs text-primary animate-pulse">●</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
