'use client';

import React, { useState } from 'react';
import { X, Sliders, Play, RotateCcw, AlertTriangle, CloudRain } from 'lucide-react';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySimulation: (rainMult: number, blockPct: number) => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  isOpen,
  onClose,
  onApplySimulation,
}) => {
  const [rainMultiplier, setRainMultiplier] = useState<number>(1.0);
  const [blockagePct, setBlockagePct] = useState<number>(0.0);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplySimulation(rainMultiplier, blockagePct);
    onClose();
  };

  const handleReset = () => {
    setRainMultiplier(1.0);
    setBlockagePct(0.0);
    onApplySimulation(1.0, 0.0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Hydraulic Stress Lab (What-If Analysis)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Stress-test Mumbai drainage resilience against cloudbursts & pipe siltation
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

        {/* Sliders */}
        <div className="space-y-6 my-6">
          {/* Rainfall Multiplier Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
              <span className="flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-amber-600" />
                <span>Monsoon Cloudburst Surge ({rainMultiplier}x)</span>
              </span>
              <span className="text-amber-900 font-extrabold bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                {Math.round(45.7 * rainMultiplier)} mm/hr
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={rainMultiplier}
              onChange={(e) => setRainMultiplier(parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1">
              <span>0.5x (Light Showers)</span>
              <span>1.0x (Current Monsoons)</span>
              <span>2.5x (Extreme 100-Year Cloudburst)</span>
            </div>
          </div>

          {/* Drainage Pipe Blockage Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Storm Drain Siltation & High Tide Lock</span>
              </span>
              <span className="text-rose-900 font-extrabold bg-rose-100 px-2 py-0.5 rounded-lg border border-rose-200">
                {blockagePct}% Discharge Impeded
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={blockagePct}
              onChange={(e) => setBlockagePct(parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1">
              <span>0% (Desilted Trunk Lines)</span>
              <span>40% (Moderate Siltation)</span>
              <span>80% (Spring High Tide Lock)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Telemetry</span>
          </button>

          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-stone-950 bg-amber-500 hover:bg-amber-600 rounded-2xl shadow-sm shadow-amber-500/20 transition active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-stone-950" />
            <span>Execute Coupled Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
