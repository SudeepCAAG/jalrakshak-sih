'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  X, 
  Navigation, 
  PhoneCall, 
  ShieldAlert
} from 'lucide-react';
import { Language } from '@/utils/translations';

interface CAPEmergencyBroadcastBannerProps {
  currentLang: Language;
  selectedCity: string;
  onNavigateSafeNav: () => void;
  onNavigateEmergency: () => void;
}

export const CAPEmergencyBroadcastBanner: React.FC<CAPEmergencyBroadcastBannerProps> = ({
  currentLang,
  selectedCity,
  onNavigateSafeNav,
  onNavigateEmergency
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleSiren = () => {
    if (isSirenActive) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
        oscRef.current = null;
      }
      setIsSirenActive(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        const now = ctx.currentTime;
        for (let i = 0; i < 30; i++) {
          osc.frequency.linearRampToValueAtTime(800, now + i * 1.2 + 0.6);
          osc.frequency.linearRampToValueAtTime(450, now + i * 1.2 + 1.2);
        }

        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsSirenActive(true);
      } catch (err) {
        console.warn('Audio context error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  if (isDismissed) return null;

  const getAlertText = () => {
    if (currentLang === 'bn') {
      return {
        badge: 'CAP জরুরি সরকারি সতর্কবার্তা',
        headline: 'লাল সতর্কতা: আমহার্স্ট ও কলেজ স্ট্রিটে জল স্তর ৬০ সেমি ছাড়িয়েছে',
        desc: 'ভারী বৃষ্টির ফলে নিম্নভূমিতে জল দ্রুত বাড়ছে। সমস্ত ছোট যানবাহন আন্ডারপাস এড়িয়ে চলুন।',
        safeNavBtn: 'নিরাপদ রুট',
        sosBtn: '১১২ SOS কল',
        sirenLabel: isSirenActive ? 'সাইরেন বন্ধ' : 'সাইরেন টেস্ট'
      };
    }
    if (currentLang === 'hi') {
      return {
        badge: 'CAP आपातकालीन सरकारी चेतावनी',
        headline: 'रेड अलर्ट: मुख्य अंडरपास में जलस्तर 60 सेमी से अधिक दर्ज',
        desc: 'अंडरपास और निचले इलाकों में जलभराव तेजी से बढ़ रहा है।',
        safeNavBtn: 'सुरक्षित मार्ग',
        sosBtn: '112 SOS कॉल',
        sirenLabel: isSirenActive ? 'साइरैन बंद' : 'साइरैन टेस्ट'
      };
    }
    return {
      badge: 'CAP PRIORITY BROADCAST',
      headline: 'FLASH FLOOD WARNING: Inundation Exceeds 60cm in Low-Lying Areas',
      desc: 'Severe depression accumulation. Small vehicles avoid inundated underpasses.',
      safeNavBtn: 'Safe Route',
      sosBtn: 'Call 112',
      sirenLabel: isSirenActive ? 'Stop Siren' : 'Test Siren'
    };
  };

  const text = getAlertText();

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white p-3 sm:p-4 shadow-sm border border-rose-600/50 mb-4 sm:mb-5 select-none animate-in fade-in duration-200">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="relative p-2 rounded-xl bg-rose-900/80 border border-rose-500/40 text-white shrink-0 mt-0.5 sm:mt-0 shadow-xs">
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-2xs">
                {text.badge}
              </span>
              <span className="text-[10px] text-rose-300/90 font-mono font-semibold uppercase tracking-wider">
                {selectedCity.toUpperCase()} • NDMA ACTIVE
              </span>
            </div>

            <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug">
              {text.headline}
            </h4>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto pt-1 lg:pt-0">
          <button
            onClick={toggleSiren}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-2xs whitespace-nowrap ${
              isSirenActive 
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' 
                : 'bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 border-rose-700/60'
            }`}
            title="Simulate CAP Audio Emergency Siren"
          >
            {isSirenActive ? <Volume2 className="w-3.5 h-3.5 text-slate-950 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" />}
            <span>{text.sirenLabel}</span>
          </button>

          <button
            onClick={onNavigateSafeNav}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition shadow-2xs whitespace-nowrap border border-white/80"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{text.safeNavBtn}</span>
          </button>

          <button
            onClick={onNavigateEmergency}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span>{text.sosBtn}</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-300 hover:text-white transition shrink-0 flex items-center justify-center"
            title="Dismiss Alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
