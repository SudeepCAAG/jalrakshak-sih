'use client';

import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Layers, 
  FileText, 
  Home, 
  Activity, 
  HeartHandshake, 
  Cpu, 
  Lock, 
  Radio, 
  ExternalLink,
  ChevronRight,
  ArrowUp,
  AlertOctagon,
  Building
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
    <footer className="bg-[#0f172a] text-white border-t border-slate-800 relative z-10">
      {/* Main Multi-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1 & 2: Brand Identity, Mission & Real Agency Integration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => onNavigatePage('home')}>
              <JalRakshakLogo 
                size="lg"
                badgeText="NATIONAL DISASTER MANAGEMENT"
                subtitle="Urban Inundation Nowcasting & Safe Navigation Platform"
              />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pr-4 font-normal">
              JalRakshak (জলরক্ষক) is an operational urban flood early-warning platform. 
              Coupled with Doppler Weather Radar (DWR), high-resolution 30m Micro-DEM elevation models, and hydrodynamic drainage networks, 
              it calculates street-level water depths (cm) in 0–3 hour nowcast windows.
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Operational Status:</span>
              <span className="text-slate-300">6 Metros Monitored &bull; Live Radar Active</span>
            </div>

            {/* Institutional Framework Badges */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 pt-1">
              <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                MoES &amp; IMD Data Sync
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                NDMA Guidelines
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                CAP-CP Alerts
              </span>
            </div>
          </div>

          {/* Column 3: Citizen Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Citizen Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigatePage('home')}
                  className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>National Overview</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('gis-nowcast')}
                  className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>0–3h Street GIS Nowcast</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('safe-nav')}
                  className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Inundation Safe Routing</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('emergency')}
                  className="text-rose-300 hover:text-rose-100 transition flex items-center gap-1.5 font-semibold"
                >
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Emergency Helplines &amp; SOS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage('bulletins')}
                  className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Disaster Bulletins &amp; SitReps</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSimulation}
                  className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Hydraulic Stress Simulator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Monitored Metros */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Monitored Metros
            </h4>
            <ul className="space-y-1 text-sm">
              {CITIES_LIST.map((city) => (
                <li key={city.id}>
                  <button
                    onClick={() => {
                      onSelectCity(city.id);
                      onNavigatePage('gis-nowcast');
                    }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition flex items-center justify-between ${
                      selectedCity === city.id 
                        ? 'bg-slate-800 text-white font-bold border border-slate-700' 
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span>{city.name}</span>
                    <span className="text-xs text-slate-400">{city.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: 24x7 Emergency Hotlines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Emergency Hotlines
            </h4>
            <div className="space-y-2">
              <a 
                href="tel:112"
                className="p-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-between transition shadow-sm"
              >
                <div>
                  <div className="text-xs text-rose-100 font-medium">National Emergency Number</div>
                  <div className="text-base font-bold text-white">Dial 112 (Toll Free)</div>
                </div>
                <PhoneCall className="w-5 h-5 text-white" />
              </a>

              <a 
                href="tel:09711077372"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-between transition"
              >
                <div>
                  <div className="text-xs text-slate-300 font-medium">NDRF Flood Rescue</div>
                  <div className="text-xs font-bold text-white">+91-9711077372</div>
                </div>
                <PhoneCall className="w-4 h-4 text-slate-300" />
              </a>

              <a 
                href="tel:1070"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-between transition"
              >
                <div className="text-xs text-slate-300">
                  State Disaster Control: <strong className="text-white">1070</strong>
                </div>
              </a>

              <a 
                href="tel:1077"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-between transition"
              >
                <div className="text-xs text-slate-300">
                  District Disaster Control: <strong className="text-white">1077</strong>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Strip: Authority Login, Technical Specs & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="text-slate-300">&copy; {new Date().getFullYear()} JalRakshak National Disaster Resilience Initiative.</span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <button onClick={onOpenAbout} className="text-slate-300 hover:text-white underline underline-offset-2 transition">
              Physics-Guided Hydrodynamic Architecture
            </button>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <button 
              onClick={() => {
                if (!isAuthorized) onOpenAuth();
                else onNavigatePage('moes-console');
              }}
              className="text-slate-200 hover:text-white font-medium flex items-center gap-1.5 transition"
            >
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              <span>{isAuthorized ? 'Official Console (Active)' : 'Authority Portal (PIN: 12345678)'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold shadow-xs"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
