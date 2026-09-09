'use client';

import React from 'react';
import { Clock, CloudRain, ChevronRight, Compass } from 'lucide-react';
import { NowcastForecastItem } from '@/types';

interface NowcastForecastProps {
  forecast: NowcastForecastItem[];
  onOpenDetailedForecast?: () => void;
}

export const NowcastForecast: React.FC<NowcastForecastProps> = ({
  forecast,
  onOpenDetailedForecast,
}) => {
  const defaultForecast: NowcastForecastItem[] = [
    { time_label: 'Now (T+0)', rainfall_mm_hr: 45.7, trend: 'steady', overall_risk: 'MEDIUM', confidence_score: 0.98 },
    { time_label: '+1 Hour (T+60m)', rainfall_mm_hr: 55.5, trend: 'increasing', overall_risk: 'MEDIUM', confidence_score: 0.92 },
    { time_label: '+2 Hours (T+120m)', rainfall_mm_hr: 62.6, trend: 'increasing', overall_risk: 'HIGH', confidence_score: 0.85 },
    { time_label: '+3 Hours (T+180m)', rainfall_mm_hr: 42.0, trend: 'decreasing', overall_risk: 'MEDIUM', confidence_score: 0.76 },
  ];

  const data = forecast && forecast.length > 0 ? forecast : defaultForecast;

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'LOW':
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs font-bold text-stone-900 tracking-tight">
              Doppler Radar Nowcast (0–3h Window)
            </h2>
          </div>
          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            IMD Extrapolation
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-stone-500 border-b border-stone-100 font-semibold text-[11px]">
                <th className="pb-2">Time Horizon</th>
                <th className="pb-2 text-center">Rainfall</th>
                <th className="pb-2 text-center">Trajectory</th>
                <th className="pb-2 text-right">Inundation Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition">
                  <td className="py-2.5 font-bold text-stone-800">{item.time_label}</td>
                  <td className="py-2.5 text-center font-extrabold text-stone-900">
                    {item.rainfall_mm_hr} <span className="text-[10px] text-stone-400 font-normal">mm/hr</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <CloudRain className="w-4 h-4 text-amber-600 inline-block animate-bounce" />
                  </td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getRiskBadge(
                        item.overall_risk
                      )}`}
                    >
                      {item.overall_risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <button
        onClick={onOpenDetailedForecast}
        className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-50/60 rounded-xl transition w-full py-1.5"
      >
        <span>Inspect Convective Cell Graphs & Radar Profile</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
