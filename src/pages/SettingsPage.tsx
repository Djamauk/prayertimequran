import { ArrowLeft, Globe, Moon, MapPin, Bell, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

const settingsGroups = [
  {
    title: "General",
    items: [
      { icon: Globe, label: "Language", value: "English" },
      { icon: Moon, label: "Theme", value: "Light" },
    ],
  },
  {
    title: "Prayer",
    items: [
      { icon: MapPin, label: "Location", value: "Auto-detect" },
      { icon: Calculator, label: "Calculation Method", value: "MWL" },
      { icon: Bell, label: "Azan Notifications", value: "On" },
    ],
  },
];

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="islamic-gradient islamic-pattern p-5 pt-6 pb-6 rounded-b-3xl">
        <div className="max-w-lg mx-auto flex items-center gap-3 text-primary-foreground">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">Settings</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {group.title}
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {group.items.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
