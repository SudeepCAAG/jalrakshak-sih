'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Layers, 
  Navigation, 
  ArrowRight, 
  Activity, 
  CloudRain, 
  Waves, 
  Compass, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Sliders,
  PhoneCall,
  Search,
  Radio,
  Clock,
  Droplets,
  Train,
  Sparkles,
  Bot,
  Zap,
  Gauge,
  Share2,
  HeartHandshake,
  Camera,
  MapPin,
  Cpu,
  Eye,
  Crosshair,
  ExternalLink,
  ChevronRight,
  Info,
  Footprints,
  Bike,
  Car,
  Truck,
  Check,
  X,
  ThumbsUp
} from 'lucide-react';
import { SystemOverview, Zone } from '@/types';
import { CITIES_LIST } from './NationalNavbar';
import { Language, translations } from '@/utils/translations';

interface HeroLandingPageProps {
  overview: SystemOverview | null;
  zones: Zone[];
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onNavigatePage: (page: 'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency') => void;
  onSelectZone: (zone: Zone) => void;
  currentLang: Language;
  citizenReports?: any[];
  onOpenReportModal?: () => void;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({
  overview,
  zones,
  selectedCity,
  onSelectCity,
  onNavigatePage,
  onSelectZone,
  currentLang,
  citizenReports,
  onOpenReportModal
}) => {
  const [heroSearchTab, setHeroSearchTab] = useState<'status' | 'route'>('status');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const t = translations[currentLang] || translations.en;
  const currentCityMeta = CITIES_LIST.find((c) => c.id === selectedCity) || CITIES_LIST[0];

  const searchResults = zones.filter((z) => 
    z.zone_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSearchedZone = searchResults.length > 0 ? searchResults[0] : zones[0];

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. TOP SEAMLESS TELEMETRY WIRE (CLEAN LIGHT DESIGN) */}
      <div className="overflow-hidden rounded-2xl bg-white border border-slate-200/90 text-slate-700 shadow-xs py-2 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-mono font-bold tracking-wider shrink-0 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            LIVE TELEMETRY
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-ticker text-xs font-medium text-slate-600">
              <span className="mr-8 inline-flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <strong className="text-slate-900 font-semibold">IMD Doppler DWR {currentCityMeta.name}:</strong> 15-min volume scan active • Precip rate ~{overview?.current_weather?.rainfall_rate_mm_hr || 38.5} mm/h
              </span>
              <span className="mr-8 inline-flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <strong className="text-slate-900 font-semibold">Municipal Drainage:</strong> Dewatering Sump Pumps running at 100% capacity
              </span>
              <span className="mr-8 inline-flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <strong className="text-slate-900 font-semibold">High Risk Hotspots:</strong> {zones.filter(z => z.risk_level === 'HIGH').length} underpasses flagged for severe bowl accumulation
              </span>
              <span className="mr-8 inline-flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <strong className="text-slate-900 font-semibold">AI Safe Navigation:</strong> Elevated road bypass engine active with 0–3h lookahead
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO COCKPIT & 3D CITY RADAR FRAME */}
      <section className="relative pt-2 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Clean Typography & Unified Search / Route Cockpit */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Mission Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/90 shadow-2xs text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-600 font-mono text-[11px] uppercase tracking-wider font-bold">MoES &amp; NDMA INITIATIVE</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-900 font-bold">{t.tagline}</span>
              </div>

