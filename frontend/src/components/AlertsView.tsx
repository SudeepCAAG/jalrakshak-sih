'use client';

import React from 'react';
import { AlertTriangle, MapPin, ShieldAlert, CheckCircle2, Siren, PhoneCall } from 'lucide-react';
import { ActiveAlertItem, Zone } from '@/types';

interface AlertsViewProps {
  alerts: ActiveAlertItem[];
  zones: Zone[];
  onSelectZoneId: (zoneId: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ alerts, zones, onSelectZoneId }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Mumbai Disaster Management Authority (MDMA) Flood Alerts</h2>
            <p className="text-xs text-red-100 mt-0.5">
              Live automated emergency warnings triggered by hydraulic surcharge & rainfall thresholds
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const isHigh = alert.severity === 'HIGH';
          return (
            <div
              key={alert.id}
              onClick={() => onSelectZoneId(alert.zone_id)}
              className={`p-5 rounded-2xl border transition cursor-pointer hover:shadow-md ${
                isHigh
                  ? 'bg-red-50/60 border-red-200'
                  : 'bg-amber-50/60 border-amber-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isHigh
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-amber-100 text-amber-700 border border-amber-300'
                    }`}
                  >
                    {alert.severity} RISK
                  </span>
                  <h3 className="font-bold text-sm text-slate-800">{alert.title}</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Triggered: {alert.timestamp}</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Target Area: {alert.zone_name}</span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {alert.message}
              </p>

              {/* Actionable Municipal Protocol */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 bg-white/70 rounded-xl p-3 text-xs">
                <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mandated Emergency Response Protocol:</span>
                </div>
                <p className="text-slate-700">{alert.recommendation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
