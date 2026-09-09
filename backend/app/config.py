import os
from pydantic import BaseModel
from typing import Dict, Any

class Settings(BaseModel):
    PROJECT_NAME: str = "JalDrishti - National Urban Flood Nowcasting & Navigation System"
    VERSION: str = "2.5.0"
    API_V1_STR: str = "/api"
    
    # Default Coordinates (Mumbai)
    DEFAULT_LAT: float = 19.0596
    DEFAULT_LON: float = 72.8450
    DEFAULT_CITY: str = "mumbai"
    
    # Supported Major Indian Metros
    CITIES: Dict[str, Dict[str, Any]] = {
        "mumbai": {
            "name": "Mumbai Metropolitan Region",
            "state": "Maharashtra",
            "lat": 19.0760,
            "lon": 72.8777,
            "helpline": "BMC Control 1916 / 112",
            "transit_type": "Mumbai Suburban Local Trains & Metro",
            "coastal": True,
            "radar_station": "IMD Veravali & Colaba DWR"
        },
        "delhi": {
            "name": "Delhi-NCR",
            "state": "Delhi",
            "lat": 28.6139,
            "lon": 77.2090,
            "helpline": "Delhi Flood Control 1077 / 112",
            "transit_type": "Delhi Metro (DMRC) & Ring Road",
            "coastal": False,
            "radar_station": "IMD Mausam Bhavan DWR"
        },
        "bengaluru": {
            "name": "Bengaluru Urban",
            "state": "Karnataka",
            "lat": 12.9716,
            "lon": 77.5946,
            "helpline": "BBMP Sahaya 1533 / 112",
            "transit_type": "Namma Metro & Outer Ring Road Corridor",
            "coastal": False,
            "radar_station": "IMD Bengaluru DWR"
        },
        "kolkata": {
            "name": "Kolkata Metro",
            "state": "West Bengal",
            "lat": 22.5726,
            "lon": 88.3639,
            "helpline": "KMC Control 2286-1212 / 112",
            "transit_type": "Kolkata Metro & Circular Railway",
            "coastal": True,
            "radar_station": "IMD Alipore Doppler Radar"
        },
        "chennai": {
            "name": "Greater Chennai",
            "state": "Tamil Nadu",
            "lat": 13.0827,
            "lon": 80.2707,
            "helpline": "GCC Helpline 1913 / 112",
            "transit_type": "Chennai Metro & MRTS Local Trains",
            "coastal": True,
            "radar_station": "IMD Chennai Port DWR"
        },
        "hyderabad": {
            "name": "Hyderabad - GHMC",
            "state": "Telangana",
            "lat": 17.3850,
            "lon": 78.4867,
            "helpline": "GHMC Control 040-21111111 / 112",
            "transit_type": "Hyderabad Metro & PVNR Expressway",
            "coastal": False,
            "radar_station": "IMD Begumpet DWR"
        }
    }
    
    # Open-Meteo endpoint (Free, no API key required)
    OPEN_METEO_WEATHER_URL: str = "https://api.open-meteo.com/v1/forecast"
    OPEN_METEO_ELEVATION_URL: str = "https://api.open-meteo.com/v1/elevation"
    
    # Hydraulic modeling constants
    MANNING_N_CONCRETE: float = 0.013  # Smooth concrete pipe
    MANNING_N_BRICK: float = 0.015     # Aged brick sewer
    DEFAULT_RUNOFF_COEFFICIENT: float = 0.85 # Highly urbanized impervious surface

settings = Settings()
