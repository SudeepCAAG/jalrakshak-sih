'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Play, 
  Pause, 
  Clock, 
  Layers, 
  AlertTriangle, 
  CloudRain, 
  ShieldCheck, 
  Sliders, 
  ChevronRight,
  Info,
  Droplets,
  Waves
} from 'lucide-react';
import { Zone, SystemOverview, NowcastForecastItem } from '@/types';
import { ZoneSummaryTable } from './ZoneSummaryTable';
import { ActiveAlerts } from './ActiveAlerts';

const LiveMap = dynamic(
  () => import('@/components/LiveMap').then((mod) => mod.LiveMap),
  { ssr: false }
);

interface StreetGISNowcastViewProps {
  zones: Zone[];
  overview: SystemOverview | null;
  forecast: NowcastForecastItem[];
  alerts: any[];
  onSelectZone: (zone: Zone) => void;
  onApplySimulationMultiplier?: (mult: number) => void;
  citizenReports?: any[];
}

const TIME_STEPS = [
  { label: 'Now (T+0)', leadMin: 0, rainMult: 1.0, icon: Clock },
  { label: '+30 Min', leadMin: 30, rainMult: 1.12, icon: CloudRain },
  { label: '+1 Hour', leadMin: 60, rainMult: 1.28, icon: CloudRain },
  { label: '+1.5 Hours', leadMin: 90, rainMult: 1.45, icon: Waves },
  { label: '+2 Hours (Peak)', leadMin: 120, rainMult: 1.50, icon: AlertTriangle },
  { label: '+2.5 Hours', leadMin: 150, rainMult: 1.20, icon: CloudRain },
  { label: '+3 Hours', leadMin: 180, rainMult: 0.85, icon: Clock },
];

export const StreetGISNowcastView: React.FC<StreetGISNowcastViewProps> = ({
  zones,
  overview,
  forecast,
  alerts,
  onSelectZone,
  onApplySimulationMultiplier,
  citizenReports
}) => {
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = TIME_STEPS[selectedStepIdx];

  // Auto-play 0-3h timeline scrub
  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setSelectedStepIdx((prev) => {
          const next = (prev + 1) % TIME_STEPS.length;
          if (onApplySimulationMultiplier) {
            onApplySimulationMultiplier(TIME_STEPS[next].rainMult);
          }
          return next;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, onApplySimulationMultiplier]);

  const handleStepClick = (idx: number) => {
    setSelectedStepIdx(idx);
    setIsPlaying(false);
    if (onApplySimulationMultiplier) {
      onApplySimulationMultiplier(TIME_STEPS[idx].rainMult);
    }
  };

  // Dynamically scale water depth based on selected time horizon
  const projectedZones = zones.map((z) => {
    const mult = currentStep.rainMult;
    const projectedDepth = Math.round(z.water_depth_cm * mult * 10) / 10;
    return {
      ...z,
      rainfall_mm_hr: Math.round(z.rainfall_mm_hr * mult * 10) / 10,
      water_depth_cm: projectedDepth
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Time Scrub Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-black text-stone-900">
                Street-Level Dynamic GIS Nowcasting (0–3h Window)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {overview?.city_name || 'Mumbai'} Metro
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Coupling 2D surface terrain runoff with 1D underground stormwater pipe capacity. Drag or play the timeline to see water rise before it hits streets.
            </p>
          </div>

          {/* Play/Pause Control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              isPlaying
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Scrub</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simulate 0–3h Nowcast</span>
              </>
            )}
          </button>
        </div>

        {/* 0-3h Interactive Time Scrub Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Forecast Lead Time: <strong>{currentStep.label}</strong></span>
            </span>
            <span className="text-stone-500 text-[11px]">
              Radar Convective Intensity Factor: <strong className="text-blue-700">{currentStep.rainMult}x</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
            {TIME_STEPS.map((step, idx) => {
              const isSelected = selectedStepIdx === idx;
              const StepIcon = step.icon;
              return (
                <button
                  key={step.label}
                  onClick={() => handleStepClick(idx)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/30'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100/80'
                  }`}
                >
                  <StepIcon className={`w-3.5 h-3.5 mx-auto mb-1 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                  <div className="text-[11px] font-black">{step.label}</div>
                  <div className={`text-[9px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-stone-400'}`}>
                    {step.rainMult}x Rain
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Full-Width GIS Map View */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-stone-800">
              Live Surcharge Backflow Map &bull; Pinpoint Water Depth in Centimeters
            </span>
          </div>
          <span className="text-[11px] text-stone-500">
            Click any pin to inspect manhole inlets and DEM elevation
          </span>
        </div>

        <div className="h-[580px] rounded-2xl overflow-hidden border border-stone-200">
          <LiveMap
            zones={projectedZones}
            onSelectZone={onSelectZone}
            citizenReports={citizenReports}
          />
        </div>
      </div>

      {/* Bottom Row: Active Warnings and Ward Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <ActiveAlerts
            alerts={alerts}
            onOpenAllAlerts={() => {}}
            onSelectZoneId={() => {}}
          />
        </div>

        <div className="lg:col-span-7">
          <ZoneSummaryTable
            zones={projectedZones}
            onSelectZone={onSelectZone}
          />
        </div>
      </div>
    </div>
  );
};
