'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  X, 
  Navigation, 
  PhoneCall, 
  ShieldAlert, 
  Flame
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
    <div className="relative rounded-2xl bg-rose-900 text-white p-3.5 sm:p-4 shadow-md border border-rose-700 mb-4 sm:mb-5 select-none">
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-rose-800 hover:bg-rose-700 text-rose-200 transition z-20"
        title="Dismiss Alert"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5 pr-7 lg:pr-0">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-rose-800 text-white shrink-0 mt-0.5 sm:mt-0">
            <ShieldAlert className="w-5 h-5 text-rose-200" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-rose-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wider">
                {text.badge}
              </span>
              <span className="text-[10px] text-rose-200 font-semibold uppercase tracking-wider">
                {selectedCity.toUpperCase()} &bull; NDMA ACTIVE
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
              {text.headline}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto pt-1 sm:pt-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={toggleSiren}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border shadow-xs ${
              isSirenActive 
                ? 'bg-amber-400 text-slate-950 border-amber-300' 
                : 'bg-rose-800 hover:bg-rose-700 text-white border-rose-700'
            }`}
            title="Simulate CAP Audio Emergency Siren"
          >
            {isSirenActive ? <Volume2 className="w-3.5 h-3.5 text-slate-950 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" />}
            <span className="whitespace-nowrap">{text.sirenLabel}</span>
          </button>

          <button
            onClick={onNavigateSafeNav}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-rose-950 text-xs font-bold transition shadow-xs border border-white"
          >
            <Navigation className="w-3.5 h-3.5 text-rose-700 shrink-0" />
            <span className="whitespace-nowrap">{text.safeNavBtn}</span>
          </button>

          <button
            onClick={onNavigateEmergency}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{text.sosBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
