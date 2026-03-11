import { ArrowLeft, Play, Pause, Bookmark, BookmarkCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage, LanguageCode } from "@/i18n/LanguageContext";
import { allSurahs } from "@/data/surahs";

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
}

const RECITERS: Record<string, string> = {
  "ar.alafasy": "Mishary Rashid Alafasy",
  "ar.abdurrahmaansudais": "Abdur-Rahman As-Sudais",
  "ar.abdulbasitmurattal": "Abdul Basit (Murattal)",
};

const TRANSLATION_EDITIONS: Record<LanguageCode, string | null> = {
  en: "en.asad",
  ar: null,
  fr: "fr.hamidullah",
  so: "so.abdulwali",
  sw: "en.asad",
  am: "en.asad",
  aa: "en.asad",
  om: "en.asad",
};

const SurahDetail = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [reciter, setReciter] = useState("ar.alafasy");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const surahNum = parseInt(number || "1");
  const surahInfo = allSurahs.find(s => s.number === surahNum);

  // Load bookmarks
  useEffect(() => {
    const saved = localStorage.getItem(`bookmarks-${surahNum}`);
    if (saved) setBookmarks(JSON.parse(saved));
  }, [surahNum]);

  // Save last read
  useEffect(() => {
    localStorage.setItem("lastRead", JSON.stringify({ surah: surahNum, name: surahInfo?.name }));
  }, [surahNum, surahInfo]);

  // Fetch ayahs + translation
  useEffect(() => {
    setLoading(true);
    setError(null);

    const arabicFetch = fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/${reciter}`)
      .then(r => r.json());

    const translationEdition = TRANSLATION_EDITIONS[lang];
    const translationFetch = translationEdition
      ? fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/${translationEdition}`)
          .then(r => r.json())
          .catch(() => null)
      : Promise.resolve(null);

    Promise.all([arabicFetch, translationFetch])
      .then(([arabicData, transData]) => {
        if (arabicData.code === 200) {
          setAyahs(arabicData.data.ayahs.map((a: any) => ({
            number: a.number,
            numberInSurah: a.numberInSurah,
            text: a.text,
            audio: a.audio,
          })));
        } else {
          setError("Failed to load surah");
        }

        if (transData?.code === 200) {
          setTranslations(transData.data.ayahs.map((a: any) => a.text));
        } else {
          setTranslations([]);
        }
      })
      .catch(() => setError("Failed to load surah"))
      .finally(() => setLoading(false));
  }, [surahNum, reciter, lang]);

  const toggleBookmark = useCallback((ayahNum: number) => {
    setBookmarks(prev => {
      const next = prev.includes(ayahNum) ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum];
      localStorage.setItem(`bookmarks-${surahNum}`, JSON.stringify(next));
      return next;
    });
  }, [surahNum]);

  const playAudio = useCallback((ayah: Ayah) => {
    if (audioRef.current) { audioRef.current.pause(); }
    if (playingAyah === ayah.numberInSurah) {
      setPlayingAyah(null);
      return;
    }
    const audio = new Audio(ayah.audio);
    audioRef.current = audio;
    setPlayingAyah(ayah.numberInSurah);
    audio.play();
    audio.onended = () => setPlayingAyah(null);
  }, [playingAyah]);

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground mb-3">
            <button onClick={() => navigate("/quran")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
            <div className="flex-1">
              <h1 className="text-lg font-bold">{surahInfo?.name || `Surah ${surahNum}`}</h1>
              <p className="text-xs opacity-80">{surahInfo?.type === "Meccan" ? t("meccan") : t("medinan")} • {surahInfo?.verses} {t("verses")}</p>
            </div>
            <p className="text-2xl font-arabic">{surahInfo?.arabic}</p>
          </div>
          {surahNum !== 9 && (
            <p className="text-primary-foreground/90 font-arabic text-center text-xl">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-3">
        {/* Reciter selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {Object.entries(RECITERS).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setReciter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                reciter === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">{error}</div>
        )}

        <div className="space-y-3">
          {ayahs.map((ayah, i) => (
            <motion.div
              key={ayah.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {ayah.numberInSurah}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => playAudio(ayah)} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                    {playingAyah === ayah.numberInSurah
                      ? <Pause className="h-4 w-4 text-primary" />
                      : <Play className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <button onClick={() => toggleBookmark(ayah.numberInSurah)} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                    {bookmarks.includes(ayah.numberInSurah)
                      ? <BookmarkCheck className="h-4 w-4 text-primary" />
                      : <Bookmark className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <p className="text-right font-arabic text-xl leading-loose text-foreground">{ayah.text}</p>
              {translations[i] && (
                <p className="mt-3 pt-3 border-t border-border text-sm leading-relaxed text-muted-foreground">
                  {translations[i]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;
