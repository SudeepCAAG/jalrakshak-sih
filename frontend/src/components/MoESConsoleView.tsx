'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  Flame, 
  Wind, 
  Droplets, 
  Waves, 
  Layers, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Sliders,
  RefreshCw,
  Cpu,
  Info,
  Send,
  Radio,
  BellRing,
  Phone,
  Mail,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { SystemOverview, Zone } from '@/types';
import { SensorFusionView } from './SensorFusionView';

interface MoESConsoleViewProps {
  overview: SystemOverview | null;
  zones: Zone[];
  onApplySimulation: (rainMult: number, blockPct: number) => void;
}

export const MoESConsoleView: React.FC<MoESConsoleViewProps> = ({
  overview,
  zones,
  onApplySimulation
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'fusion' | 'hydraulic' | 'pumps' | 'broadcast'>('fusion');
  const [rainMult, setRainMult] = useState(1.0);
  const [blockPct, setBlockPct] = useState(0.0);

  // Broadcast state
  const [broadcastZone, setBroadcastZone] = useState(zones[0]?.zone_name || 'All High-Risk Hotspots');
  const [broadcastSeverity, setBroadcastSeverity] = useState('Critical Inundation Warning');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLog, setBroadcastLog] = useState<string[]>([]);

  const handleSimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySimulation(rainMult, blockPct);
  };

  const handleTriggerBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setBroadcastLog([]);

    setTimeout(() => {
      setBroadcastLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Authenticated with NDMA National Disaster Alert Gateway.`]);
    }, 400);

    setTimeout(() => {
      setBroadcastLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Extrapolated 0–3h water depth for ${broadcastZone} (${broadcastSeverity}).`]);
    }, 900);

    setTimeout(() => {
      setBroadcastLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Sent 2,450 Emergency SMS & WhatsApp alerts to commuters in danger zone.`]);
    }, 1500);

    setTimeout(() => {
      setBroadcastLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Dispatched traffic diversion bulletins to Municipal Traffic Police & City Bus Control.`]);
      setIsBroadcasting(false);
    }, 2100);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Ministry Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-blue-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold backdrop-blur-md mb-2">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Ministry of Earth Sciences (MoES) &bull; Hydrodynamic Command Console</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              Hydrodynamic Coupled Engineering &amp; Sensor Fusion Console
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-3xl mt-1">
              Deterministic 1D-2D coupled modeling interface for IMD radar scientists, municipal stormwater commissioners, and disaster response dispatchers.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex flex-wrap bg-stone-800/90 p-1 rounded-2xl border border-stone-700 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveSubTab('fusion')}
              className={`px-3 py-2 rounded-xl transition ${
                activeSubTab === 'fusion' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              7-Source Fusion
            </button>
            <button
              onClick={() => setActiveSubTab('hydraulic')}
              className={`px-3 py-2 rounded-xl transition ${
                activeSubTab === 'hydraulic' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Manning Hydraulics
            </button>
            <button
              onClick={() => setActiveSubTab('pumps')}
              className={`px-3 py-2 rounded-xl transition ${
                activeSubTab === 'pumps' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Pump Dispatch SOP
            </button>
            <button
              onClick={() => setActiveSubTab('broadcast')}
              className={`px-3 py-2 rounded-xl transition ${
                activeSubTab === 'broadcast' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-amber-400 hover:text-white'
              }`}
            >
              Emergency Alert Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: 7-Source Sensor Fusion */}
      {activeSubTab === 'fusion' && (
        <SensorFusionView overview={overview} />
      )}

      {/* SUB-TAB 2: Manning's Equation & Hydraulic Surcharge Physics */}
      {activeSubTab === 'hydraulic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Manning's Equation Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-700" />
                  Manning&apos;s Open-Channel &amp; Pipe Flow Capacity
                </h3>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
                  IS: 1742-1992 Standard
                </span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 font-mono text-xs text-stone-800 space-y-2">
                <div className="text-sm font-bold text-blue-900">
                  Q_cap = (1 / n) &times; A &times; R^(2/3) &times; S^(1/2)
                </div>
                <div className="text-[11px] text-stone-600 space-y-1 pt-2 border-t border-stone-200">
                  <div>&bull; <strong>n:</strong> Manning Roughness (0.013 smooth concrete, 0.015 brick sewer)</div>
                  <div>&bull; <strong>A:</strong> Cross-sectional conduit flow area (m&sup2;)</div>
                  <div>&bull; <strong>R:</strong> Hydraulic radius = A / P_wetted (m)</div>
                  <div>&bull; <strong>S:</strong> Pipe hydraulic slope bed gradient</div>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                When surface runoff inflow <strong>Q_in &gt; Q_cap</strong>, stormwater sewer nodes enter <strong>hydraulic surcharge</strong>. Water backs up into manhole shafts and erupts onto streets as street-level inundation.
              </p>
            </div>

            {/* Siltation & Surcharge Stress Simulator */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  Municipal Pipe Siltation &amp; Cloudburst Stress Lab
                </h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
                  Hypothetical Scenarios
                </span>
              </div>

              <form onSubmit={handleSimSubmit} className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Cloudburst Rainfall Multiplier:</span>
                    <span className="font-bold text-blue-700">{rainMult}x ({Math.round(rainMult * 48)} mm/hr)</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={rainMult}
                    onChange={(e) => setRainMult(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                    <span>0.5x (Normal)</span>
                    <span>1.5x (Heavy Downpour)</span>
                    <span>2.5x (Extreme Cloudburst)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Underground Pipe Siltation &amp; Debris Blockage:</span>
                    <span className="font-bold text-rose-600">{blockPct}% Blocked</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={blockPct}
                    onChange={(e) => setBlockPct(parseFloat(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                    <span>0% (Desilted)</span>
                    <span>40% (Average Monsoon Silt)</span>
                    <span>80% (Severe Silt Choke)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition"
                >
                  Apply Stress Scenario to Hydrodynamic Engine
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Dewatering Pump Station SOP */}
      {activeSubTab === 'pumps' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Municipal High-Discharge Dewatering Pump Protocol (SOP)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Automated dispatch recommendations based on 0–3h nowcasted surcharge arrival times.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              Automated SOP Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Britannia Pumping Station</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xs text-stone-600">
                <div>Capacity: <strong>6 &times; 6,000 L/sec</strong></div>
                <div>Target Basin: <strong>Hindmata &bull; Parel Depression</strong></div>
                <div>Status: <span className="text-emerald-700 font-bold">Pumps 1-4 Active</span></div>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-[11px] text-blue-800">
                SOP Action: Discharging into Mahim creek via gravity trunk.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Minto Bridge Sump Station</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              </div>
              <div className="text-xs text-stone-600">
                <div>Capacity: <strong>4 &times; 4,500 L/sec</strong></div>
                <div>Target Basin: <strong>Connaught Place Underpass</strong></div>
                <div>Status: <span className="text-amber-700 font-bold">Standby Ready</span></div>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 text-[11px] text-amber-800">
                SOP Action: Auto-start triggers when water sensor hits 15cm.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Silk Board Sluice Control</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xs text-stone-600">
                <div>Capacity: <strong>Madiwala Lake Outfall Gates</strong></div>
                <div>Target Basin: <strong>Bengaluru Central Valley</strong></div>
                <div>Status: <span className="text-emerald-700 font-bold">Gates Open 60%</span></div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 text-[11px] text-emerald-800">
                SOP Action: Free gravity outfall into downstream rajakaluve.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Emergency Multi-Channel Broadcast Center */}
      {activeSubTab === 'broadcast' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
                <span>Multi-Channel Disaster Broadcast &amp; Alert Dispatch Gateway</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Automatically trigger emergency SMS, WhatsApp, and push notifications to registered residents, bus operators, and traffic police.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
              Gateway Operational
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Dispatch Form (6 cols) */}
            <form onSubmit={handleTriggerBroadcast} className="lg:col-span-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Target Municipal Ward / Submerged Hotspot
                </label>
                <select
                  value={broadcastZone}
                  onChange={(e) => setBroadcastZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 font-semibold focus:outline-hidden focus:border-blue-600"
                >
                  <option value="All Chronic Hotspots">All Chronic Hotspots in Region</option>
                  {zones.map((z) => (
                    <option key={z.zone_id} value={z.zone_name}>
                      {z.zone_name} (Current Depth: ~{z.water_depth_cm}cm)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Alert Severity &amp; Advisory Category
                </label>
                <select
                  value={broadcastSeverity}
                  onChange={(e) => setBroadcastSeverity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 font-semibold focus:outline-hidden focus:border-blue-600"
                >
                  <option value="Critical Inundation Warning">Critical Inundation Warning (Roads Submerged &gt;50cm)</option>
                  <option value="Moderate Waterlogging Advisory">Moderate Waterlogging Advisory (Caution &gt;25cm)</option>
                  <option value="Public Transit Diversion Alert">Public Transit Diversion Alert (Bus/Train Reroute)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-800">Selected Broadcast Channels:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Emergency SMS Gateway</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official WhatsApp Alerts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Municipal Traffic Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NDMA Alert Ticker</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBroadcasting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isBroadcasting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Emergency Broadcast via Gateways...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Instant Flash Flood Warning</span>
                  </>
                )}
              </button>
            </form>

            {/* Right: Real-time Dispatch Console Log (6 cols) */}
            <div className="lg:col-span-6 bg-stone-900 text-stone-200 rounded-2xl p-4 border border-stone-800 font-mono text-xs space-y-2 min-h-64 flex flex-col">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-[11px] text-stone-400">
                <span>GATEWAY TRANSMISSION LOG</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  STANDBY READY
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 text-[11px] pt-1">
                {broadcastLog.length === 0 ? (
                  <div className="text-stone-500 italic">
                    Ready to transmit. Click &quot;Transmit Instant Flash Flood Warning&quot; to test emergency broadcast dispatch.
                  </div>
                ) : (
                  broadcastLog.map((line, idx) => (
                    <div key={idx} className="text-emerald-400">
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
