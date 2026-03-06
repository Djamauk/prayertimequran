import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen, Compass, Hand, BookHeart, Star, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const FeatureGrid = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    { path: "/prayer-times", icon: Clock, label: t("prayerTimes"), color: "from-primary to-islamic-teal" },
    { path: "/quran", icon: BookOpen, label: t("quran"), color: "from-islamic-green-dark to-primary" },
    { path: "/qibla", icon: Compass, label: t("qibla"), color: "from-islamic-teal to-primary" },
    { path: "/dhikr", icon: Hand, label: t("dhikr"), color: "from-primary to-islamic-green-light" },
    { path: "/duas", icon: BookHeart, label: t("duas"), color: "from-islamic-green-dark to-islamic-teal" },
    { path: "/names", icon: Star, label: t("names99"), color: "from-islamic-gold-dark to-islamic-gold" },
    { path: "/calendar", icon: CalendarDays, label: t("calendar"), color: "from-islamic-teal to-islamic-green-dark" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {features.map((feature, i) => (
        <motion.button
          key={feature.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          onClick={() => navigate(feature.path)}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md`}>
            <feature.icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium text-foreground">{feature.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default FeatureGrid;
