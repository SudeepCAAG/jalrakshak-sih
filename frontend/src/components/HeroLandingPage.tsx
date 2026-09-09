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
  Truck
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
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-mono font-bold tracking-wider shrink-0 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
            LIVE TELEMETRY
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-ticker text-xs font-medium text-slate-600">
              <span className="mr-8 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-cyan-600" />
                <strong className="text-slate-900">IMD Doppler DWR {currentCityMeta.name}:</strong> 15-min volume scan active • Precip rate ~{overview?.current_weather?.rainfall_rate_mm_hr || 38.5} mm/h
              </span>
              <span className="mr-8 flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 text-emerald-600" />
                <strong className="text-slate-900">Municipal Drainage:</strong> Dewatering Sump Pumps running at 100% capacity
              </span>
              <span className="mr-8 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <strong className="text-slate-900">High Risk Hotspots:</strong> {zones.filter(z => z.risk_level === 'HIGH').length} underpasses flagged for severe bowl accumulation
              </span>
              <span className="mr-8 flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-blue-600" />
                <strong className="text-slate-900">AI Safe Navigation:</strong> Elevated road bypass engine active with 0–3h lookahead
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO COCKPIT & 3D CITY RADAR FRAME */}
      <section className="relative pt-1 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Clean Typography & Search / Safe Route Cockpit */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Mission Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 shadow-xs text-[10px] sm:text-xs font-semibold">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-600"></span>
                <span className="text-slate-600 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">MoES &amp; NDMA INITIATIVE</span>
                <span className="text-slate-300">|</span>
                <span className="text-amber-800 font-bold truncate max-w-[150px] sm:max-w-none">{t.tagline}</span>
              </div>

              {/* Master Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-tight sm:leading-[1.14]">
                {t.heroHeadline1}{' '}
                <span className="text-blue-700">
                  {t.heroHeadlineHighlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {t.heroDescription}
              </p>

              {/* Dual Hero Action Buttons (Inspired by Reference Layout) */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1">
                <button
                  onClick={() => onNavigatePage('safe-nav')}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(245,158,11,0.35)] transition-all active:scale-98 flex items-center justify-center gap-2 border border-white/30"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span className="uppercase tracking-wide font-extrabold">{t.planSafeRoute}</span>
                </button>

                <button
                  onClick={() => onNavigatePage('gis-nowcast')}
                  className="flex-1 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="uppercase tracking-wide font-extrabold">{t.checkStreetStatus}</span>
                </button>
              </div>
            </div>

            {/* Interactive Street Status & Route Planning Cockpit Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-3.5 sm:p-5 space-y-3 sm:space-y-4">
              {/* Dual Tab Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl text-xs font-semibold">
                <button
                  onClick={() => setHeroSearchTab('status')}
                  className={`flex-1 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition text-[11px] sm:text-xs ${
                    heroSearchTab === 'status'
                      ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t.checkStreetStatus}</span>
                </button>
                <button
                  onClick={() => setHeroSearchTab('route')}
                  className={`flex-1 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition text-[11px] sm:text-xs ${
                    heroSearchTab === 'route'
                      ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.planSafeRoute}</span>
                </button>
              </div>

              {heroSearchTab === 'status' && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 text-xs font-medium text-slate-900 bg-slate-50/60 placeholder:text-slate-400 transition"
                    />
                  </div>

                  {selectedSearchedZone && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5 sm:space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                            <span>{selectedSearchedZone.zone_name}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            DEM Elevation: {selectedSearchedZone.elevation_m}m MSL • Zone ID: {selectedSearchedZone.zone_id}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md inline-block ${
                            selectedSearchedZone.water_depth_cm > 50 ? 'bg-rose-600 text-white' :
                            selectedSearchedZone.water_depth_cm > 25 ? 'bg-amber-500 text-white' :
                            'bg-emerald-600 text-white'
                          }`}>
                            ~{selectedSearchedZone.water_depth_cm.toFixed(1)} cm
                          </span>
                        </div>
                      </div>

                      {/* Vehicle Passability Matrix with SVG Icons */}
                      <div className="grid grid-cols-4 gap-1 sm:gap-1.5 pt-1">
                        <div className={`p-1 sm:p-1.5 rounded-lg border text-center text-[9px] sm:text-[10px] ${
                          selectedSearchedZone.water_depth_cm < 15 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Footprints className="w-3 h-3" />
                            <span className="hidden xs:inline">Walk</span>
                          </div>
                          <div className="text-[8px] sm:text-[9px] font-bold">{selectedSearchedZone.water_depth_cm < 15 ? 'Safe' : 'Unsafe'}</div>
                        </div>

                        <div className={`p-1 sm:p-1.5 rounded-lg border text-center text-[9px] sm:text-[10px] ${
                          selectedSearchedZone.water_depth_cm < 20 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Bike className="w-3 h-3" />
                            <span className="hidden xs:inline">Bike</span>
                          </div>
                          <div className="text-[8px] sm:text-[9px] font-bold">{selectedSearchedZone.water_depth_cm < 20 ? 'Pass' : 'Stall'}</div>
                        </div>

                        <div className={`p-1 sm:p-1.5 rounded-lg border text-center text-[9px] sm:text-[10px] ${
                          selectedSearchedZone.water_depth_cm < 30 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Car className="w-3 h-3" />
                            <span className="hidden xs:inline">Sedan</span>
                          </div>
                          <div className="text-[8px] sm:text-[9px] font-bold">{selectedSearchedZone.water_depth_cm < 30 ? 'Slow' : 'No'}</div>
                        </div>

                        <div className={`p-1 sm:p-1.5 rounded-lg border text-center text-[9px] sm:text-[10px] ${
                          selectedSearchedZone.water_depth_cm < 60 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>SUV</span>
                          </div>
                          <div className="text-[9px] font-bold">{selectedSearchedZone.water_depth_cm < 60 ? 'Clear' : 'Submerged'}</div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-700 font-medium bg-white p-2.5 rounded-xl border border-slate-200">
                        {selectedSearchedZone.ai_advisory}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onSelectZone(selectedSearchedZone);
                            onNavigatePage('gis-nowcast');
                          }}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Street GIS Scan</span>
                        </button>
                        <button
                          onClick={() => onNavigatePage('safe-nav')}
                          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>{t.viewSafeRoute}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {heroSearchTab === 'route' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span>AI Inundation Avoidance Algorithm</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our physics-guided engine reroutes vehicles away from hydraulic depressions, underpasses, and drainage sumps onto elevated bridges and flyovers.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigatePage('safe-nav')}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Launch Pan-India Safe Navigation Map</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
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

      {/* 4. PHYSICS-GUIDED TECHNOLOGICAL PILLARS (CLEAN WHITE CARDS) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-widest">
            HYDRAULIC &amp; AI ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {t.corePillarsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.corePillarsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Doppler Radar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200">
                <Radio className="w-6 h-6" />
              </div>
              <div className="font-mono text-[11px] text-cyan-700 font-bold uppercase">Layer 01</div>
              <h3 className="font-bold text-base text-slate-900">Doppler Radar NWP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Captures high-resolution rainfall nowcasts at 15-minute intervals, predicting rain clouds before precipitation hits the ground.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-cyan-700 font-bold flex items-center justify-between">
              <span>0–3h Forward Lookahead</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: 30m Micro-DEM */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/50 transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                <Compass className="w-6 h-6" />
              </div>
              <div className="font-mono text-[11px] text-blue-700 font-bold uppercase">Layer 02</div>
              <h3 className="font-bold text-base text-slate-900">30m Micro-DEM Sump</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses Digital Elevation Models to compute micro-watershed depressions where water naturally collects into high-risk bowl zones.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-blue-700 font-bold flex items-center justify-between">
              <span>Centimeter Depth Gauge</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: 1D/2D Underground Graph */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-500/50 transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                <Layers className="w-6 h-6" />
              </div>
              <div className="font-mono text-[11px] text-amber-700 font-bold uppercase">Layer 03</div>
              <h3 className="font-bold text-base text-slate-900">Hydrodynamic Pipes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Models underground stormwater pipes, culverts, and dewatering pump stations using Manning-Strickler hydrodynamic equations.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-amber-700 font-bold flex items-center justify-between">
              <span>Pipe Surcharge Detection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: AI Safe Navigator */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <Bot className="w-6 h-6" />
              </div>
              <div className="font-mono text-[11px] text-emerald-700 font-bold uppercase">Layer 04</div>
              <h3 className="font-bold text-base text-slate-900">AI Safe Navigator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates elevated alternate routes and answers citizen emergency questions using intelligent routing AI, avoiding stalled vehicles.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-emerald-700 font-bold flex items-center justify-between">
              <span>Zero Stalled Vehicles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. MONITORED URBAN UNDERPASSES & BOWL ZONES GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                HYDROGRAPH TELEMETRY
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                {currentCityMeta.name} Region
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Monitored Urban Underpasses &amp; Depressions
            </h2>
          </div>
          <button
            onClick={() => onNavigatePage('gis-nowcast')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>View All Zones on Full GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {zones.slice(0, 4).map((zone) => (
            <div 
              key={zone.zone_id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                  {zone.zone_id}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  zone.water_depth_cm > 50 ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  zone.water_depth_cm > 25 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {zone.citizen_water_level}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900">{zone.zone_name}</h4>
                <div className="flex items-center justify-between text-xs mt-1.5 text-slate-500 font-mono">
                  <span>Water Depth:</span>
                  <span className={`font-bold ${zone.water_depth_cm > 25 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    ~{zone.water_depth_cm.toFixed(1)} cm
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Elevation:</span>
                  <span className="font-medium text-slate-800">{zone.elevation_m}m MSL</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-snug bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{zone.ai_advisory}"
              </p>

              <button
                onClick={() => {
                  onSelectZone(zone);
                  onNavigatePage('gis-nowcast');
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Inspect on Live Map</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CROWDSOURCED CITIZEN GROUND-TRUTH FLOOD FEED (CLEAN LIGHT CARD) */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider">
                GROUND-TRUTH FEED
              </span>
              <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-300">
                CITIZEN TELEMETRY
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Live Verified Waterlogging Reports
            </h3>
          </div>

          <button
            onClick={onOpenReportModal}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>+ Submit Live Flood Photo</span>
          </button>
        </div>

        {citizenReports && citizenReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citizenReports.slice(0, 3).map((rep, idx) => (
              <div key={rep.report_id || idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200">
                  <img src={rep.image_url} alt={rep.location_name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>~{rep.water_depth_cm} cm</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[9px] font-mono px-2 py-0.5 rounded-md">
                    {rep.timestamp}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-cyan-600 shrink-0" />
                    <span>{rep.location_name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                    {rep.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200 font-mono">
                  <span>By: {rep.reporter_name}</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    rep.passability === 'BLOCKED' ? 'bg-rose-100 text-rose-800' :
                    rep.passability === 'SUVS_ONLY' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rep.passability === 'BLOCKED' ? 'Blocked' : rep.passability === 'SUVS_ONLY' ? 'SUVs Only' : 'Passable'}
                  </span>
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

      {/* 7. CITIZEN EMERGENCY & SOS DIRECT ACCESS STRIP (CLEAN WARM ROSE BANNER) */}
      <section className="bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border border-rose-200 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-mono font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
            <span>24x7 CITIZEN SAFETY ASSURANCE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Stranded in a Flooded Street or Submerged Underpass?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Access direct one-tap dialing for National Emergency 112, NDRF Water Rescue, or share your live GPS coordinates with emergency responders.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigatePage('emergency')}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-md transition flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-white animate-bounce" />
            <span>Open Emergency Center (112 SOS)</span>
          </button>
        </div>
      </section>

    </div>
  );
};
