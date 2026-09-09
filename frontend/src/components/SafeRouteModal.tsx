'use client';

import React, { useState } from 'react';
import { X, Navigation, ShieldCheck, AlertTriangle, ArrowRight, Truck, Car, Bike, CheckCircle2, Siren } from 'lucide-react';
import axios from 'axios';
import { Zone, SafeRouteResult } from '@/types';

interface SafeRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: Zone[];
  onApplyRouteToMap: (route: SafeRouteResult) => void;
}

export const SafeRouteModal: React.FC<SafeRouteModalProps> = ({
  isOpen,
  onClose,
  zones,
  onApplyRouteToMap,
}) => {
  const [startZone, setStartZone] = useState('Z01');
  const [destZone, setDestZone] = useState('Z09');
  const [vehicleType, setVehicleType] = useState('emergency');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SafeRouteResult | null>(null);

  if (!isOpen) return null;

  const handleCalculateRoute = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/safe-route', {
        start_zone_id: startZone,
        dest_zone_id: destZone,
        vehicle_type: vehicleType,
      });
      setResult(res.data);
      onApplyRouteToMap(res.data);
    } catch (err) {
      console.error('Error calculating route:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Mumbai Emergency Flood-Safe Navigation Utility
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Dynamic Dijkstra pathfinding avoiding submerged underpasses & Hindmata/Kurla bottlenecks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Origin (Departure Zone)
            </label>
            <select
              value={startZone}
              onChange={(e) => setStartZone(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition"
            >
              {zones.map((z) => (
                <option key={z.zone_id} value={z.zone_id}>
                  {z.zone_id} - {z.zone_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Target Destination
            </label>
            <select
              value={destZone}
              onChange={(e) => setDestZone(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition"
            >
              {zones.map((z) => (
                <option key={z.zone_id} value={z.zone_id}>
                  {z.zone_id} - {z.zone_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Vehicle Priority
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition"
            >
              <option value="emergency">Ambulance / Fire Tender</option>
              <option value="heavy">BEST Bus / Heavy Transport</option>
              <option value="4wheeler">Light Motor Vehicle (Car)</option>
              <option value="2wheeler">Two-Wheeler</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculateRoute}
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold py-3 rounded-2xl text-xs transition shadow-sm shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
        >
          <Navigation className="w-4 h-4 fill-stone-950" />
          <span>{loading ? 'Routing Across Dry Corridors...' : 'Calculate Safe Dry Corridor Route'}</span>
        </button>

        {/* Route Output Results */}
        {result && (
          <div className="mt-6 space-y-4 border-t border-stone-100 pt-5">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-stone-500 font-bold uppercase">Transit Distance</div>
                <div className="text-lg font-extrabold text-stone-900 mt-0.5">{result.total_distance_km} km</div>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-stone-500 font-bold uppercase">Est. Travel Time</div>
                <div className="text-lg font-extrabold text-stone-900 mt-0.5">{result.estimated_time_min} min</div>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-stone-500 font-bold uppercase">Max Water Encountered</div>
                <div className="text-lg font-extrabold text-blue-700 mt-0.5">{result.max_flood_depth_encountered_cm} cm</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-emerald-700 font-bold uppercase">Corridor Safety</div>
                <div className="text-xs font-black text-emerald-800 mt-1">{result.safety_rating}</div>
              </div>
            </div>

            {/* Avoided Flood Road Segments */}
            {result.avoided_flooded_nodes && result.avoided_flooded_nodes.length > 0 && (
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 text-xs">
                <div className="font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Submerged Corridors Diverted & Avoided:</span>
                </div>
                <ul className="list-disc list-inside text-rose-700 space-y-0.5 pl-2 font-medium">
                  {result.avoided_flooded_nodes.map((node, idx) => (
                    <li key={idx}>{node}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Turn by turn directions */}
            <div>
              <div className="text-xs font-extrabold text-stone-900 mb-2">Turn-by-Turn Safe Corridor Navigation:</div>
              <div className="space-y-2">
                {result.turn_by_turn.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-stone-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
