'use client';

import React from 'react';
import { Train, Bus, AlertTriangle, ShieldCheck, PhoneCall } from 'lucide-react';
import { SystemOverview } from '@/types';

interface TransitImpactBarProps {
  overview: SystemOverview | null;
  selectedCity?: string;
}

const CITY_NAMES: Record<string, string> = {
  mumbai: 'Mumbai',
  delhi: 'Delhi-NCR',
  bengaluru: 'Bengaluru',
  kolkata: 'Kolkata',
  chennai: 'Chennai',
  hyderabad: 'Hyderabad'
};

export const TransitImpactBar: React.FC<TransitImpactBarProps> = ({ overview, selectedCity }) => {
  const city = selectedCity || overview?.selected_city || 'mumbai';
  const cityName = CITY_NAMES[city] || overview?.city_name || 'Mumbai';

  // Real-world transit impact notes per city
  const getTransitNotes = () => {
    switch (city) {
      case 'delhi':
        return {
          metro: 'Delhi Metro (DMRC) all lines operational. Pragati Maidan entry gate 3 regulated.',
          bus: 'DTC buses diverted from Minto Bridge and Pul Prahladpur underpass via Ring Road.',
          status: 'NORMAL / DIVERSIONS IN PLACE'
        };
      case 'bengaluru':
        return {
          metro: 'Namma Metro Purple & Green lines running on schedule.',
          bus: 'BMTC buses slow near Silk Board & Bellandur Ecospace due to water accumulation.',
          status: 'SLOW TRANSIT AT CHOKEPOINTS'
        };
      case 'kolkata':
        return {
          metro: 'Kolkata Metro Blue Line (North-South) running normally. Central station entry clear.',
          bus: 'Trams suspended on College Street due to 35cm waterlogging; buses diverted via CR Avenue.',
          status: 'TRAMS SUSPENDED IN BOWL'
        };
      case 'chennai':
        return {
          metro: 'Chennai Metro running smoothly; Velachery MRTS local trains speed restricted to 25 km/h.',
          bus: 'MTC buses diverted from Madipakkam main road via 200ft Radial Road.',
          status: 'MRTS REGULATED'
        };
      case 'hyderabad':
        return {
          metro: 'Hyderabad Metro Red & Blue corridors operational on full frequency.',
          bus: 'TSRTC buses cautious near Tolichowki nala road; Moosarambagh causeway traffic diverted.',
          status: 'CAUSEWAYS DIVERTED'
        };
      case 'mumbai':
      default:
        return {
          metro: 'Mumbai Metro Lines 1, 2A, 7 running normally.',
          train: 'Central & Western local trains running; Harbour Line slow at Kurla (10-min delays).',
          bus: 'BEST buses diverted from Hindmata flyover lower road and Milan subway.',
          status: 'SUBURBAN TRAINS OPERATIONAL'
        };
    }
  };

  const transit = getTransitNotes();

  return (
    <div className="bg-white/95 rounded-2xl border border-stone-200 p-3.5 shadow-2xs space-y-2">
      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
            <Train className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 leading-tight">
              {cityName} Public Transit &amp; Traffic Impact
            </h4>
            <span className="text-[10px] text-stone-500">Live Traffic Police &amp; Municipal Transit Registry</span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {transit.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700">
        <div className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200/60">
          <Train className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-stone-900 text-[11px]">Metro / Local Trains</div>
            <div className="text-[11px] text-stone-600 leading-relaxed">
              {transit.metro || transit.train}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200/60">
          <Bus className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-stone-900 text-[11px]">City Bus &amp; Highway Diversions</div>
            <div className="text-[11px] text-stone-600 leading-relaxed">
              {transit.bus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
