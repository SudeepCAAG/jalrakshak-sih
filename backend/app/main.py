from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

from app.config import settings
from app.services.hydro_engine import hydro_engine
from app.services.routing_service import routing_service
from app.services.weather_service import (
    enhanced_weather, marine_tidal, river_discharge,
    air_quality_svc, satellite_thermal, fusion_engine
)
from app.services.gemini_service import gemini_service
from app.services.openweather_service import openweather_svc
from app.models.schemas import SafeRouteRequest, SimulationRequest

class AIChatRequest(BaseModel):
    message: str
    city: Optional[str] = "kolkata"
    lat: Optional[float] = None
    lon: Optional[float] = None
    lang: Optional[str] = "en"

app = FastAPI(
    title="JalRakshak - National Urban Flood Nowcasting & Safe Navigation Platform",
    description=(
        "Pan-India high-resolution urban flood nowcasting and citizen safe-routing API. "
        "Fusing Doppler Radar NWP, OpenWeatherMap Live Sensors, DEM Topography, 1D/2D Hydraulic Drainage Graph, "
        "and Google Gemini Emergency Advisory AI."
    ),
    version="3.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "platform": "JalRakshak - National Urban Flood Nowcasting & Safe Navigation",
        "authority": "Smart India Hackathon (SIH) & National Disaster Management Authority (NDMA)",
        "status": "Operational",
        "version": "3.0.0",
        "supported_cities": list(settings.CITIES.keys()),
        "docs": "/docs"
    }

@app.get("/api/cities")
def get_supported_cities():
    cities_list = []
    for key, c in settings.CITIES.items():
        cities_list.append({
            "id": key,
            "name": c["name"],
            "state": c["state"],
            "lat": c["lat"],
            "lon": c["lon"],
            "helpline": c["helpline"],
            "transit_type": c["transit_type"],
            "coastal": c.get("coastal", False),
            "radar_station": c["radar_station"]
        })
    return {"cities": cities_list}

@app.get("/api/overview")
def get_system_overview(
    city: str = Query("kolkata", description="City ID"),
    rain_multiplier: float = 1.0, 
    blockage_pct: float = 0.0
):
    state = hydro_engine.compute_system_state(city=city, rain_multiplier=rain_multiplier, blockage_pct=blockage_pct)
    c_meta = settings.CITIES.get(city.lower(), settings.CITIES["kolkata"])
    live_owm = openweather_svc.get_live_weather(c_meta["lat"], c_meta["lon"])
    overview_data = state["overview"]
    if live_owm:
        overview_data["live_owm"] = live_owm
    return overview_data

@app.get("/api/zones")
def get_zones_data(
    city: str = Query("kolkata", description="City ID"),
    rain_multiplier: float = 1.0, 
    blockage_pct: float = 0.0
):
    state = hydro_engine.compute_system_state(city=city, rain_multiplier=rain_multiplier, blockage_pct=blockage_pct)
    return {
        "city": state["city"],
        "city_meta": state["city_meta"],
        "zones": state["zones"],
        "network_edges": state["network_edges"]
    }

@app.get("/api/forecast")
def get_0_to_3h_forecast(
    city: str = Query("kolkata", description="City ID"),
    rain_multiplier: float = 1.0
):
    state = hydro_engine.compute_system_state(city=city, rain_multiplier=rain_multiplier)
    return {
        "city": state["city"],
        "forecast": state["forecast_0_3h"]
    }

@app.get("/api/alerts")
def get_active_alerts(
    city: str = Query("kolkata", description="City ID"),
    rain_multiplier: float = 1.0, 
    blockage_pct: float = 0.0
):
    state = hydro_engine.compute_system_state(city=city, rain_multiplier=rain_multiplier, blockage_pct=blockage_pct)
    return {
        "city": state["city"],
        "alerts": state["alerts"]
    }

