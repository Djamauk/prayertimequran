import { useLocation, useNavigate } from "react-router-dom";
import { Home, Clock, BookOpen, Compass, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: t("home") },
    { path: "/prayer-times", icon: Clock, label: t("prayer") },
    { path: "/quran", icon: BookOpen, label: t("quran") },
    { path: "/qibla", icon: Compass, label: t("qibla") },
    { path: "/settings", icon: Settings, label: t("settings") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>{item.label}</span>
              {isActive && <div className="absolute -top-0 w-8 h-0.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
