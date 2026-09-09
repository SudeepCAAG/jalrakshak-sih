'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  Train, 
  Bus, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Zone, SystemOverview } from '@/types';
import { CitizenNavPanel } from './CitizenNavPanel';
import { TransitImpactBar } from './TransitImpactBar';

const LiveMap = dynamic(
  () => import('@/components/LiveMap').then((mod) => mod.LiveMap),
  { ssr: false }
);

interface CitizenSafeNavViewProps {
  zones: Zone[];
  overview: SystemOverview | null;
  selectedCity: string;
  onSelectZone: (zone: Zone) => void;
}

export const CitizenSafeNavView: React.FC<CitizenSafeNavViewProps> = ({
  zones,
  overview,
  selectedCity,
  onSelectZone
}) => {
  const [activeRoute, setActiveRoute] = useState<any>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 shadow-md border border-blue-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs mb-2">
              <Navigation className="w-3.5 h-3.5 text-sky-300" />
              <span>Google Maps-Grade Inundation Routing Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Citizen &amp; Emergency Flood-Safe Navigator
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl mt-1">
              Never get your car submerged in a flooded railway underpass or depression. 
              Our routing algorithm calculates safe elevated bypass corridors using digital elevation contours.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 text-xs space-y-1 shrink-0">
            <div className="text-[10px] uppercase font-bold text-sky-300">City Helpline Assistance</div>
            <div className="text-base font-black text-white">{overview?.helpline || '112 National Disaster'}</div>
            <div className="text-[10px] text-blue-200">24x7 Emergency Traffic Desk</div>
          </div>
        </div>
      </div>

      {/* Transit Impact Bar */}
      <TransitImpactBar overview={overview} selectedCity={selectedCity} />

      {/* Main Navigation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Floating Navigation Direction Card (4 cols) */}
        <div className="lg:col-span-4 w-full">
          <CitizenNavPanel
            selectedCity={selectedCity}
            zones={zones}
            onApplyRoute={(route) => setActiveRoute(route)}
            onClearRoute={() => setActiveRoute(null)}
            activeRoute={activeRoute}
          />
        </div>

        {/* Right: Map with Route Polyline (8 cols) */}
        <div className="lg:col-span-8 w-full bg-white rounded-3xl p-3 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between px-2 pt-1 text-xs">
            <span className="font-bold text-stone-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Inundation Safe-Path Map</span>
            </span>
            <span className="text-[11px] text-stone-500">
              {activeRoute ? 'Showing Recommended Safe Bypass (Green) vs Submerged Route (Red)' : 'Enter Origin and Destination to plot safe route'}
            </span>
          </div>

          <div className="h-[540px] rounded-2xl overflow-hidden border border-stone-200">
            <LiveMap
              zones={zones}
              onSelectZone={onSelectZone}
              activeRoute={activeRoute}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
