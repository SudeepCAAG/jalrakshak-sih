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
        headline: 'লাল সতর্কতা: আমহার্স্ট স্ট্রিট ও কলেজ স্ট্রিটে জল স্তর ৬০ সেমি ছাড়িয়েছে',
        desc: 'ভারী বৃষ্টির ফলে নিম্নভূমিতে জল দ্রুত বাড়ছে। সমস্ত ছোট যানবাহন আন্ডারপাস এড়িয়ে চলুন।',
        safeNavBtn: 'বিকল্প নিরাপদ রুট দেখুন',
        sosBtn: 'জরুরি হেল্পলাইন ১১২',
        sirenLabel: isSirenActive ? 'সাইরেন বন্ধ করুন' : 'জরুরি সাইরেন টেস্ট'
      };
    }
    if (currentLang === 'hi') {
      return {
        badge: 'CAP आपातकालीन सरकारी चेतावनी',
        headline: 'रेड अलर्ट: मुख्य अंडरपास में जलस्तर 60 सेमी से अधिक दर्ज',
        desc: 'भारी बारिश से जलभराव बढ़ रहा है। कृपया जलमग्न अंडरपास में वाहन न ले जाएं।',
        safeNavBtn: 'सुरक्षित वैकल्पिक मार्ग',
        sosBtn: 'हेल्पलाइन 112',
        sirenLabel: isSirenActive ? 'सायरन बंद करें' : 'आपातकालीन सायरन'
      };
    }
    return {
      badge: 'CAP PRIORITY BROADCAST',
      headline: 'FLASH FLOOD WARNING: Water Inundation Exceeds 60cm in Low-Lying Arterials',
      desc: 'Severe accumulation detected at Amherst St & College St underpasses. Passenger cars strongly advised to reroute.',
      safeNavBtn: 'View Flood-Safe Route',
      sosBtn: 'Call 112',
      sirenLabel: isSirenActive ? 'Mute Siren' : 'Test Audio Siren'
    };
  };

  const text = getAlertText();

  return (
    <div className="relative rounded-2xl bg-rose-900 text-white p-3 sm:p-3.5 shadow-md border border-rose-700 mb-5 select-none">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-rose-800 text-white shrink-0">
            <ShieldAlert className="w-5 h-5 text-rose-200" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-rose-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wider">
                {text.badge}
              </span>
              <span className="text-[10px] text-rose-200 font-semibold uppercase tracking-wider">
                {selectedCity.toUpperCase()} METRO &bull; NDMA PROTOCOL ACTIVE
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
              {text.headline}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0 w-full lg:w-auto justify-start lg:justify-end">
          <button
            onClick={toggleSiren}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              isSirenActive 
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' 
                : 'bg-rose-800 hover:bg-rose-700 text-white border-rose-700'
            }`}
            title="Simulate CAP Audio Emergency Siren"
          >
            {isSirenActive ? <Volume2 className="w-3.5 h-3.5 text-slate-950" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{text.sirenLabel}</span>
          </button>

          <button
            onClick={onNavigateSafeNav}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-rose-950 text-xs font-bold transition shadow-xs border border-white"
          >
            <Navigation className="w-3.5 h-3.5 text-rose-700" />
            <span>{text.safeNavBtn}</span>
          </button>

          <button
            onClick={onNavigateEmergency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{text.sosBtn}</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-lg bg-rose-800 hover:bg-rose-700 text-rose-200 transition ml-1"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
