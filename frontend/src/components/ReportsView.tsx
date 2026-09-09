'use client';

import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Printer, FileSpreadsheet, Building2 } from 'lucide-react';
import { Zone, SystemOverview } from '@/types';

interface ReportsViewProps {
  zones: Zone[];
  overview?: SystemOverview | null;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ zones, overview }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCSV = () => {
    const headers = 'Zone ID,Zone Name,Rainfall (mm/hr),DEM Elevation (m),Drainage Capacity (mm/hr),Risk Score (0-100),Risk Level,Est Water Depth (cm),Surcharged Nodes\n';
    const rows = zones
      .map(
        (z) =>
          `"${z.zone_id}","${z.zone_name}",${z.rainfall_mm_hr},${z.elevation_m},${z.drainage_capacity_mm_hr},${z.risk_score},"${z.risk_level}",${z.water_depth_cm},${z.surcharged_nodes_count}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Mumbai_Urban_Flood_Nowcast_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Brihanmumbai Municipal Corporation (BMC) Flood Report</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Automated Situation Assessment & Dewatering Pump Resource Allocation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{downloaded ? 'Exported CSV!' : 'Export CSV Dataset'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Summary Report Document Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Jurisdiction Area</div>
            <div className="text-base font-bold text-slate-800">Greater Mumbai Metropolitan Region (MMR)</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase">Assessment Timestamp</div>
            <div className="text-xs font-bold text-slate-700">{new Date().toLocaleString()}</div>
          </div>
        </div>

        {/* Executive Summary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Zone ID</th>
                <th className="py-2.5 px-3">Hotspot Name</th>
                <th className="py-2.5 px-3 text-center">DEM Elev (m)</th>
                <th className="py-2.5 px-3 text-center">Rain (mm/hr)</th>
                <th className="py-2.5 px-3 text-center">Drain Cap</th>
                <th className="py-2.5 px-3 text-center">Water Depth</th>
                <th className="py-2.5 px-3 text-center">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {zones.map((z) => (
                <tr key={z.zone_id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-blue-600">{z.zone_id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{z.zone_name}</td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{z.elevation_m}m</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-700">{z.rainfall_mm_hr}</td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{z.drainage_capacity_mm_hr} mm/hr</td>
                  <td className="py-2.5 px-3 text-center font-bold text-blue-700">{z.water_depth_cm} cm</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        z.risk_level === 'HIGH'
                          ? 'bg-red-100 text-red-700'
                          : z.risk_level === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {z.risk_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
