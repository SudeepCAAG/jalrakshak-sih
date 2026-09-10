'use client';

import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  ChevronRight,
  ArrowUp,
  AlertOctagon,
  Radio,
  Zap,
  Globe,
  LifeBuoy,
  Lock
} from 'lucide-react';
import { JalRakshakLogo } from './JalRakshakLogo';
import { CITIES_LIST } from './NationalNavbar';

interface NationalFooterProps {
  onNavigatePage: (page: 'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency') => void;
  onOpenAbout: () => void;
  onOpenSimulation: () => void;
  onOpenAuth: () => void;
  isAuthorized: boolean;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export const NationalFooter: React.FC<NationalFooterProps> = ({
  onNavigatePage,
  onOpenAbout,
  onOpenSimulation,
  onOpenAuth,
  isAuthorized,
  selectedCity,
  onSelectCity
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-white border-t border-slate-800/80 z-10 overflow-hidden">
      {/* Top Accent Glowing Stripe */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Main Multi-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Column 1 & 2: Brand Identity, Mission & Real Agency Integration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => onNavigatePage('home')}>
              <JalRakshakLogo 
                size="lg"
                isDark={true}
                badgeText="NATIONAL DISASTER MANAGEMENT"
                subtitle="Urban Inundation Nowcasting & Safe Navigation Platform"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-4 font-normal">
              JalRakshak (জলরক্ষক) is an operational urban flood early-warning platform. 
              Coupled with Doppler Weather Radar (DWR), high-resolution 30m Micro-DEM elevation models, and hydrodynamic drainage networks, 
              it calculates street-level water depths (cm) in 0–3 hour nowcast windows.
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-emerald-400 font-mono">LIVE NOWCAST</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300 text-[11px]">6 Metros Active &bull; 15-Min Doppler Sync</span>
            </div>

            {/* Institutional Framework Badges */}
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 pt-1 font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Radio className="w-3 h-3 text-[#FF9933]" />
                <span>MoES / IMD Radar Sync</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>NDMA Guidelines</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>CAP-CP Early Alerts</span>
              </span>
            </div>
          </div>

          {/* Column 3: Citizen Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Citizen Services</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => onNavigatePage('home')}
                  className="text-slate-300 hover:text-[#FF9933] transition flex items-center gap-2 group w-full text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF9933] group-hover:translate-x-0.5 transition" />
                  <span>National Overview</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('gis-nowcast')}
                  className="text-slate-300 hover:text-[#FF9933] transition flex items-center gap-2 group w-full text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF9933] group-hover:translate-x-0.5 transition" />
                  <span>0–3h Street GIS Nowcast</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('safe-nav')}
                  className="text-slate-300 hover:text-[#FF9933] transition flex items-center gap-2 group w-full text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF9933] group-hover:translate-x-0.5 transition" />
                  <span>Inundation Safe Routing</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('emergency')}
                  className="text-rose-300 hover:text-rose-100 transition flex items-center gap-2 group font-semibold w-full text-left bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-900/60"
                >
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span>Emergency Helplines &amp; SOS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('bulletins')}
                  className="text-slate-300 hover:text-[#FF9933] transition flex items-center gap-2 group w-full text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF9933] group-hover:translate-x-0.5 transition" />
                  <span>Disaster Bulletins &amp; SitReps</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSimulation}
                  className="text-slate-300 hover:text-[#FF9933] transition flex items-center gap-2 group w-full text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF9933] group-hover:translate-x-0.5 transition" />
                  <span>Hydraulic Stress Simulator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Monitored Metros */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Monitored Metros</span>
            </h4>
            <div className="space-y-1.5 text-xs">
              {CITIES_LIST.map((city) => {
                const isSelected = selectedCity === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.id);
                      onNavigatePage('gis-nowcast');
                    }}
                    className={`w-full text-left py-1.5 px-3 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected 
                        ? 'bg-white/10 text-white font-bold border-white/30 shadow-xs' 
                        : 'bg-slate-900/50 text-slate-300 border-slate-800/80 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FF9933] animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-semibold">{city.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{city.state}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 5: 24x7 Emergency Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Hotlines</span>
            </h4>
            <div className="space-y-2">
              {/* 112 Dial */}
              <a 
                href="tel:112"
                className="p-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-between transition-all shadow-md shadow-rose-950/50 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-rose-100 font-bold uppercase tracking-wider">National SOS Helpline</div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                    <span>Dial 112 (Toll Free)</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-4 h-4 text-white" />
                </div>
              </a>

              {/* NDRF */}
              <a 
                href="tel:09711077372"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold">NDRF Flood Rescue</div>
                  <div className="text-xs font-mono font-bold text-[#FF9933] group-hover:text-[#FFB366]">+91-9711077372</div>
                </div>
                <LifeBuoy className="w-4 h-4 text-slate-500 group-hover:text-[#FF9933] transition-colors" />
              </a>

              {/* Dual State & District Helplines */}
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="tel:1070"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
                >
                  <div className="text-[9px] font-mono text-slate-400 uppercase">State Control</div>
                  <div className="text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300">1070</div>
                </a>

                <a 
                  href="tel:1077"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
                >
                  <div className="text-[9px] font-mono text-slate-400 uppercase">District Control</div>
                  <div className="text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300">1077</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Strip: Authority Login, Technical Specs & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="text-slate-300">&copy; {new Date().getFullYear()} JalRakshak National Disaster Resilience Initiative.</span>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <button onClick={onOpenAbout} className="text-slate-300 hover:text-[#FF9933] underline underline-offset-2 transition">
              Physics-Guided Hydrodynamic Architecture
            </button>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <button 
              onClick={() => {
                if (!isAuthorized) onOpenAuth();
                else onNavigatePage('moes-console');
              }}
              className="text-slate-300 hover:text-white font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            >
              <Lock className="w-3 h-3 text-[#FF9933]" />
              <span>{isAuthorized ? 'MoES Console (Active)' : 'Authority Official Login'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={scrollToTop}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-white/10 text-slate-300 hover:text-[#FF9933] border border-slate-800 hover:border-[#FF9933]/50 transition-all flex items-center gap-1.5 text-xs font-mono font-bold shadow-xs group"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF9933] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
