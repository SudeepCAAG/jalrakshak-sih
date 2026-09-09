import React from 'react';
import {
  Globe,
  BarChart3,
  Satellite,
  Wind,
  Sprout,
  Waves,
  CloudFog,
  Sun,
  Zap,
  Radio,
  Droplets,
  Compass,
  CloudRain,
  Target,
  ScrollText,
  Cpu,
  Activity,
  Microscope,
  Scale
} from 'lucide-react';

interface DataFusionDetailProps {
  fusionData: any;
}

export const DataFusionDetailView: React.FC<DataFusionDetailProps> = ({ fusionData }) => {
  if (!fusionData) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <p className="text-slate-500">Loading data fusion details...</p>
      </div>
    );
  }

  const fused = fusionData.fused_prediction || {};
  const sources = fusionData;

  const sourceCards = [
    { title: 'Multi-Model NWP', data: sources.primary_weather, icon: Globe, color: 'blue' },
    { title: 'Ensemble Forecast', data: sources.ensemble_forecast, icon: BarChart3, color: 'purple' },
    { title: 'Thermal Satellite', data: sources.thermal_satellite, icon: Satellite, color: 'red' },
    { title: 'Wind Profile', data: sources.wind_profile, icon: Wind, color: 'cyan' },
    { title: 'Soil Moisture', data: sources.soil_moisture, icon: Sprout, color: 'green' },
    { title: 'Marine/Tidal', data: sources.marine_tidal, icon: Waves, color: 'blue' },
    { title: 'Air Quality', data: sources.air_quality, icon: CloudFog, color: 'orange' },
    { title: 'Solar Radiation', data: sources.solar_radiation, icon: Sun, color: 'yellow' },
    { title: 'Lightning Detection', data: sources.lightning_detection, icon: Zap, color: 'yellow' },
    { title: 'Radar Reflectivity', data: sources.radar_reflectivity, icon: Radio, color: 'green' },
    { title: 'Atmospheric Rivers', data: sources.atmospheric_rivers, icon: Droplets, color: 'blue' },
    { title: 'Convective Parameters', data: sources.convective_parameters, icon: Compass, color: 'purple' },
    { title: 'Precipitation Type', data: sources.precipitation_type, icon: CloudRain, color: 'blue' },
    { title: 'Storm Tracking', data: sources.storm_tracking, icon: Target, color: 'red' },
    { title: 'Historical Patterns', data: sources.historical_patterns, icon: ScrollText, color: 'orange' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    red: 'bg-red-50 border-red-200',
    cyan: 'bg-cyan-50 border-cyan-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div className="space-y-6">
      {/* Overall Fusion Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-200" />
          <span>ML-Enhanced Multi-Source Fusion Engine</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-80">Fused Rainfall</p>
            <p className="text-3xl font-bold">{fused.fused_rainfall_mm_hr} mm/hr</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-80">Accuracy Score</p>
            <p className="text-3xl font-bold">{fused.accuracy_score_pct}%</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-80">Live Sources</p>
            <p className="text-3xl font-bold">{fused.live_data_sources}/{fused.total_data_sources}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-80">Confidence</p>
            <p className="text-3xl font-bold">{fused.composite_confidence_pct}%</p>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-lg p-4 backdrop-blur">
          <p className="text-sm opacity-90">{fused.interpretation}</p>
        </div>
      </div>

      {/* Source Health Status */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5 text-blue-600" />
          <span>Data Source Health Status</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(fused.source_health || {}).map(([source, status]) => (
            <div
              key={source}
              className={`flex items-center gap-2 p-3 rounded-lg border ${
                status ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs font-medium text-slate-700 truncate">{source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weight Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-purple-600" />
          <span>ML Ensemble Weight Distribution</span>
        </h3>
        <div className="space-y-3">
          {Object.entries(fused.weight_breakdown || {}).map(([source, rawWeight]) => {
            const weight = typeof rawWeight === 'number' ? rawWeight : Number(rawWeight) || 0;
            return (
              <div key={source} className="flex items-center gap-3">
                <span className="w-48 text-sm text-slate-600 truncate">{source}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                    style={{ width: `${weight * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-slate-700 w-16 text-right">{(weight * 100).toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Data Sources */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Microscope className="w-5 h-5 text-indigo-600" />
          <span>Detailed Data Source Analysis</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sourceCards.map((card) => {
            const data = card.data;
            const status = data?.status || 'UNKNOWN';
            const colorClass = colorClasses[card.color as keyof typeof colorClasses] || 'bg-slate-50 border-slate-200';
            const CardIcon = card.icon;
            
            return (
              <div key={card.title} className={`${colorClass} border rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <CardIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm">{card.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      status === 'LIVE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  {Object.entries(data || {}).map(([key, value]) => {
                    if (key === 'status' || key === 'source') return null;
                    return (
                      <div key={key} className="flex justify-between">
                        <span className="opacity-70">{key}:</span>
                        <span className="font-medium truncate max-w-[120px]">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {data?.source && (
                  <p className="text-xs text-slate-500 mt-2 italic truncate">{data.source}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-600" />
          <span>Accuracy & Uncertainty Metrics</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Cross-Validation Score</p>
            <p className="text-2xl font-bold text-slate-800">{fused.cross_validation_score}%</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Prediction Uncertainty Range</p>
            <p className="text-2xl font-bold text-slate-800">{fused.prediction_uncertainty_range}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">ML Ensemble Active</p>
            <p className="text-2xl font-bold text-green-600">{fused.ml_ensemble_active ? 'Active' : 'Standby'}</p>
          </div>
        </div>
      </div>

      {/* Fusion Method Info */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span>Fusion Methodology</span>
        </h3>
        <p className="text-sm text-slate-600">{fused.fusion_method}</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white rounded p-3 border border-slate-200">
            <p className="font-bold text-slate-800">Bayesian Weighting</p>
            <p className="text-slate-600">Dynamic source reliability</p>
          </div>
          <div className="bg-white rounded p-3 border border-slate-200">
            <p className="font-bold text-slate-800">Cross-Validation</p>
            <p className="text-slate-600">Multi-source agreement</p>
          </div>
          <div className="bg-white rounded p-3 border border-slate-200">
            <p className="font-bold text-slate-800">Uncertainty Quant</p>
            <p className="text-slate-600">Probabilistic bounds</p>
          </div>
          <div className="bg-white rounded p-3 border border-slate-200">
            <p className="font-bold text-slate-800">ML Ensemble</p>
            <p className="text-slate-600">Adaptive weighting</p>
          </div>
        </div>
      </div>
    </div>
  );
};
