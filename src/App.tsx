import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import BottomNav from "@/components/layout/BottomNav";
import Index from "./pages/Index";
import PrayerTimes from "./pages/PrayerTimes";
import Quran from "./pages/Quran";
import SurahDetail from "./pages/SurahDetail";
import Qibla from "./pages/Qibla";
import Dhikr from "./pages/Dhikr";
import Duas from "./pages/Duas";
import DuaDetail from "./pages/DuaDetail";
import Names from "./pages/Names";
import IslamicCalendar from "./pages/IslamicCalendar";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/prayer-times" element={<PrayerTimes />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/quran/:number" element={<SurahDetail />} />
              <Route path="/qibla" element={<Qibla />} />
              <Route path="/dhikr" element={<Dhikr />} />
              <Route path="/duas" element={<Duas />} />
              <Route path="/duas/:category" element={<DuaDetail />} />
              <Route path="/names" element={<Names />} />
              <Route path="/calendar" element={<IslamicCalendar />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