@app.post("/api/safe-route")
def calculate_safe_route(req: SafeRouteRequest):
    try:
        route = routing_service.calculate_flood_safe_route(
            city=req.city or "kolkata",
            start_zone=req.start_zone_id,
            dest_zone=req.dest_zone_id,
            vehicle_type=req.vehicle_type
        )
        return route
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/simulate")
def run_simulation(req: SimulationRequest):
    state = hydro_engine.compute_system_state(
        city=req.city or "kolkata",
        rain_multiplier=req.rainfall_intensity_multiplier,
        blockage_pct=req.drainage_blockage_percentage
    )
    return state

@app.post("/api/ai/ask")
async def ask_gemini_ai(req: AIChatRequest):
    city_key = req.city.lower() if req.city else "kolkata"
    c_meta = settings.CITIES.get(city_key, settings.CITIES["kolkata"])
    
    # 1. Fetch live hydrodynamic system state
    state = hydro_engine.compute_system_state(city=city_key)
    
    # 2. Fetch live sensor / radar weather
    weather = openweather_svc.get_live_weather(c_meta["lat"], c_meta["lon"])
    if not weather:
        weather = enhanced_weather.get_comprehensive_weather(lat=c_meta["lat"], lon=c_meta["lon"])
    
    rainfall_rate = weather.get("rainfall_rate_mm_hr", 35.0)
    weather_cond = weather.get("weather_condition", "Heavy Monsoon Rain")
    temp_c = weather.get("current_atmosphere", {}).get("temp_c", 28.0)
    
    # 3. Process zones telemetry
    zones = state.get("zones", [])
    high_risk_zones = []
    for z in zones:
        z_name = z.get("zone_name") or z.get("name") or "Zone"
        w_depth = z.get("water_depth_cm", 0.0)
        c_level = z.get("citizen_water_level", "NORMAL")
        r_level = z.get("risk_level", "LOW")
        p_info = z.get("passability", {})
        if isinstance(p_info, dict):
            p_text = f"Walk:{'Yes' if p_info.get('walking', True) else 'No'}, Bike:{'Yes' if p_info.get('two_wheeler', True) else 'No'}, Car:{'Yes' if p_info.get('four_wheeler', True) else 'No'}, Bus:{'Yes' if p_info.get('emergency_bus', True) else 'No'}"
        else:
            p_text = "Passable"
        
        if r_level in ["HIGH", "CRITICAL"] or w_depth >= 25:
            high_risk_zones.append({
                "name": z_name,
                "water_depth_cm": w_depth,
                "citizen_level": c_level,
                "risk_level": r_level,
                "passability": p_text
            })

    safe_zones = [z.get("zone_name") or z.get("name") or "Zone" for z in zones if z.get("risk_level") == "LOW" or z.get("water_depth_cm", 0) < 15]
    all_zones_summary = [
        {"name": z.get("zone_name") or z.get("name") or "Zone", "water_depth_cm": z.get("water_depth_cm", 0.0), "status": z.get("citizen_water_level", "NORMAL")}
        for z in zones
    ]
    
    # 4. Extract verified citizen reports
    city_reports = [r for r in CITIZEN_REPORTS if r["city"].lower() == city_key]
    
    context = {
        "city_id": city_key,
        "city_name": c_meta["name"],
        "state": c_meta["state"],
        "helpline": c_meta["helpline"],
        "radar_station": c_meta.get("radar_station", "IMD Doppler Radar"),
        "rainfall_rate_mm_hr": rainfall_rate,
        "weather_condition": weather_cond,
        "temperature_c": temp_c,
        "high_risk_zones": high_risk_zones,
        "safe_corridors": safe_zones,
        "all_zones": all_zones_summary,
        "active_alerts": [a.get("headline", "") for a in state.get("alerts", [])],
        "citizen_reports": [
            {"location": r["location_name"], "depth_cm": r["water_depth_cm"], "severity": r["severity"], "description": r["description"]}
            for r in city_reports[:3]
        ],
        "user_coordinates": {"lat": req.lat, "lon": req.lon} if req.lat else "Not provided"
    }
    
    answer = gemini_service.ask_assistant(req.message, context, lang=req.lang or "en")
    return {
        "reply": answer,
        "provider": "JalRakshak AI (Gemini + Live Telemetry)",
        "city": city_key,
        "lang": req.lang or "en"
    }

