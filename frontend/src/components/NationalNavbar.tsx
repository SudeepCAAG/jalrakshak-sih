'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Navigation, 
  Layers, 
  FileText, 
  Home, 
  Lock, 
  Unlock, 
  Waves, 
  Landmark, 
  Cpu, 
  Train, 
  Compass, 
  Building2, 
  Sparkles, 
  AlertOctagon,
  Languages,
  Menu,
  X,
  PhoneCall,
  ShieldCheck
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleMobileNavClick = (pageId: any) => {
    onSelectPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Indian Tricolor Top Stripe with thin subtle bottom border */}
      <div className="flex w-full h-[4px] border-b border-slate-300/80 bg-white">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>
      {/* Modern Clean White Navbar Container with Subtle Tricolor Top Accent */}
      <div className={`bg-white/95 backdrop-blur-xl border-b border-slate-200 select-none transition-all duration-200 ${isScrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-2.5'}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Shield */}
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

          {/* Center: Desktop Navigation Dock (Single-Line Crisp Pills) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md p-1 rounded-full border border-slate-200/90 shadow-2xs shrink-0">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectPage(tab.id as any)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? (tab.isEmergency 
                          ? 'bg-rose-600 text-white shadow-xs' 
                          : 'bg-[#0B1E59] text-white shadow-xs')
                      : (tab.isEmergency 
                          ? 'text-rose-600 hover:bg-rose-50/80' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/90')
                  }`}
                >
                  {tab.isLive && (
                    <span className="relative flex h-2 w-2 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.isEmergency ? 'text-rose-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {isAuthorized && (
              <button
                onClick={() => onSelectPage('moes-console')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activePage === 'moes-console'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.navMoES}</span>
              </button>
            )}
          </nav>

          {/* Right Controls Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Desktop Language Selector */}
            <div className="hidden sm:block relative shrink-0">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white hover:bg-slate-50 backdrop-blur-md border border-slate-200/90 shadow-2xs text-slate-700 hover:text-slate-900 text-xs font-semibold transition duration-150"
                title="Change Language / ভাষা / भाषा"
              >
                <Languages className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase text-[11px] font-bold text-slate-800">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
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
                        currentLang === langItem.code ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{langItem.label}</span>
                      {currentLang === langItem.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-xs"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop City Selector */}
            <div className="hidden sm:block relative shrink-0">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 backdrop-blur-md border border-slate-200/90 shadow-2xs text-slate-700 hover:text-slate-900 text-xs font-semibold transition duration-150"
              >
                <CityIcon className="w-3.5 h-3.5 text-[#0B1E59]" />
                <span className="font-semibold text-slate-800 hidden xl:inline">{currentCityObj.name}</span>
                <span className="font-semibold text-slate-800 xl:hidden">{currentCityObj.name.replace(' Metro', '').replace(' Urban', '').replace(' Greater', '')}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                    Select Indian Metro Region
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto">
                    {CITIES_LIST.map((c) => {
                      const Icon = c.icon;
                      const isSelected = selectedCity === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            onSelectCity(c.id);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs transition hover:bg-blue-50/80 ${
                            isSelected ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 leading-tight">{c.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">{c.landmark}</div>
                          </div>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-xs"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modern AI Assistant Pill Button */}
            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all shrink-0"
              title="Ask JalRakshak AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{t.aiBtn}</span>
            </button>

            {/* Minimalist Authority Login Button */}
            {isAuthorized ? (
              <button
                onClick={onLogoutAuth}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold transition border border-emerald-200 shrink-0"
                title="Authority Session Active"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authorized</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition border border-slate-200/90 shadow-2xs shrink-0"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.loginBtn}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle Button (☰) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition active:scale-95 shadow-xs shrink-0"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Out Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
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
                  Select Language / ভাষা / भाषा
                </div>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                  {languagesList.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => onSelectLang(langItem.code)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                        currentLang === langItem.code 
                          ? 'bg-blue-600 text-white shadow-sm' 
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
                  Select Metro City / অঞ্চল
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
                            ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
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
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? (tab.isEmergency
                              ? 'bg-rose-600 text-white shadow-sm font-bold'
                              : 'bg-slate-900 text-white shadow-sm font-bold')
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
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-emerald-500 text-white">
                          Live
                        </span>
                      )}
                    </button>
                  );
                })}

                {isAuthorized && (
                  <button
                    onClick={() => handleMobileNavClick('moes-console')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                      activePage === 'moes-console'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    <Unlock className="w-4 h-4 text-emerald-700" />
                    <span>{t.navMoES}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100 mt-4">
              <a
                href="tel:112"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency 112 (জাতীয় হেল্পলাইন)</span>
              </a>

              {isAuthorized ? (
                <button
                  onClick={() => {
                    onLogoutAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
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
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Lock className="w-4 h-4 text-slate-300" />
                  <span>{t.loginBtn}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

