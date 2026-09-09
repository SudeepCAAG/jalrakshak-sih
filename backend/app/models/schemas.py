from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ZoneCoordinates(BaseModel):
    lat: float
    lon: float

class ZonePolygon(BaseModel):
    type: str = "Polygon"
    coordinates: List[List[List[float]]]

class ZoneSummary(BaseModel):
    zone_id: str
    zone_name: str
    center: ZoneCoordinates
    polygon: Optional[ZonePolygon] = None
    rainfall_mm_hr: float
    elevation_m: float
    drainage_capacity_mm_hr: float
    risk_score: int # 0 - 100
    risk_level: str # HIGH, MEDIUM, LOW
    trend: str # 'increasing', 'steady', 'decreasing'
    water_depth_cm: float
    surcharged_nodes_count: int
    critical_inlets: List[str]
    ai_advisory: str
    citizen_water_level: Optional[str] = "DRY / PASSABLE"
    citizen_description: Optional[str] = ""
    landmark_type: Optional[str] = "Urban Corridor"
    passability: Optional[Dict[str, bool]] = None

class SystemOverview(BaseModel):
    selected_city: Optional[str] = "mumbai"
    city_name: Optional[str] = "Mumbai"
    state_name: Optional[str] = "Maharashtra"
    helpline: Optional[str] = "112"
    transit_type: Optional[str] = "Transit"
    high_risk_zones: int
    high_risk_percentage: float
    medium_risk_zones: int
    medium_risk_percentage: float
    low_risk_zones: int
    low_risk_percentage: float
    total_zones: int
    avg_rainfall_now: float
    current_weather: Dict[str, Any]
    last_updated: str

class NowcastHourForecast(BaseModel):
    time_label: str
    rainfall_mm_hr: float
    trend: str
    overall_risk: str
    confidence_score: float

class ActiveAlert(BaseModel):
    id: str
    title: str
    zone_id: str
    zone_name: str
    severity: str
    message: str
    timestamp: str
    recommendation: str

class SafeRouteRequest(BaseModel):
    city: Optional[str] = "mumbai"
    start_zone_id: str
    dest_zone_id: str
    vehicle_type: str = "four_wheeler" # four_wheeler, two_wheeler, bus_emergency, walking

class SimulationRequest(BaseModel):
    city: Optional[str] = "mumbai"
    rainfall_intensity_multiplier: float = 1.0
    drainage_blockage_percentage: float = 0.0
