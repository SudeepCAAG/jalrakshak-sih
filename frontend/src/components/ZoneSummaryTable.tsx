'use client';

import React, { useState } from 'react';
import { Search, Eye, CloudRain, ChevronDown, Mountain, Activity } from 'lucide-react';
import { Zone } from '@/types';

interface ZoneSummaryTableProps {
  zones: Zone[];
  onSelectZone: (zone: Zone) => void;
}

export const ZoneSummaryTable: React.FC<ZoneSummaryTableProps> = ({
  zones,
  onSelectZone,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'risk' | 'rainfall' | 'elevation' | 'capacity'>('risk');

  const filteredZones = zones
    .filter(
      (z) =>
        z.zone_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        z.zone_id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'risk') return b.risk_score - a.risk_score;
      if (sortBy === 'rainfall') return b.rainfall_mm_hr - a.rainfall_mm_hr;
      if (sortBy === 'elevation') return a.elevation_m - b.elevation_m;
      if (sortBy === 'capacity') return a.drainage_capacity_mm_hr - b.drainage_capacity_mm_hr;
      return 0;
    });

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'LOW':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    }
  };

  const getZoneIdColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'text-rose-600 font-extrabold';
      case 'MEDIUM':
        return 'text-amber-600 font-extrabold';
      case 'LOW':
      default:
        return 'text-emerald-600 font-extrabold';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs">
      {/* Top Bar: Title, Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-stone-900 tracking-tight">Mumbai Ward Inundation Registry</h2>
          <p className="text-[11px] text-stone-500">Live hydrodynamic coupling of surface elevation vs. stormwater pipe discharge</p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hotspot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-stone-50 border border-stone-200 rounded-xl pl-3 pr-8 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="risk">Sort by Risk Index</option>
              <option value="rainfall">Sort by Rain Rate</option>
              <option value="elevation">Sort by Elevation (Low)</option>
              <option value="capacity">Sort by Pipe Cap</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-stone-500 border-b border-stone-100 font-semibold text-[11px]">
              <th className="pb-2.5 pl-2">Hotspot ID</th>
              <th className="pb-2.5">Zone & Landmark</th>
              <th className="pb-2.5 text-center">Rain Rate</th>
              <th className="pb-2.5 text-center">DEM Elev</th>
              <th className="pb-2.5 text-center">Drain Capacity</th>
              <th className="pb-2.5 text-center">Water Depth</th>
              <th className="pb-2.5 text-center">Risk Index</th>
              <th className="pb-2.5 text-center">Status</th>
              <th className="pb-2.5 text-center pr-2">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredZones.map((zone) => (
              <tr
                key={zone.zone_id}
                onClick={() => onSelectZone(zone)}
                className="hover:bg-amber-50/40 transition cursor-pointer group"
              >
                <td className={`py-3 pl-2 ${getZoneIdColor(zone.risk_level)}`}>
                  {zone.zone_id}
                </td>
                <td className="py-3 font-bold text-stone-800 group-hover:text-amber-800 transition">
                  {zone.zone_name}
                </td>
                <td className="py-3 text-center text-stone-700 font-semibold">
                  {zone.rainfall_mm_hr} <span className="text-[10px] text-stone-400 font-normal">mm/hr</span>
                </td>
                <td className="py-3 text-center text-stone-600 font-medium">{zone.elevation_m}m</td>
                <td className="py-3 text-center text-stone-600 font-medium">
                  {zone.drainage_capacity_mm_hr} <span className="text-[10px] text-stone-400">mm/hr</span>
                </td>
                <td className="py-3 text-center font-extrabold text-blue-700">
                  {zone.water_depth_cm} <span className="text-[10px] font-normal text-stone-500">cm</span>
                </td>
                <td className="py-3 text-center font-extrabold">
                  <span className={zone.risk_level === 'HIGH' ? 'text-rose-600' : zone.risk_level === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'}>
                    {zone.risk_score}
                  </span>
                  <span className="text-stone-400 font-normal text-[10px]">/100</span>
                </td>
                <td className="py-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRiskLevelBadge(
                      zone.risk_level
                    )}`}
                  >
                    {zone.risk_level}
                  </span>
                </td>
                <td className="py-3 text-center pr-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectZone(zone);
                    }}
                    className="p-1 rounded-lg text-stone-400 hover:text-amber-700 hover:bg-amber-100 transition"
                    title="View Hydraulic Diagnostics"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
