'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, Map, CloudRain, ShieldAlert, Waves } from 'lucide-react';
import { SystemOverview } from '@/types';

interface MetricCardsProps {
  overview?: SystemOverview | null;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ overview }) => {
  const cityName = overview?.city_name || 'Urban Metro';
  const highZones = overview?.high_risk_zones ?? 2;
  const highPct = overview?.high_risk_percentage ?? 33;
  
  const medZones = overview?.medium_risk_zones ?? 2;
  const medPct = overview?.medium_risk_percentage ?? 33;
  
  const lowZones = overview?.low_risk_zones ?? 2;
  const lowPct = overview?.low_risk_percentage ?? 34;
  
  const totalZones = overview?.total_zones ?? 6;
  const avgRain = overview?.avg_rainfall_now ?? 42.5;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-4">
      {/* 1. Submerged Roads (Avoid) */}
      <div className="bg-white rounded-2xl border border-rose-200 p-3.5 shadow-2xs flex items-center justify-between hover:border-rose-300 transition group">
        <div>
          <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
            Submerged Roads
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{highZones} Hotspots</div>
          <div className="text-[11px] text-rose-600 font-medium mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block"></span>
            <span>Closed to light vehicles</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-105 transition">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Waterlogged Corridors */}
      <div className="bg-white rounded-2xl border border-amber-200 p-3.5 shadow-2xs flex items-center justify-between hover:border-amber-300 transition group">
        <div>
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
            Waterlogged Corridors
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{medZones} Hotspots</div>
          <div className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
            <span>Drive with caution</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Completely Safe Corridors */}
      <div className="bg-white rounded-2xl border border-emerald-200 p-3.5 shadow-2xs flex items-center justify-between hover:border-emerald-300 transition group">
        <div>
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
            Dry / Safe Routes
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{lowZones} Corridors</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Normal traffic flow</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Total Monitored Hotspots */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-2xs flex items-center justify-between hover:border-blue-200 transition group">
        <div>
          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wide">
            {cityName}
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{totalZones} Points</div>
          <div className="text-[11px] text-stone-500 font-medium mt-0.5">
            Live Topographic DEM mesh
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:scale-105 transition">
          <Map className="w-5 h-5" />
        </div>
      </div>

      {/* 5. Live Rainfall Intensity */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-2xs flex items-center justify-between hover:border-blue-200 transition group col-span-2 md:col-span-1">
        <div>
          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wide">
            Radar Rainfall
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{avgRain} <span className="text-xs font-bold text-stone-500">mm/hr</span></div>
          <div className="text-[11px] text-stone-500 font-medium mt-0.5">
            Live IMD &bull; ECMWF Ensemble
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-105 transition">
          <CloudRain className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
