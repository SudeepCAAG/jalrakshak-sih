'use client';

import React from 'react';
import { AlertTriangle, MapPin, ChevronRight, Siren, CheckCircle2 } from 'lucide-react';
import { ActiveAlertItem } from '@/types';

interface ActiveAlertsProps {
  alerts: ActiveAlertItem[];
  onOpenAllAlerts?: () => void;
  onSelectZoneId?: (zoneId: string) => void;
}

export const ActiveAlerts: React.FC<ActiveAlertsProps> = ({
  alerts,
  onOpenAllAlerts,
  onSelectZoneId,
}) => {
  const defaultAlerts: ActiveAlertItem[] = [
    {
      id: 'ALT-1',
      title: 'Severe Inundation Warning',
      zone_id: 'Z03',
      zone_name: 'Hindmata / Parel (Z03)',
      severity: 'HIGH',
      message: 'Bowl depression water accumulation ~97cm. Britannia Pumping Station operating at 100% capacity.',
      timestamp: '10:20 AM',
      recommendation: 'Divert BEST buses to elevated flyover. Activate mobile dewatering tenders.',
    },
    {
      id: 'ALT-2',
      title: 'Underpass Submergence Alert',
      zone_id: 'Z07',
      zone_name: 'Milan Subway (Z07)',
      severity: 'HIGH',
      message: 'Runoff exceeding underpass sump discharge. Surcharge depth ~84cm.',
      timestamp: '10:18 AM',
      recommendation: 'Close vehicular gates. Redirect light vehicular traffic towards SV Road.',
    },
  ];

  const items = alerts && alerts.length > 0 ? alerts.slice(0, 2) : defaultAlerts;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-bold text-stone-900 tracking-tight">Active Disaster Control Alerts</h2>
        </div>
        <button
          onClick={onOpenAllAlerts}
          className="text-xs font-bold text-amber-700 hover:text-amber-800 transition"
        >
          View All ({alerts?.length || 2})
        </button>
      </div>

      {/* Alert Cards */}
      <div className="space-y-2.5">
        {items.map((alert) => {
          const isHigh = alert.severity === 'HIGH';
          return (
            <div
              key={alert.id}
              onClick={() => onSelectZoneId && onSelectZoneId(alert.zone_id)}
              className={`p-3 rounded-xl border transition cursor-pointer hover:shadow-sm ${
                isHigh
                  ? 'bg-rose-50/40 border-rose-200 hover:bg-rose-50/80'
                  : 'bg-amber-50/40 border-amber-200 hover:bg-amber-50/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHigh ? 'bg-rose-600 animate-ping' : 'bg-amber-500'
                    }`}
                  ></span>
                  <span className={isHigh ? 'text-rose-800' : 'text-amber-900'}>
                    {alert.title}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-semibold">{alert.timestamp}</span>
              </div>

              <div className="mt-1.5 flex items-start gap-1 text-xs font-bold text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                <span>{alert.zone_name}</span>
              </div>

              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed pl-4">
                {alert.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
