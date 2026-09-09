export interface Zone {
  zone_id: string;
  zone_name: string;
  center: { lat: number; lon: number };
  radius_meters?: number;
  polygon?: {
    type: string;
    coordinates: number[][][];
  };
  rainfall_mm_hr: number;
  elevation_m: number;
  drainage_capacity_mm_hr: number;
  risk_score: number;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  trend: 'increasing' | 'steady' | 'decreasing';
  water_depth_cm: number;
  surcharged_nodes_count: number;
  critical_inlets: string[];
  ai_advisory: string;
  citizen_water_level?: string;
  citizen_description?: string;
  landmark_type?: string;
  passability?: {
    walking: boolean;
    two_wheeler: boolean;
    four_wheeler: boolean;
    bus_emergency: boolean;
  };
}

export interface FactorBreakdown {
  precipitation_contribution: number;
  soil_saturation_contribution: number;
  tidal_backpressure_contribution: number;
  river_discharge_contribution: number;
  wind_advection_contribution: number;
  thermal_anomaly_contribution: number;
  visibility_degradation: number;
}

export interface CompositeAccuracy {
  composite_flood_risk_score: number;
  composite_risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  data_fusion_confidence_pct: number;
  live_sources_active: number;
  total_sources_queried: number;
  factor_breakdown: FactorBreakdown;
  weight_formula: string;
  scientific_interpretation: string;
}

export interface SoilAnalysis {
  avg_volumetric_water_content?: number;
  saturation_pct?: number;
  infiltration_capacity?: string;
  interpretation?: string;
}

export interface WindAnalysis {
  surface_speed_kmh?: number;
  surface_direction_deg?: number;
  surface_direction_cardinal?: string;
  gust_speed_kmh?: number;
  upper_wind_80m_kmh?: number;
  upper_wind_80m_dir?: number;
  storm_advection_vector?: string;
  convective_cell_movement?: string;
}

export interface MarineTidal {
  wave_height_m: number;
  tidal_lock_risk: 'HIGH' | 'MODERATE' | 'LOW';
  outfall_status: string;
}

export interface RiverDischarge {
  current_m3_s: number;
  flood_risk: string;
}

export interface AirQuality {
  aqi: number;
  category: string;
  pm2_5: number;
}

export interface SatelliteThermal {
  hotspot_count: number;
  heat_island_detected: boolean;
}

export interface SystemOverview {
  selected_city?: string;
  city_name?: string;
  state_name?: string;
  helpline?: string;
  transit_type?: string;
  radar_station?: string;
  high_risk_zones: number;
  high_risk_percentage: number;
  medium_risk_zones: number;
  medium_risk_percentage: number;
  low_risk_zones: number;
  low_risk_percentage: number;
  total_zones: number;
  avg_rainfall_now: number;
  current_weather: {
    temperature: number;
    condition: string;
    rainfall_rate_mm_hr: number;
    relative_humidity: number;
    wind_speed_kmh: number;
    weather_code: number;
    source: string;
    feels_like_c?: number;
    cloud_cover_pct?: number;
    sea_level_pressure_hpa?: number;
    wind_direction_cardinal?: string;
    wind_gusts_kmh?: number;
  };
  last_updated: string;
  soil_analysis?: SoilAnalysis;
  wind_analysis?: WindAnalysis;
  marine_tidal?: MarineTidal;
  river_discharge?: RiverDischarge;
  air_quality?: AirQuality;
  satellite_thermal?: SatelliteThermal;
  composite_accuracy?: CompositeAccuracy;
}

export interface NowcastForecastItem {
  time_label: string;
  rainfall_mm_hr: number;
  trend: string;
  overall_risk: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence_score: number;
  model_spread_mm?: number;
  ensemble_models?: string;
}

export interface ActiveAlertItem {
  id: string;
  title: string;
  zone_id: string;
  zone_name: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  timestamp: string;
  recommendation: string;
}

export interface SafeRouteResult {
  status: string;
  start_zone: string;
  dest_zone: string;
  path_nodes: string[];
  total_distance_km: number;
  estimated_time_min: number;
  max_flood_depth_encountered_cm: number;
  safety_rating: string;
  waypoints: {
    zone_id: string;
    name: string;
    lat: number;
    lon: number;
    water_depth_cm: number;
    risk_level: string;
  }[];
  avoided_flooded_nodes: string[];
  turn_by_turn: string[];
}
