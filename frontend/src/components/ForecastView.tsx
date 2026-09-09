'use client';

import React from 'react';
import { CloudRain, Clock, TrendingUp, AlertTriangle, Compass, ShieldCheck } from 'lucide-react';
import { NowcastForecastItem } from '@/types';

interface ForecastViewProps {
  forecast: NowcastForecastItem[];
}

export const ForecastView: React.FC<ForecastViewProps> = ({ forecast }) => {
  const defaultForecast: NowcastForecastItem[] = [
    { time_label: 'Now (T+0)', rainfall_mm_hr: 77.8, trend: 'steady', overall_risk: 'HIGH', confidence_score: 0.98 },
    { time_label: '+1 Hour (T+60m)', rainfall_mm_hr: 94.5, trend: 'increasing', overall_risk: 'HIGH', confidence_score: 0.92 },
    { time_label: '+2 Hours (T+120m)', rainfall_mm_hr: 106.6, trend: 'increasing', overall_risk: 'HIGH', confidence_score: 0.85 },
    { time_label: '+3 Hours (T+180m)', rainfall_mm_hr: 71.6, trend: 'decreasing', overall_risk: 'HIGH', confidence_score: 0.76 },
  ];

  const data = forecast && forecast.length > 0 ? forecast : defaultForecast;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Mumbai Doppler Radar & NWP Nowcast Trajectory (0–3h)</h2>
            <p className="text-xs text-blue-100 mt-0.5">
              High-resolution convective cell tracking with optical flow & physics-informed extrapolation
            </p>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">{item.time_label}</span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {Math.round(item.confidence_score * 100)}% Confidence
                </span>
              </div>

              <div className="my-4">
                <div className="text-3xl font-extrabold text-slate-800 flex items-baseline gap-1">
                  <span>{item.rainfall_mm_hr}</span>
                  <span className="text-sm font-normal text-slate-500">mm/hr</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span className="capitalize">{item.trend} Convective Intensity</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Anticipated Risk:</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                {item.overall_risk}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scientific Explanation Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Nowcasting Physics & Doppler Extrapolation Methodology</span>
        </h4>
        <p className="leading-relaxed">
          The 0–3 hour nowcasting model calculates cell advection vectors from Arabian Sea convective storm fronts passing over the Mumbai coast. Surface runoff velocity across Mumbai&apos;s impermeable asphalt matrix is routed through the Mithi River watershed, predicting peak hydraulic surcharging in Hindmata and Kurla West at T+120 minutes.
        </p>
      </div>
    </div>
  );
};
