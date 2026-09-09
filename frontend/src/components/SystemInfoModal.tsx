'use client';

import React from 'react';
import { X, HelpCircle, Layers, Cpu, Compass, Waves, Building2 } from 'lucide-react';

interface SystemInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemInfoModal: React.FC<SystemInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Mumbai Urban Flood Nowcasting Model Architecture
              </h3>
              <p className="text-xs text-stone-500 font-medium">Smart India Hackathon (SIH) Coupled Framework</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 my-5 text-xs text-stone-600 leading-relaxed">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="font-extrabold text-stone-900 mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>1. Why Traditional Weather Models Fall Short in Metros</span>
            </div>
            <p>
              Traditional Numerical Weather Prediction (NWP) outputs macroscopic rainfall estimates across wide grid squares (e.g. &ldquo;60mm rain over Mumbai&rdquo;). However, urban inundation is determined by <strong>micro-topography (DEM)</strong>, <strong>asphalt imperviousness (&gt;90%)</strong>, and <strong>subsurface stormwater bottlenecks &amp; tidal outfall locks</strong>.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="font-extrabold text-stone-900 mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>2. Coupled Physics &amp; Graph Hydraulic Engine</span>
            </div>
            <p>
              The system models Mumbai&apos;s underground drainage channels as a directed graph G=(V, E) in Python with <code>NetworkX</code>. Surface inflow Q = C &middot; I &middot; A is routed through pipes using <strong>Manning&apos;s Equation</strong>. When inflow exceeds pipe discharge capacity (Qin &gt; Qcap), <strong>hydraulic surcharging (backflow)</strong> causes water to accumulate on streets in centimeters (cm).
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="font-extrabold text-stone-900 mb-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>3. Emergency Routing & High Tide Integration</span>
            </div>
            <p>
              Dynamic Dijkstra pathfinding penalizes submerged corridors, routing ambulances, buses, and citizens through elevated dry roads (e.g. Bandra Linking Road, elevated flyovers) avoiding flooded underpasses (Milan Subway) and bowl depressions (Hindmata).
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-extrabold rounded-2xl transition shadow-2xs"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
