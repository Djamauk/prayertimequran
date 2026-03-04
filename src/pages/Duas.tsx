import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Morning & Evening", count: 12, emoji: "🌅" },
  { name: "Before & After Prayer", count: 15, emoji: "🕌" },
  { name: "Home & Family", count: 8, emoji: "🏠" },
  { name: "Travel", count: 6, emoji: "✈️" },
  { name: "Food & Drink", count: 5, emoji: "🍽️" },
  { name: "Hajj & Umrah", count: 10, emoji: "🕋" },
  { name: "Sickness & Healing", count: 7, emoji: "💚" },
  { name: "Good Etiquette", count: 9, emoji: "🤲" },
  { name: "Nature & Weather", count: 4, emoji: "🌧️" },
  { name: "Seeking Forgiveness", count: 8, emoji: "🤍" },
];

const Duas = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 text-primary-foreground">
            <button onClick={() => navigate("/")} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold flex-1">Hisnul Muslim</h1>
          </div>
          <p className="text-primary-foreground/80 text-xs mt-1">Daily Duas & Supplications</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="text-2xl">{cat.emoji}</span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.count} duas</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Duas;
