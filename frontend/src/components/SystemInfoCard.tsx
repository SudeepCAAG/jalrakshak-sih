'use client';

import React from 'react';
import { Info, Compass, Waves } from 'lucide-react';

export const SystemInfoCard: React.FC = () => {
  return (
    <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
        <Waves className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-bold text-amber-950">Mumbai Hydrodynamic Coupling Model</div>
        <p className="text-[11px] text-stone-600 leading-relaxed mt-1">
          Fuses real-time IMD Doppler Radar nowcasts with high-resolution Digital Elevation Models (DEM) and a 1D graph network of Mumbai&apos;s underground stormwater channels, estimating street backflow inundation depths before street-level flooding occurs.
        </p>
      </div>
    </div>
  );
};
