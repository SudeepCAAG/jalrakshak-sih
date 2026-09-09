import requests
from typing import List, Dict, Any
from app.config import settings

class ElevationService:
    @staticmethod
    def get_elevation_batch(coordinates: List[Dict[str, float]]) -> List[float]:
        """
        Fetch Digital Elevation Model (DEM) elevations in meters via Open-Meteo / SRTM elevation API.
        """
        lats = ",".join(str(c["lat"]) for c in coordinates)
        lons = ",".join(str(c["lon"]) for c in coordinates)
        try:
            res = requests.get(
                settings.OPEN_METEO_ELEVATION_URL,
                params={"latitude": lats, "longitude": lons},
                timeout=4
            )
            if res.status_code == 200:
                data = res.json()
                return data.get("elevation", [])
        except Exception:
            pass
        return [c.get("elevation", 5.0) for c in coordinates]

elevation_service = ElevationService()
