'use client';

import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  PhoneCall, 
  CheckCircle2, 
  Share2,
  Calendar,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Zone, SystemOverview } from '@/types';

interface DisasterBulletinsViewProps {
  overview: SystemOverview | null;
  zones: Zone[];
}

export const DisasterBulletinsView: React.FC<DisasterBulletinsViewProps> = ({ overview, zones }) => {
  const cityName = overview?.city_name || 'Mumbai';
  const stateName = overview?.state_name || 'Maharashtra';

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Zone_ID', 'Zone_Name', 'Rainfall_mm_hr', 'Elevation_m', 'Drainage_Cap_mm_hr', 'Water_Depth_cm', 'Risk_Level', 'Citizen_Status'];
    const rows = zones.map((z) => [
      z.zone_id,
      `"${z.zone_name}"`,
      z.rainfall_mm_hr,
      z.elevation_m,
      z.drainage_capacity_mm_hr,
      z.water_depth_cm,
      z.risk_level,
      `"${z.citizen_water_level || 'DRY'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `JalDrishti_${cityName}_Flood_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    const text = `[URGENT] JalDrishti Flood Advisory (${cityName}):\nOfficial flood nowcast warns of severe street inundation. Check safe bypass routes: http://localhost:3000`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Action Controls */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
              <FileText className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-black text-stone-900">
              Official Urban Flood Bulletin &amp; Situation Report
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Compliant with NDMA Standard Operating Procedure (SOP) for Urban Flood Warning &bull; {cityName}, {stateName}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Bulletin</span>
          </button>
        </div>
      </div>

      {/* Official Government Warning Bulletin Card */}
      <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-8 shadow-md space-y-6">
        {/* Bulletin Top Seal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center font-black shadow-sm">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                National Disaster Management Authority (NDMA) &bull; MoES
              </div>
              <h3 className="text-base font-black text-stone-900">
                URGENT FLASH FLOOD &amp; INUNDATION ADVISORY
              </h3>
            </div>
          </div>

          <div className="text-right text-xs text-stone-600 space-y-0.5">
            <div>Bulletin No: <strong className="text-stone-900">NDMA/UFW/2026/09</strong></div>
            <div>Issue Time: <strong className="text-stone-900">Live 0–3h Extrapolation Window</strong></div>
          </div>
        </div>

        {/* Advisory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
            <div className="font-bold text-rose-800 uppercase text-[10px]">Severity Level</div>
            <div className="text-base font-black text-rose-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              <span>RED ALERT INUNDATION</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              Street-level water depths exceed 50cm in designated low-lying sinks. High risk of vehicle drowning and road closures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="font-bold text-stone-500 uppercase text-[10px]">Impacted Jurisdictions</div>
            <div className="text-base font-black text-stone-900">{cityName} Municipal Corporation</div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Submerged underpasses: Hindmata, Milan Subway, Minto Bridge, Pul Prahladpur, Silk Board.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="font-bold text-stone-500 uppercase text-[10px]">Emergency Action Protocol</div>
            <div className="text-base font-black text-stone-900">Helpline: {overview?.helpline || '112'}</div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Deploy mobile dewatering pumps. Divert traffic via elevated flyovers. Activate emergency teams.
            </p>
          </div>
        </div>

        {/* Live Ward Inundation Data Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-900">Street-Level Water Depth &amp; Hydraulic Surcharge Registry</span>
            <span className="text-stone-500 text-[11px]">Total Monitored Hotspots: {zones.length}</span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/90 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Hotspot Name</th>
                  <th className="py-2.5 px-3">Topography (DEM)</th>
                  <th className="py-2.5 px-3">Rain Intensity</th>
                  <th className="py-2.5 px-3">Pipe Capacity</th>
                  <th className="py-2.5 px-3">Water Depth</th>
                  <th className="py-2.5 px-3">Citizen Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {zones.map((z) => (
                  <tr key={z.zone_id} className="hover:bg-stone-50 transition">
                    <td className="py-2.5 px-3 font-semibold text-stone-900">{z.zone_name}</td>
                    <td className="py-2.5 px-3 text-stone-600">{z.elevation_m} m ASL</td>
                    <td className="py-2.5 px-3 text-stone-600">{z.rainfall_mm_hr} mm/hr</td>
                    <td className="py-2.5 px-3 text-stone-600">{z.drainage_capacity_mm_hr} mm/hr</td>
                    <td className="py-2.5 px-3 font-bold text-stone-900">~{z.water_depth_cm} cm</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        z.risk_level === 'HIGH'
                          ? 'bg-rose-100 text-rose-800'
                          : z.risk_level === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {z.citizen_water_level || z.risk_level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