@app.get("/api/weather/live")
def get_live_weather_sensor(city: str = Query("kolkata")):
    c_meta = settings.CITIES.get(city.lower(), settings.CITIES["kolkata"])
    data = openweather_svc.get_live_weather(c_meta["lat"], c_meta["lon"])
    if not data:
        # Fallback to open-meteo
        data = enhanced_weather.get_comprehensive_weather(lat=c_meta["lat"], lon=c_meta["lon"])
    return data

class CitizenReportRequest(BaseModel):
    city: str = "kolkata"
    location_name: str
    lat: float
    lon: float
    water_depth_cm: float
    severity: str = "KNEE_DEEP" # 'ANKLE_DEEP', 'KNEE_DEEP', 'SUBMERGED'
    passability: str = "SUVS_ONLY" # 'ALL_VEHICLES', 'SUVS_ONLY', 'BLOCKED'
    description: Optional[str] = ""
    reporter_name: Optional[str] = "Citizen Reporter"
    image_url: Optional[str] = None

# In-memory storage with pre-seeded verified citizen reports
CITIZEN_REPORTS = [
    {
        "report_id": "REP-CCU-8921",
        "city": "kolkata",
        "location_name": "Amherst Street near City College",
        "lat": 22.5815,
        "lon": 88.3670,
        "water_depth_cm": 45.0,
        "severity": "KNEE_DEEP",
        "passability": "SUVS_ONLY",
        "description": "Water rising rapidly near Kali Bari temple. Small hatchbacks getting stranded.",
        "reporter_name": "Arjun D. (Verified Citizen)",
        "timestamp": "12 mins ago",
        "upvotes": 28,
        "verified": True,
        "image_url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=80"
    },
    {
        "report_id": "REP-CCU-8924",
        "city": "kolkata",
        "location_name": "College Street / Surya Sen St Crossing",
        "lat": 22.5735,
        "lon": 88.3640,
        "water_depth_cm": 60.0,
        "severity": "SUBMERGED",
        "passability": "BLOCKED",
        "description": "Tram tracks completely submerged under 2 feet of water. Avoid this junction.",
        "reporter_name": "Priyanka S. (Local Resident)",
        "timestamp": "24 mins ago",
        "upvotes": 42,
        "verified": True,
        "image_url": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80"
    }
]

@app.get("/api/reports/list")
def get_citizen_reports(city: str = Query("kolkata")):
    matched = [r for r in CITIZEN_REPORTS if r["city"].lower() == city.lower()]
    return {"reports": matched, "total": len(matched)}

@app.post("/api/reports/submit")
def submit_citizen_report(req: CitizenReportRequest):
    import time
    report_id = f"REP-{req.city[:3].upper()}-{int(time.time()) % 10000}"
    new_report = {
        "report_id": report_id,
        "city": req.city.lower(),
        "location_name": req.location_name,
        "lat": req.lat,
        "lon": req.lon,
        "water_depth_cm": req.water_depth_cm,
        "severity": req.severity,
        "passability": req.passability,
        "description": req.description or "Water accumulation reported by citizen.",
        "reporter_name": req.reporter_name or "Citizen Reporter",
        "timestamp": "Just now",
        "upvotes": 1,
        "verified": True,
        "image_url": req.image_url or "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=80"
    }
    CITIZEN_REPORTS.insert(0, new_report)
    return {"status": "success", "report": new_report, "message": "Report published to live GIS network."}

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "platform": "JalRakshak Pan-India Urban Flood Early Warning",
        "version": "3.1.0",
        "cities_operational": len(settings.CITIES),
        "active_citizen_reports": len(CITIZEN_REPORTS)
    }
