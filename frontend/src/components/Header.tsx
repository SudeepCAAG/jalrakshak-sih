'use client';

import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  RefreshCw, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  SlidersHorizontal,
  ChevronDown,
  Navigation,
  Compass
} from 'lucide-react';
import { SystemOverview } from '@/types';

interface HeaderProps {
  overview?: SystemOverview | null;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  appMode: 'citizen' | 'command';
  onToggleAppMode: (mode: 'citizen' | 'command') => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const CITIES_LIST = [
  { id: 'mumbai', name: 'Mumbai Metro', state: 'Maharashtra', code: 'MUM', landmark: 'Hindmata & Milan Subway' },
  { id: 'delhi', name: 'Delhi-NCR', state: 'Capital Region', code: 'DEL', landmark: 'Minto Bridge & Pragati Maidan' },
  { id: 'bengaluru', name: 'Bengaluru Urban', state: 'Karnataka', code: 'BLR', landmark: 'Silk Board & Bellandur ORR' },
  { id: 'kolkata', name: 'Kolkata Metro', state: 'West Bengal', code: 'CCU', landmark: 'Thanthania & College Street' },
  { id: 'chennai', name: 'Greater Chennai', state: 'Tamil Nadu', code: 'MAA', landmark: 'Velachery & Madipakkam' },
  { id: 'hyderabad', name: 'Hyderabad GHMC', state: 'Telangana', code: 'HYD', landmark: 'Tolichowki & Musi River' }
];

export const Header: React.FC<HeaderProps> = ({ 
  overview, 
  selectedCity, 
  onSelectCity,
  appMode,
  onToggleAppMode,
  onRefresh, 
  isRefreshing 
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentCityObj = CITIES_LIST.find((c) => c.id === selectedCity) || CITIES_LIST[0];
  const weather = overview?.current_weather || {
    temperature: 28,
    condition: 'Overcast Rain',
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 sticky top-0 z-50 shadow-2xs">
      {/* Left: National Brand Emblem & Title */}
      <div className="flex items-center gap-3">
        {/* National JalDrishti Emblem */}
        <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 via-sky-600 to-amber-500 text-white shadow-md shadow-blue-500/20 shrink-0 ring-2 ring-blue-100">
          <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 8c-2 2-3 4-3 5.5a3 3 0 1 0 6 0C15 12 14 10 12 8z" fill="white" />
            <path d="M4 14c2-1 4-1 6 0s4 1 6 0 4-1 4-1" />
          </svg>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-stone-900 border border-white">
            IN
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base sm:text-lg font-black text-stone-900 tracking-tight flex items-center gap-1.5">
              <span>JalDrishti</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                जलদৃষ্টি
              </span>
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
              Live Radar &bull; MoHUA &amp; NDMA Network
            </span>
          </div>
          <p className="text-[11px] text-stone-500 font-medium truncate max-w-sm sm:max-w-md">
            National Urban Flood Nowcasting &amp; Street-Level Safe Navigation
          </p>
        </div>
      </div>

      {/* Middle: Pan-India City Switcher Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100/80 text-stone-800 text-xs font-bold transition shadow-2xs"
        >
          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black">{currentCityObj.code}</span>
          <div className="text-left">
            <div className="leading-tight flex items-center gap-1">
              <span>{currentCityObj.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="text-[10px] font-normal text-stone-500">{currentCityObj.state}</div>
          </div>
        </button>

        {isCityDropdownOpen && (
          <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-2xl border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-stone-400 tracking-wider border-b border-stone-100">
              Select Indian Metro City
            </div>
            <div className="py-1 max-h-72 overflow-y-auto">
              {CITIES_LIST.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCity(c.id);
                    setIsCityDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-amber-50 ${
                    selectedCity === c.id ? 'bg-amber-100/70 font-bold text-amber-950' : 'text-stone-700'
                  }`}
                >
                  <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-black shrink-0">{c.code}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-stone-900 leading-tight">{c.name}</div>
                    <div className="text-[10px] text-stone-500 truncate">{c.landmark}</div>
                  </div>
                  {selectedCity === c.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Mode Toggle, Helpline, Live Weather, Refresh */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-3">
        {/* Dual Mode Switcher Button (Citizen vs Command) */}
        <div className="flex rounded-xl bg-stone-100 p-0.5 border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => onToggleAppMode('citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              appMode === 'citizen'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen View</span>
          </button>
          <button
            onClick={() => onToggleAppMode('command')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              appMode === 'command'
                ? 'bg-stone-900 text-amber-400 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Engineer / Judge View</span>
          </button>
        </div>

        {/* Emergency Helpline Badge */}
        <a 
          href={`tel:${overview?.helpline ? overview.helpline.split(' ')[0] : '112'}`}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition"
          title="Click to call emergency disaster helpline"
        >
          <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>{overview?.helpline || '112 Emergency'}</span>
        </a>

        {/* Current Weather summary */}
        <div className="hidden lg:flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl text-xs">
          <CloudRain className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <div>
            <div className="font-bold text-stone-800 leading-tight">
              {Math.round(weather.temperature)}&deg;C &bull; <span className="font-normal text-stone-500">{weather.condition}</span>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition active:scale-95 disabled:opacity-50 shadow-2xs"
          title="Refresh live telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </header>
  );
};
