import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const dhikrList = [
  { text: "سُبْحَانَ ٱللَّٰهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
  { text: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah", target: 33 },
  { text: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
  { text: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah", target: 100 },
];

const Dhikr = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const dhikr = dhikrList[selected];

  const handleTap = () => {
    if (count < dhikr.target) {
      setCount((c) => c + 1);
      setTotal((t) => t + 1);
    }
  };

  const handleReset = () => setCount(0);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-6 rounded-b-3xl">
        <div className="max-w-lg mx-auto flex items-center gap-3 text-primary-foreground">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold flex-1">Dhikr Counter</h1>
          <button onClick={handleReset} className="p-1">
            <RotateCcw className="h-5 w-5 opacity-80" />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-6">
        {/* Dhikr selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dhikrList.map((d, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setCount(0); }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all",
                selected === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              )}
            >
              {d.transliteration}
            </button>
          ))}
        </div>

        {/* Counter display */}
        <div className="flex flex-col items-center">
          <p className="text-4xl font-arabic text-primary mb-2">{dhikr.text}</p>
          <p className="text-sm text-muted-foreground">{dhikr.meaning}</p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleTap}
            className="mt-8 w-40 h-40 rounded-full islamic-gradient shadow-2xl flex flex-col items-center justify-center text-primary-foreground active:shadow-inner transition-shadow"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-5xl font-bold"
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs opacity-80">/ {dhikr.target}</span>
          </motion.button>

          <p className="mt-4 text-sm text-muted-foreground">Total: {total}</p>

          {/* Progress */}
          <div className="w-full mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${(count / dhikr.target) * 100}%` }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dhikr;