              {/* Master Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-tight sm:leading-[1.12]">
                {t.heroHeadline1}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.heroHeadlineHighlight}
                </span>
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
                {t.heroDescription}
              </p>

              {/* Dual Hero Action Buttons (Clean & Prominent) */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                <button
                  onClick={() => onNavigatePage('safe-nav')}
                  className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all active:scale-98 flex items-center justify-center gap-2 border border-white/20"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span className="uppercase tracking-wide font-extrabold">{t.planSafeRoute}</span>
                </button>

                <button
                  onClick={() => onNavigatePage('gis-nowcast')}
                  className="flex-1 py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="uppercase tracking-wide font-extrabold">{t.checkStreetStatus}</span>
                </button>
              </div>

              {/* Sleek Floating Street Search Bar */}
              <div className="pt-2 space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-24 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 text-xs font-medium text-slate-900 bg-white shadow-2xs placeholder:text-slate-400 transition"
                  />
                  <button 
                    onClick={() => onNavigatePage('gis-nowcast')}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Live Quick Preview Badge when user searches or hovers */}
                {searchQuery && selectedSearchedZone && (
                  <div className="p-3 rounded-2xl bg-blue-50/90 border border-blue-200 flex items-center justify-between gap-3 animate-in fade-in duration-150">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{selectedSearchedZone.zone_name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Water Depth: <strong className="text-slate-900">~{selectedSearchedZone.water_depth_cm.toFixed(1)} cm</strong> • Level: {selectedSearchedZone.citizen_water_level}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectZone(selectedSearchedZone);
                        onNavigatePage('safe-nav');
                      }}
                      className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition flex items-center gap-1 shadow-2xs"
                    >
                      <span>Safe Route</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* National Trust & Key Metric Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-900 font-bold">128 Hotspots</div>
                    <div className="text-[10px] text-slate-500">Live Monitored</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-900 font-bold">94.2% Accuracy</div>
                    <div className="text-[10px] text-slate-500">Physics Guided</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-900 font-bold">0–3h Horizon</div>
                    <div className="text-[10px] text-slate-500">Early Nowcast</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-900 font-bold">Doppler Radar</div>
                    <div className="text-[10px] text-slate-500">Live 3.2 GHz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean Studio 3D Hydraulic City & Doppler Radar Frame */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-md flex flex-col justify-between flex-1">
              
              {/* Top Studio Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-600"></div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                      <span>DOPPLER DWR TELEMETRY</span>
                      <span className="text-[9px] bg-cyan-50 border border-cyan-200 text-cyan-800 px-1.5 py-0.2 rounded font-bold">LIVE 3.2GHz</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">30m Micro-DEM • 0–3h Horizon</div>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
                    {currentCityMeta.landmark}
                  </span>
                </div>
              </div>

              {/* 3D City Cutaway Frame with Radar Sweep & Hydro Nodes */}
              <div className="relative my-4 h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                <Image
                  src="/hero-3d-city-cutaway.jpg"
                  alt="3D Drainage & Radar Coupling System"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Concentric Radar Rings Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-cyan-500/20 border-dashed"></div>
                  <div className="w-36 h-36 rounded-full border border-cyan-600/30"></div>
                </div>

                {/* Node 1: Sump Inundation Sensor */}
                <div 
                  className="absolute top-1/3 left-1/4 z-20 cursor-pointer group/node"
                  onMouseEnter={() => setHoveredNode('node1')}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNavigatePage('gis-nowcast')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white shadow-md"></span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-6 -top-6 w-44 p-2.5 rounded-xl bg-white border border-rose-300 shadow-xl text-slate-900 text-[10px] transition opacity-0 group-hover/node:opacity-100 pointer-events-none font-mono">
                    <div className="text-rose-700 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                      <span>Sump Depres. #01</span>
                    </div>
                    <div className="text-slate-600">Depth: ~95cm (Submerged)</div>
                    <div className="text-slate-500">Pumping Discharge: 85%</div>
                  </div>
                </div>

                {/* Node 2: Stormwater Pumping Station */}
                <div 
                  className="absolute bottom-1/4 right-1/3 z-20 cursor-pointer group/node"
                  onMouseEnter={() => setHoveredNode('node2')}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNavigatePage('gis-nowcast')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-md"></span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute right-6 -top-6 w-44 p-2.5 rounded-xl bg-white border border-emerald-300 shadow-xl text-slate-900 text-[10px] transition opacity-0 group-hover/node:opacity-100 pointer-events-none font-mono">
                    <div className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Pump Station #04</span>
                    </div>
                    <div className="text-slate-600">Pumps: 8/8 Operational</div>
                    <div className="text-slate-500">Flow: 12,500 m³/hr</div>
                  </div>
                </div>

                {/* Live Caption */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-mono text-slate-800 flex items-center gap-1.5 z-20 shadow-xs">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Scanning Urban Hydrograph Basin</span>
                </div>
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs pt-1 font-mono">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Doppler Rain</div>
                  <div className="font-bold text-cyan-700 text-sm mt-0.5">
                    {overview?.current_weather?.rainfall_rate_mm_hr || overview?.avg_rainfall_now || 38.5} mm/h
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Drain Discharge</div>
                  <div className="font-bold text-emerald-700 text-sm mt-0.5">142 m³/s</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Nowcast Lead</div>
                  <div className="font-bold text-amber-700 text-sm mt-0.5">0–3 Hours</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. NATIONAL IMPACT SENSOR MESH (CLEAN LIGHT STUDIO DESIGN) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-cyan-700 uppercase tracking-widest">
                NATIONAL SENSOR MESH
              </span>
              <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                ACTIVE 24x7
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Pan-India Urban Radar &amp; Hydraulic Sensor Network
            </h3>
          </div>
          <button 
            onClick={() => onNavigatePage('gis-nowcast')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>Launch Street GIS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
            <div className="text-cyan-700 font-mono font-extrabold text-2xl sm:text-3xl">6 DWR</div>
            <div className="text-xs text-slate-900 font-bold">{t.liveStatsActiveRadars}</div>
            <p className="text-[10px] text-slate-500">Continuous 15-min volume scans</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
            <div className="text-amber-700 font-mono font-extrabold text-2xl sm:text-3xl">128+</div>
            <div className="text-xs text-slate-900 font-bold">{t.liveStatsZonesMonitored}</div>
            <p className="text-[10px] text-slate-500">Railway subways & bowl areas</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
            <div className="text-emerald-700 font-mono font-extrabold text-2xl sm:text-3xl">94.2%</div>
            <div className="text-xs text-slate-900 font-bold">{t.liveStatsAccuracy}</div>
            <p className="text-[10px] text-slate-500">Hydraulic DEM ground validated</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
            <div className="text-blue-700 font-mono font-extrabold text-2xl sm:text-3xl">1.8M+</div>
            <div className="text-xs text-slate-900 font-bold">{t.liveStatsCitizensProtected}</div>
            <p className="text-[10px] text-slate-500">Across 6 major Indian metros</p>
          </div>
        </div>
      </section>

      {/* 4. PHYSICS-GUIDED TECHNOLOGICAL PILLARS (HIGH-TECH GLASS CARDS) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
            <span>HYDRAULIC &amp; AI ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {t.corePillarsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.corePillarsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Doppler Radar */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] bg-cyan-50 text-cyan-800 font-extrabold px-2.5 py-1 rounded-full border border-cyan-200 uppercase tracking-wide">
                  Layer 01
                </span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 tracking-tight">Doppler Radar NWP</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Captures high-resolution rainfall nowcasts at 15-minute intervals, predicting rain clouds before precipitation hits the ground.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                <Zap className="w-3 h-3 text-cyan-600" />
                <span>15-Min NWP Scan</span>
              </div>
              <span className="text-[11px] font-bold text-cyan-700 group-hover:text-cyan-800 flex items-center gap-1">
                <span>0–3h Ahead</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 2: 30m Micro-DEM */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] bg-blue-50 text-blue-800 font-extrabold px-2.5 py-1 rounded-full border border-blue-200 uppercase tracking-wide">
                  Layer 02
                </span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 tracking-tight">30m Micro-DEM Sump</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Uses Digital Elevation Models to compute micro-watershed depressions where water naturally collects into high-risk bowl zones.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                <Layers className="w-3 h-3 text-blue-600" />
                <span>30m Topo Grid</span>
              </div>
              <span className="text-[11px] font-bold text-blue-700 group-hover:text-blue-800 flex items-center gap-1">
                <span>Depth Gauge</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 3: 1D/2D Hydrodynamic Pipes */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Waves className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] bg-indigo-50 text-indigo-800 font-extrabold px-2.5 py-1 rounded-full border border-indigo-200 uppercase tracking-wide">
                  Layer 03
                </span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 tracking-tight">Hydrodynamic Pipes</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Models underground stormwater pipes, culverts, and dewatering pump stations using Manning-Strickler hydrodynamic equations.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                <Activity className="w-3 h-3 text-indigo-600" />
                <span>Manning 1D/2D</span>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 group-hover:text-indigo-800 flex items-center gap-1">
                <span>Pipe Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 4: AI Safe Navigator */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
                  Layer 04
                </span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 tracking-tight">AI Safe Navigator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Calculates elevated alternate routes and answers citizen emergency questions using intelligent routing AI, avoiding stalled vehicles.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Zero Stalling</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
                <span>Safe Reroute</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MONITORED URBAN UNDERPASSES & BOWL ZONES GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider">
                HYDROGRAPH TELEMETRY
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                {currentCityMeta.name} Region
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-0.5">
              Monitored Urban Underpasses &amp; Depressions
            </h2>
          </div>
          <button
            onClick={() => onNavigatePage('gis-nowcast')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 group self-start sm:self-auto bg-cyan-50 hover:bg-cyan-100/80 px-3.5 py-2 rounded-xl border border-cyan-200/80 transition shadow-2xs"
          >
            <span>View All Zones on Full GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {zones.slice(0, 4).map((zone) => {
            const isSubmerged = zone.water_depth_cm > 50;
            const isWaterlogged = zone.water_depth_cm > 25 && zone.water_depth_cm <= 50;
            const depthPercent = Math.min(100, Math.round((zone.water_depth_cm / 120) * 100));

            return (
              <div 
                key={zone.zone_id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                {/* Zone Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      {zone.zone_id}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isSubmerged ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      isWaterlogged ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isSubmerged ? 'bg-rose-500 animate-pulse' :
                        isWaterlogged ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`} />
                      {zone.citizen_water_level}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-slate-900 tracking-tight group-hover:text-cyan-700 transition">
                      {zone.zone_name}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-1">
                      <span>Elevation: <strong className="text-slate-800">{zone.elevation_m}m MSL</strong></span>
                      <span className={`font-bold ${isSubmerged ? 'text-rose-600' : isWaterlogged ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ~{zone.water_depth_cm.toFixed(1)} cm
                      </span>
                    </div>
                  </div>

                  {/* Water Depth Progress Meter */}
                  <div className="space-y-1">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          isSubmerged ? 'bg-gradient-to-r from-amber-500 to-rose-600' :
                          isWaterlogged ? 'bg-gradient-to-r from-cyan-500 to-amber-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.max(6, depthPercent)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>0cm (Dry)</span>
                      <span>50cm (Critical)</span>
                      <span>120cm+</span>
                    </div>
                  </div>

                  {/* Vehicle Passability Micro-Grid */}
                  <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200/80 space-y-1.5">
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Passability Status
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {/* Walk */}
                      <div className={`flex flex-col items-center justify-center p-1 rounded-lg border text-[9px] font-bold ${
                        zone.water_depth_cm < 15 
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700' 
                          : 'bg-slate-100/70 border-slate-200 text-slate-500 line-through opacity-75'
                      }`}>
                        <Footprints className="w-3.5 h-3.5 mb-0.5" />
                        <span>Walk</span>
                      </div>
                      {/* Bike */}
                      <div className={`flex flex-col items-center justify-center p-1 rounded-lg border text-[9px] font-bold ${
                        zone.water_depth_cm < 20 
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700' 
                          : 'bg-slate-100/70 border-slate-200 text-slate-500 line-through opacity-75'
                      }`}>
                        <Bike className="w-3.5 h-3.5 mb-0.5" />
                        <span>2W</span>
                      </div>
                      {/* Car */}
                      <div className={`flex flex-col items-center justify-center p-1 rounded-lg border text-[9px] font-bold ${
                        zone.water_depth_cm < 30 
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700' 
                          : 'bg-slate-100/70 border-slate-200 text-slate-500 line-through opacity-75'
                      }`}>
                        <Car className="w-3.5 h-3.5 mb-0.5" />
                        <span>Car</span>
                      </div>
                      {/* SUV */}
                      <div className={`flex flex-col items-center justify-center p-1 rounded-lg border text-[9px] font-bold ${
                        zone.water_depth_cm < 60 
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700' 
                          : 'bg-rose-50 border-rose-200 text-rose-700'
                      }`}>
                        <Truck className="w-3.5 h-3.5 mb-0.5" />
                        <span>SUV</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inspect Action Button */}
                <button
                  onClick={() => {
                    onSelectZone(zone);
                    onNavigatePage('gis-nowcast');
                  }}
                  className="w-full bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Inspect Live Hydrograph</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CROWDSOURCED CITIZEN GROUND-TRUTH FLOOD FEED (CLEAN LIGHT CARD) */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider">
                GROUND-TRUTH FEED
              </span>
              <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-300">
                CITIZEN TELEMETRY
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
              Live Verified Waterlogging Reports
            </h3>
          </div>

          <button
            onClick={onOpenReportModal}
            className="bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs hover:shadow-md flex items-center gap-2 self-start sm:self-auto group"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>+ Submit Live Flood Photo</span>
          </button>
        </div>

        {citizenReports && citizenReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {citizenReports.slice(0, 3).map((rep, idx) => (
              <div 
                key={rep.report_id || idx} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo with Overlay Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={rep.image_url} 
                    alt={rep.location_name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <div className="bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span>~{rep.water_depth_cm} cm</span>
                    </div>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified Citizen</span>
                    </span>
                  </div>

                  {/* Bottom Time Overlay */}
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[9px] font-mono px-2 py-0.5 rounded-md border border-slate-700/50 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    <span>{rep.timestamp}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{rep.location_name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {rep.description}
                    </p>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className={`font-bold px-2 py-0.5 rounded-md border ${
                        rep.passability === 'BLOCKED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        rep.passability === 'SUVS_ONLY' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {rep.passability === 'BLOCKED' ? '⛔ Blocked' : rep.passability === 'SUVS_ONLY' ? '🚙 SUVs Only' : '✅ Passable'}
                      </span>
                      <span className="text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                        <ThumbsUp className="w-2.5 h-2.5 text-cyan-600" />
                        <span>{rep.upvotes || 28}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigatePage('gis-nowcast')}
                      className="text-[11px] font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group/link"
                    >
                      <span>Map</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-500 font-mono">
            No citizen reports yet for this city. Be the first to submit a photo!
          </div>
        )}
      </section>

      {/* 7. CITIZEN EMERGENCY & SOS DIRECT ACCESS STRIP (HIGH-VISIBILITY RESCUE BANNER) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border border-red-900/60 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>24x7 CITIZEN RESCUE &amp; SOS ASSISTANCE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Stranded in a Flooded Street or Submerged Underpass?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Access direct one-tap dialing for National Emergency 112, NDRF Water Rescue teams, or share your live GPS coordinates with emergency responders instantly.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <button
            onClick={() => onNavigatePage('emergency')}
            className="bg-rose-600 hover:bg-rose-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <PhoneCall className="w-4 h-4 text-white animate-bounce" />
            <span>Open Emergency Center (112 SOS)</span>
          </button>
        </div>
      </section>

    </div>
  );
};
