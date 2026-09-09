'use client';

import React from 'react';
import { X, ShieldAlert, Droplets, Mountain, Activity, Building2, CheckCircle2 } from 'lucide-react';
import { Zone } from '@/types';

interface ZoneDetailModalProps {
  zone: Zone | null;
  onClose: () => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({ zone, onClose }) => {
  if (!zone) return null;

  const isHigh = zone.risk_level === 'HIGH';
  const isMed = zone.risk_level === 'MEDIUM';

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black ${
                isHigh
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : isMed
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              {zone.zone_id}
            </span>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">{zone.zone_name}</h3>
              <p className="text-xs text-stone-500 font-medium">Hydrodynamic Simulation & Inundation Diagnostics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Hydraulic Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
            <Droplets className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <div className="text-[10px] text-stone-500 font-bold uppercase">Precipitation</div>
            <div className="text-base font-extrabold text-stone-900">{zone.rainfall_mm_hr} mm/hr</div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
            <Mountain className="w-4 h-4 text-stone-600 mx-auto mb-1" />
            <div className="text-[10px] text-stone-500 font-bold uppercase">DEM Elevation</div>
            <div className="text-base font-extrabold text-stone-900">{zone.elevation_m} m MSL</div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
            <Activity className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <div className="text-[10px] text-stone-500 font-bold uppercase">Drain Capacity</div>
            <div className="text-base font-extrabold text-stone-900">{zone.drainage_capacity_mm_hr} mm/hr</div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
            <ShieldAlert className={`w-4 h-4 mx-auto mb-1 ${isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600'}`} />
            <div className="text-[10px] text-stone-500 font-bold uppercase">Est. Water Depth</div>
            <div className="text-base font-black text-blue-700">{zone.water_depth_cm} cm</div>
          </div>
        </div>

        {/* BMC Municipal Advisory */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950 mb-1.5">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>BMC Disaster Control Advisory & Surcharge Analysis:</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {zone.ai_advisory}
          </p>
        </div>

        {/* Connected Inlets & Dewatering Pumps */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-xs">
          <div className="font-bold text-stone-800 mb-2">Connected Stormwater Inlets & Outfalls:</div>
          <div className="flex flex-wrap gap-2">
            {zone.critical_inlets.map((inlet, idx) => (
              <span key={idx} className="bg-white border border-stone-200/90 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold text-stone-700 shadow-2xs">
                {inlet}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-2xl transition"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
