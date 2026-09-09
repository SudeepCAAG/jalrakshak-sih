'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Navigation, 
  Layers, 
  FileText, 
  Home, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Waves, 
  Landmark, 
  Cpu, 
  Train, 
  Compass, 
  Building2, 
  Bot, 
  AlertOctagon,
  Languages
} from 'lucide-react';
import { SystemOverview } from '@/types';
import { Language, translations } from '@/utils/translations';
import { JalRakshakLogo } from '@/components/JalRakshakLogo';

interface NationalNavbarProps {
  overview?: SystemOverview | null;
  activePage: 'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency';
  onSelectPage: (page: 'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency') => void;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isAuthorized: boolean;
  onOpenAuthModal: () => void;
  onLogoutAuth: () => void;
  onOpenAIChat: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const CITIES_LIST = [
  { id: 'kolkata', name: 'Kolkata Metro', state: 'West Bengal', icon: Train, landmark: 'Thanthania & College Street' },
  { id: 'mumbai', name: 'Mumbai Metro', state: 'Maharashtra', icon: Waves, landmark: 'Hindmata & Milan Subway' },
  { id: 'delhi', name: 'Delhi-NCR', state: 'Capital Region', icon: Landmark, landmark: 'Minto Bridge & Pragati Maidan' },
  { id: 'bengaluru', name: 'Bengaluru Urban', state: 'Karnataka', icon: Cpu, landmark: 'Silk Board & Bellandur ORR' },
  { id: 'chennai', name: 'Greater Chennai', state: 'Tamil Nadu', icon: Compass, landmark: 'Velachery & Madipakkam' },
  { id: 'hyderabad', name: 'Hyderabad GHMC', state: 'Telangana', icon: Building2, landmark: 'Tolichowki & Musi River' }
];

export const NationalNavbar: React.FC<NationalNavbarProps> = ({
  overview,
  activePage,
  onSelectPage,
  selectedCity,
  onSelectCity,
  onRefresh,
  isRefreshing,
  isAuthorized,
  onOpenAuthModal,
  onLogoutAuth,
  onOpenAIChat,
  currentLang,
  onSelectLang
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = translations[currentLang] || translations.en;
  const currentCityObj = CITIES_LIST.find((c) => c.id === selectedCity) || CITIES_LIST[0];
  const CityIcon = currentCityObj.icon;

  const navLinks = [
    { id: 'home', label: t.navHome, icon: Home, isEmergency: false, isLive: false },
    { id: 'gis-nowcast', label: t.navGis, icon: Layers, isEmergency: false, isLive: true },
    { id: 'safe-nav', label: t.navSafeNav, icon: Navigation, isEmergency: false, isLive: false },
    { id: 'emergency', label: t.navEmergency, icon: AlertOctagon, isEmergency: true, isLive: false },
    { id: 'bulletins', label: t.navBulletins, icon: FileText, isEmergency: false, isLive: false },
  ];

  const languagesList: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'hi', label: 'हिंदी' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Glassmorphic Container with Frosted Blur & Gradient Rim */}
      <div className="bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 shadow-[0_8px_32px_0_rgba(180,140,80,0.08)] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Emblem - JalRakshak High-Tech Glass Logo */}
          <div 
            onClick={() => onSelectPage('home')}
            className="cursor-pointer shrink-0"
          >
            <JalRakshakLogo 
              size="md"
              badgeText={currentLang === 'bn' ? 'জলরক্ষক' : currentLang === 'hi' ? 'जल रक्षक' : 'Flood Shield'}
              subtitle={t.appSub}
            />
          </div>

          {/* Center: Glassmorphic Navigation Dock */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.03)]">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectPage(tab.id as any)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? (tab.isEmergency 
                          ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-[0_4px_12px_rgba(225,29,72,0.35)]' 
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_4px_14px_rgba(245,158,11,0.35)]')
                      : (tab.isEmergency 
                          ? 'text-rose-600 hover:bg-rose-50/80' 
                          : 'text-stone-600 hover:text-stone-900 hover:bg-white/80')
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : (tab.isEmergency ? 'text-rose-600' : 'text-stone-500')}`} />
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase tracking-tighter shadow-2xs ${
                      isActive ? 'bg-white text-amber-700' : 'bg-amber-100/90 text-amber-800 border border-amber-300/60'
                    }`}>
                      Live
                    </span>
                  )}
                </button>
              );
            })}

            {isAuthorized && (
              <button
                onClick={() => onSelectPage('moes-console')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activePage === 'moes-console'
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-[0_4px_12px_rgba(217,119,6,0.35)]'
                    : 'bg-amber-50/90 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Unlock className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.navMoES}</span>
              </button>
            )}
          </nav>

          {/* Right Controls: Glass Pill Widgets */}
          <div className="flex items-center gap-2">
            {/* Language Toggle Pill (Glassmorphic) */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-800 text-xs font-bold transition duration-200"
                title="Change Language / ভাষা পরিবর্তন / भाषा बदलें"
              >
                <Languages className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase text-[11px] font-black">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.12)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-stone-400 border-b border-stone-100">
                    Language / ভাষা
                  </div>
                  {languagesList.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => {
                        onSelectLang(langItem.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition ${
                        currentLang === langItem.code ? 'bg-amber-50 font-bold text-amber-900' : 'text-stone-700 hover:bg-stone-50/80'
                      }`}
                    >
                      <span>{langItem.label}</span>
                      {currentLang === langItem.code && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* JalRakshak AI Button (Glowing Glass Accent) */}
            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-bold shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all duration-200 active:scale-95 border border-white/30"
              title="Ask JalRakshak AI"
            >
              <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>{t.aiBtn}</span>
            </button>

            {/* City Selector (Glassmorphic) */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-800 text-xs font-bold transition duration-200"
              >
                <div className="p-1 rounded-lg bg-amber-100/80 text-amber-700 shadow-2xs">
                  <CityIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="leading-tight flex items-center gap-1">
                    <span>{currentCityObj.name}</span>
                    <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase text-stone-400 tracking-wider border-b border-stone-100">
                    Select Indian Metro Region
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto">
                    {CITIES_LIST.map((c) => {
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            onSelectCity(c.id);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs transition hover:bg-amber-50/90 ${
                            selectedCity === c.id ? 'bg-amber-100/70 font-bold text-amber-900' : 'text-stone-700'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-stone-100/90 text-stone-700">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-stone-900 leading-tight">{c.name}</div>
                            <div className="text-[10px] text-stone-500 truncate">{c.landmark}</div>
                          </div>
                          {selectedCity === c.id && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/80 text-stone-700 transition active:scale-95 disabled:opacity-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              title="Refresh live telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Authority Access Button (Dark Glass Accent) */}
            {isAuthorized ? (
              <button
                onClick={onLogoutAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100/90 hover:bg-stone-200/90 backdrop-blur-md border border-white/80 text-stone-700 text-xs font-bold transition shadow-xs"
                title="Lock official console"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-950 hover:to-stone-900 text-white text-xs font-bold transition shadow-[0_4px_14px_rgba(0,0,0,0.25)] border border-stone-700/50"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{t.loginBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
