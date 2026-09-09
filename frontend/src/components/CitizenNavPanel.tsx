'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { 
  Navigation, 
  MapPin, 
  Car, 
  Bike, 
  Bus, 
  Footprints, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Zone } from '@/types';
import { API_BASE_URL } from '@/utils/apiConfig';

interface CitizenNavPanelProps {
  selectedCity: string;
  zones: Zone[];
  onApplyRoute: (routeData: any) => void;
  onClearRoute: () => void;
  activeRoute: any;
}

export const CitizenNavPanel: React.FC<CitizenNavPanelProps> = ({
  selectedCity,
  zones,
  onApplyRoute,
  onClearRoute,
  activeRoute
}) => {
  const [startZone, setStartZone] = useState<string>(zones[0]?.zone_id || '');
  const [destZone, setDestZone] = useState<string>(zones[zones.length - 1]?.zone_id || '');
  const [vehicle, setVehicle] = useState<string>('four_wheeler');
  const [loading, setLoading] = useState(false);
  const [selectedRouteTab, setSelectedRouteTab] = useState<'safe' | 'direct'>('safe');

  // Ensure default zones are selected when city changes
  React.useEffect(() => {
    if (zones && zones.length > 0) {
      setStartZone(zones[0].zone_id);
      setDestZone(zones[zones.length - 1].zone_id);
    }
  }, [zones]);

  const handleCalculateRoute = async () => {
    if (!startZone || !destZone) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/safe-route`, {
        city: selectedCity,
        start_zone_id: startZone,
        dest_zone_id: destZone,
        vehicle_type: vehicle
      });
      onApplyRoute(res.data);
    } catch (e) {
      console.warn('Routing API fallback:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-lg p-4 w-full md:w-96 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-blue-600 text-white shadow-xs">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-stone-900 leading-tight">
              Flood-Safe Navigation
            </h3>
            <p className="text-[10px] text-stone-500">Google Maps-Style Inundation Bypass</p>
          </div>
        </div>

        {activeRoute && (
          <button
            onClick={onClearRoute}
            className="text-[11px] text-stone-500 hover:text-stone-800 underline"
          >
            Clear Route
          </button>
        )}
      </div>

      {/* Origin & Destination Inputs */}
      <div className="space-y-2.5">
        {/* Origin */}
        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200/80">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100 shrink-0 ml-1"></span>
          <div className="flex-1">
            <label className="text-[9px] font-bold text-stone-400 block uppercase tracking-wider">
              From (Start Location)
            </label>
            <select
              value={startZone}
              onChange={(e) => setStartZone(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-hidden"
            >
              {zones.map((z) => (
                <option key={`start-${z.zone_id}`} value={z.zone_id}>
                  {z.zone_name} {z.water_depth_cm > 25 ? `(~${z.water_depth_cm}cm water)` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200/80">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-4 ring-rose-100 shrink-0 ml-1"></span>
          <div className="flex-1">
            <label className="text-[9px] font-bold text-stone-400 block uppercase tracking-wider">
              To (Destination)
            </label>
            <select
              value={destZone}
              onChange={(e) => setDestZone(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-hidden"
            >
              {zones.map((z) => (
                <option key={`dest-${z.zone_id}`} value={z.zone_id}>
                  {z.zone_name} {z.water_depth_cm > 25 ? `(~${z.water_depth_cm}cm water)` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Type Switcher */}
      <div>
        <label className="text-[10px] font-bold text-stone-500 block mb-1.5 uppercase tracking-wider">
          Mode of Travel
        </label>
        <div className="grid grid-cols-4 gap-1.5 bg-stone-100 p-1 rounded-xl">
          {[
            { id: 'four_wheeler', label: 'Car', icon: Car },
            { id: 'two_wheeler', label: 'Bike', icon: Bike },
            { id: 'bus_emergency', label: 'Bus', icon: Bus },
            { id: 'walking', label: 'Walk', icon: Footprints },
          ].map((v) => {
            const Icon = v.icon;
            const isSelected = vehicle === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setVehicle(v.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-bold transition ${
                  isSelected 
                    ? 'bg-white text-blue-700 shadow-2xs' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCalculateRoute}
        disabled={loading || startZone === destZone}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Calculating Flood-Free Corridors...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Find Flood-Safe Route</span>
          </>
        )}
      </button>

      {/* Route Results Comparison Cards (When route is active) */}
      {activeRoute && (
        <div className="space-y-2.5 pt-2 border-t border-stone-100">
          <div className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
            Available Route Options
          </div>

          {/* Option 1: Flood-Safe Route */}
          <div 
            onClick={() => setSelectedRouteTab('safe')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedRouteTab === 'safe'
                ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400/20'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Recommended: Flood-Safe
              </span>
              <span className="text-xs font-black text-stone-900">
                {activeRoute.flood_safe_route?.estimated_time_min} min
              </span>
            </div>
            <div className="text-xs font-bold text-stone-800">
              Via Elevated Bypass &bull; {activeRoute.flood_safe_route?.total_distance_km} km
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              {activeRoute.flood_safe_route?.safety_verdict}
            </p>
          </div>

          {/* Option 2: Direct Hazardous Route */}
          <div 
            onClick={() => setSelectedRouteTab('direct')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedRouteTab === 'direct'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-400/20'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-rose-800 bg-rose-100/90 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                Direct Path (Hazardous)
              </span>
              <span className="text-xs font-bold text-stone-700">
                {activeRoute.normal_direct_route?.estimated_time_min} min
              </span>
            </div>
            <div className="text-xs font-semibold text-stone-800">
              Shortest Distance &bull; {activeRoute.normal_direct_route?.total_distance_km} km
            </div>
            <p className="text-[11px] text-rose-700 mt-1">
              {activeRoute.normal_direct_route?.safety_verdict}
            </p>
          </div>

          {/* Turn-by-Turn Preview */}
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 flex items-center gap-1">
              <span>Turn-by-turn Advisory:</span>
            </div>
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
              {(selectedRouteTab === 'safe' 
                ? activeRoute.flood_safe_route?.turn_by_turn 
                : activeRoute.normal_direct_route?.turn_by_turn
              )?.map((step: any, i: number) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px]">
                  <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                  <span className="text-stone-700">
                    {typeof step === 'string' ? step : `${step.instruction} (${step.status})`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
