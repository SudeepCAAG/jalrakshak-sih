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
  Languages,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Check
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { code: 'bn', label: '?????' },
    { code: 'hi', label: '?????' }
  ];

  const handleMobileNavClick = (pageId: any) => {
    onSelectPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Glassmorphic Top Navbar Container */}
      <div className="bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.05)] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Shield */}
          <div 
            onClick={() => onSelectPage('home')}
            className="cursor-pointer shrink-0"
          >
            <JalRakshakLogo 
              size="md"
              badgeText={currentLang === 'bn' ? '???????' : currentLang === 'hi' ? '?? ?????' : 'Flood Shield'}
              subtitle={t.appSub}
            />
          </div>

          {/* Desktop Navigation Dock (Visible on Tablets and Desktops) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-xs">
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
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.isEmergency ? 'text-rose-600' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase tracking-tighter shadow-2xs ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-100/90 text-amber-800 border border-amber-300/60'
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

          {/* Right Controls (Desktop & Mobile Unified) */}
          <div className="flex items-center gap-2">
            {/* Desktop Language Selector */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs text-stone-800 text-xs font-bold transition duration-200"
                title="Change Language / ???? ???????? / ???? ?????"
              >
                <Languages className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase text-[11px] font-black">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-stone-400 border-b border-stone-100">
                    Language / ????
                  </div>
                  {languagesList.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => {
                        onSelectLang(langItem.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition ${
                        currentLang === langItem.code ? 'bg-amber-50 font-bold text-amber-900' : 'text-stone-700 hover:bg-stone-50'
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

            {/* Desktop City Selector */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs text-stone-800 text-xs font-bold transition duration-200"
              >
                <div className="p-1 rounded-lg bg-amber-100/80 text-amber-700 shadow-2xs">
                  <CityIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="leading-tight flex items-center gap-1">
                    <span>{currentCityObj.name}</span>
                    <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
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
                          <div className="p-1.5 rounded-lg bg-stone-100 text-stone-700">
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

            {/* Quick AI Help Button (Gold Accent) */}
            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-bold shadow-[0_4px_14px_rgba(245,158,11,0.35)] transition-all active:scale-95 border border-white/30"
              title="Ask JalRakshak AI"
            >
              <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>{t.aiBtn}</span>
            </button>

            {/* Desktop Official Login */}
            {isAuthorized ? (
              <button
                onClick={onLogoutAuth}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold transition shadow-xs border border-emerald-500/50"
                title="Authority Active"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-200" />
                <span>Authorized</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs border border-stone-700/50"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Login</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle Button (?) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition active:scale-95 shadow-xs"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Out Mobile Navigation Drawer (Inspired by Photography Reference Site) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <JalRakshakLogo 
                  size="sm"
                  badgeText="SIH 2026"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher Pills */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Language / ????
                </div>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                  {languagesList.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => onSelectLang(langItem.code)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                        currentLang === langItem.code 
                          ? 'bg-amber-500 text-white shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {langItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Metro City / ?????
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CITIES_LIST.map((c) => {
                    const isSelected = selectedCity === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => onSelectCity(c.id)}
                        className={`p-2 rounded-xl text-left text-xs font-semibold transition border flex items-center gap-2 ${
                          isSelected 
                            ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span className="truncate">{c.name.replace(' Metro', '').replace(' Urban', '').replace(' Greater', '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Navigation Menu
                </div>
                {navLinks.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activePage === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleMobileNavClick(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive
                          ? (tab.isEmergency
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-amber-500 text-white shadow-sm')
                          : (tab.isEmergency 
                              ? 'text-rose-600 hover:bg-rose-50' 
                              : 'text-slate-700 hover:bg-slate-100')
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.isLive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-rose-500 text-white">
                          Live
                        </span>
                      )}
                    </button>
                  );
                })}

                {isAuthorized && (
                  <button
                    onClick={() => handleMobileNavClick('moes-console')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      activePage === 'moes-console'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <Unlock className="w-4 h-4 text-amber-700" />
                    <span>{t.navMoES}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100 mt-6">
              <a
                href="tel:112"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency 112 (?????? ?????????)</span>
              </a>

              {isAuthorized ? (
                <button
                  onClick={() => {
                    onLogoutAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Lock className="w-4 h-4" />
                  <span>Logout Authority Console</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Official Authority Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
