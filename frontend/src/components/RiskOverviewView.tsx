'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Mountain, Droplets, Activity } from 'lucide-react';
import { Zone, SystemOverview } from '@/types';

interface RiskOverviewViewProps {
  zones: Zone[];
  overview?: SystemOverview | null;
  onSelectZone: (zone: Zone) => void;
}

export const RiskOverviewView: React.FC<RiskOverviewViewProps> = ({
  zones,
  overview,
  onSelectZone,
}) => {
  const highRisk = zones.filter((z) => z.risk_level === 'HIGH');
  const medRisk = zones.filter((z) => z.risk_level === 'MEDIUM');
  const lowRisk = zones.filter((z) => z.risk_level === 'LOW');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Mumbai Metro Flood Risk & Inundation Matrix</h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Coupled Hydrodynamic Surface Topography (DEM) vs. Subsurface Stormwater Discharge Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Severity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* High Risk Category */}
        <div className="bg-white rounded-xl border border-red-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-red-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <h3 className="text-sm font-bold text-red-700">Critical / High Risk ({highRisk.length})</h3>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              Score &ge; 70
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {highRisk.map((z) => (
              <div
                key={z.zone_id}
                onClick={() => onSelectZone(z)}
                className="p-3 bg-red-50/50 hover:bg-red-50 border border-red-200/80 rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{z.zone_name}</span>
                  <span className="text-xs font-extrabold text-red-600">{z.risk_score}/100</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Rain: <strong>{z.rainfall_mm_hr} mm/hr</strong></span>
                  <span>Water Depth: <strong className="text-blue-700">{z.water_depth_cm} cm</strong></span>
                  <span>DEM: <strong>{z.elevation_m}m</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Risk Category */}
        <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <h3 className="text-sm font-bold text-amber-700">Moderate Risk ({medRisk.length})</h3>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Score 35–69
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {medRisk.map((z) => (
              <div
                key={z.zone_id}
                onClick={() => onSelectZone(z)}
                className="p-3 bg-amber-50/50 hover:bg-amber-50 border border-amber-200/80 rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{z.zone_name}</span>
                  <span className="text-xs font-extrabold text-amber-600">{z.risk_score}/100</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Rain: <strong>{z.rainfall_mm_hr} mm/hr</strong></span>
                  <span>Water Depth: <strong className="text-blue-700">{z.water_depth_cm} cm</strong></span>
                  <span>DEM: <strong>{z.elevation_m}m</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Risk Category */}
        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-bold text-emerald-700">Optimal / Low Risk ({lowRisk.length})</h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Score &lt; 35
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {lowRisk.map((z) => (
              <div
                key={z.zone_id}
                onClick={() => onSelectZone(z)}
                className="p-3 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/80 rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{z.zone_name}</span>
                  <span className="text-xs font-extrabold text-emerald-600">{z.risk_score}/100</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Rain: <strong>{z.rainfall_mm_hr} mm/hr</strong></span>
                  <span>Water Depth: <strong className="text-blue-700">{z.water_depth_cm} cm</strong></span>
                  <span>DEM: <strong>{z.elevation_m}m</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
