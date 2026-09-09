"""
Pan-India Multi-City Urban Zones & Drainage Networks Catalog.
Covers real-world flood depressions across major Indian Metros:
- Mumbai (Hindmata, Milan Subway, Kurla Mithi, Dadar, Sion, Bandra, etc.)
- Delhi-NCR (Minto Bridge, Pul Prahladpur, Pragati Maidan Tunnel, ITO, Dhaula Kuan, Kashmere Gate)
- Bengaluru (Silk Board Junction, Outer Ring Road Ecospace, Bellandur, Marathahalli, Hebbal)
- Kolkata (Thanthania Kalibari, College Street, Camac Street, EM Bypass, VIP Road Haldiram)
- Chennai (Velachery, Madipakkam, Mudichur, Vyasarpadi, Perumbakkam)
- Hyderabad (Tolichowki, Gachibowli, Begumpet, Moosarambagh, Alwal)
"""

from typing import Dict, List, Any

# Multi-City Hotspot Catalog
METRO_ZONES: Dict[str, List[Dict[str, Any]]] = {
    "mumbai": [
        {
            "zone_id": "MUM-Z01", "zone_name": "Bandra West (Hill Rd)",
            "center": {"lat": 19.0544, "lon": 72.8330}, "radius_meters": 750,
            "elevation_m": 10.5, "drainage_capacity_mm_hr": 85.0, "area_km2": 1.65,
            "critical_inlets": ["MH-BANDRA-01", "SEA-OUTFALL-01"],
            "landmark_type": "Elevated Coastal Ridge"
        },
        {
            "zone_id": "MUM-Z02", "zone_name": "Dadar TT / Plaza",
            "center": {"lat": 19.0178, "lon": 72.8478}, "radius_meters": 700,
            "elevation_m": 4.8, "drainage_capacity_mm_hr": 50.0, "area_km2": 1.55,
            "critical_inlets": ["MH-DADAR-12", "IN-PLAZA"],
            "landmark_type": "Major Traffic Junction"
        },
        {
            "zone_id": "MUM-Z03", "zone_name": "Hindmata / Parel (Bowl Depression)",
            "center": {"lat": 19.0062, "lon": 72.8425}, "radius_meters": 650,
            "elevation_m": 2.1, "drainage_capacity_mm_hr": 20.0, "area_km2": 1.85,
            "critical_inlets": ["MH-HIND-01", "PUMP-BRITANNIA-01"],
            "landmark_type": "Critical Low-Lying Surcharge Bowl"
        },
        {
            "zone_id": "MUM-Z04", "zone_name": "Santa Cruz West (SV Rd)",
            "center": {"lat": 19.0815, "lon": 72.8380}, "radius_meters": 720,
            "elevation_m": 8.2, "drainage_capacity_mm_hr": 75.0, "area_km2": 1.40,
            "critical_inlets": ["MH-STCRZ-05", "IN-SVRD"],
            "landmark_type": "Arterial Road Corridor"
        },
        {
            "zone_id": "MUM-Z05", "zone_name": "Kurla West (Mithi River Basin)",
            "center": {"lat": 19.0688, "lon": 72.8710}, "radius_meters": 800,
            "elevation_m": 2.4, "drainage_capacity_mm_hr": 25.0, "area_km2": 1.95,
            "critical_inlets": ["MH-KURLA-01", "MITHI-GULLEY-03"],
            "landmark_type": "Riverine Outfall Surcharge"
        },
        {
            "zone_id": "MUM-Z06", "zone_name": "BKC (Bandra-Kurla Complex)",
            "center": {"lat": 19.0596, "lon": 72.8656}, "radius_meters": 750,
            "elevation_m": 5.5, "drainage_capacity_mm_hr": 60.0, "area_km2": 1.70,
            "critical_inlets": ["MH-BKC-02", "CANAL-BKC-GATE"],
            "landmark_type": "Financial District Center"
        },
        {
            "zone_id": "MUM-Z07", "zone_name": "Milan Subway Underpass",
            "center": {"lat": 19.0910, "lon": 72.8430}, "radius_meters": 650,
            "elevation_m": 1.8, "drainage_capacity_mm_hr": 18.0, "area_km2": 1.35,
            "critical_inlets": ["MH-MILAN-SUBWAY", "MH-MILAN-PUMP-01"],
            "landmark_type": "Vehicular Underpass Sunk Grade"
        },
        {
            "zone_id": "MUM-Z08", "zone_name": "Sion Circle / King's Circle",
            "center": {"lat": 19.0375, "lon": 72.8615}, "radius_meters": 720,
            "elevation_m": 3.2, "drainage_capacity_mm_hr": 35.0, "area_km2": 1.65,
            "critical_inlets": ["MH-SION-01", "MH-KINGS-CIRCLE"],
            "landmark_type": "Railway Embankment Basin"
        },
        {
            "zone_id": "MUM-Z09", "zone_name": "Dharavi / Mahim Creek",
            "center": {"lat": 19.0435, "lon": 72.8520}, "radius_meters": 700,
            "elevation_m": 6.2, "drainage_capacity_mm_hr": 70.0, "area_km2": 1.50,
            "critical_inlets": ["MH-MAHIM-CREEK", "PUMP-MAHIM-02"],
            "landmark_type": "Creek Drainage Outlet"
        }
    ],

    "delhi": [
        {
            "zone_id": "DEL-Z01", "zone_name": "Minto Bridge Underpass (CP)",
            "center": {"lat": 28.6360, "lon": 77.2244}, "radius_meters": 600,
            "elevation_m": 210.2, "drainage_capacity_mm_hr": 18.0, "area_km2": 1.20,
            "critical_inlets": ["MINTO-PUMP-01", "CP-STORM-04"],
            "landmark_type": "Dangerous Railway Underpass Bowl"
        },
        {
            "zone_id": "DEL-Z02", "zone_name": "ITO Junction & Vikas Marg",
            "center": {"lat": 28.6295, "lon": 77.2435}, "radius_meters": 700,
            "elevation_m": 211.5, "drainage_capacity_mm_hr": 30.0, "area_km2": 1.60,
            "critical_inlets": ["ITO-DRAIN-12", "YAMUNA-BARRAGE-01"],
            "landmark_type": "Major Government Transit Arterial"
        },
        {
            "zone_id": "DEL-Z03", "zone_name": "Pul Prahladpur Underpass",
            "center": {"lat": 28.5020, "lon": 77.2890}, "radius_meters": 650,
            "elevation_m": 208.5, "drainage_capacity_mm_hr": 15.0, "area_km2": 1.40,
            "critical_inlets": ["PRAHLAD-PUMP-02", "MB-ROAD-INLET"],
            "landmark_type": "Chronic Deep Submersion Point"
        },
        {
            "zone_id": "DEL-Z04", "zone_name": "Pragati Maidan Tunnel Corridor",
            "center": {"lat": 28.6180, "lon": 77.2420}, "radius_meters": 700,
            "elevation_m": 209.8, "drainage_capacity_mm_hr": 25.0, "area_km2": 1.50,
            "critical_inlets": ["TUNNEL-SUMP-01", "RING-ROAD-PUMP"],
            "landmark_type": "High-Speed Vehicular Sub-Surface"
        },
        {
            "zone_id": "DEL-Z05", "zone_name": "Dhaula Kuan Flyover Ridge",
            "center": {"lat": 28.5921, "lon": 77.1610}, "radius_meters": 800,
            "elevation_m": 235.0, "drainage_capacity_mm_hr": 80.0, "area_km2": 1.80,
            "critical_inlets": ["RIDGE-GRAVITY-01"],
            "landmark_type": "Elevated Natural Ridge (Safe Corridor)"
        },
        {
            "zone_id": "DEL-Z06", "zone_name": "Kashmere Gate ISBT Ring Rd",
            "center": {"lat": 28.6675, "lon": 77.2280}, "radius_meters": 750,
            "elevation_m": 210.0, "drainage_capacity_mm_hr": 28.0, "area_km2": 1.70,
            "critical_inlets": ["ISBT-YAMUNA-GATE", "RING-NORTH-02"],
            "landmark_type": "Yamuna River Floodplain Transit"
        }
    ],

    "bengaluru": [
        {
            "zone_id": "BLR-Z01", "zone_name": "Silk Board Junction Depression",
            "center": {"lat": 12.9175, "lon": 77.6238}, "radius_meters": 700,
            "elevation_m": 892.0, "drainage_capacity_mm_hr": 22.0, "area_km2": 1.60,
            "critical_inlets": ["SILK-STORM-01", "MADIWALA-OUTFALL"],
            "landmark_type": "Chronic Bottleneck & Valley Sump"
        },
        {
            "zone_id": "BLR-Z02", "zone_name": "Outer Ring Road (Ecospace/Bellandur)",
            "center": {"lat": 12.9260, "lon": 77.6830}, "radius_meters": 850,
            "elevation_m": 888.5, "drainage_capacity_mm_hr": 20.0, "area_km2": 2.10,
            "critical_inlets": ["ECOSPACE-LAKE-OVERFLOW", "ORR-K-100"],
            "landmark_type": "Tech Corridor Wetland Depression"
        },
        {
            "zone_id": "BLR-Z03", "zone_name": "Marathahalli Bridge & Underpass",
            "center": {"lat": 12.9560, "lon": 77.7010}, "radius_meters": 650,
            "elevation_m": 894.0, "drainage_capacity_mm_hr": 28.0, "area_km2": 1.45,
            "critical_inlets": ["MARATHA-DRAIN-03"],
            "landmark_type": "Railway Crossing Inundation"
        },
        {
            "zone_id": "BLR-Z04", "zone_name": "Hebbal Flyover Junction",
            "center": {"lat": 13.0358, "lon": 77.5970}, "radius_meters": 800,
            "elevation_m": 918.0, "drainage_capacity_mm_hr": 75.0, "area_km2": 1.90,
            "critical_inlets": ["HEBBAL-LAKE-DISCHARGE"],
            "landmark_type": "Elevated Airport Corridor"
        },
        {
            "zone_id": "BLR-Z05", "zone_name": "HSR Layout Sector 6 (Kaikondrahalli)",
            "center": {"lat": 12.9120, "lon": 77.6380}, "radius_meters": 750,
            "elevation_m": 895.0, "drainage_capacity_mm_hr": 32.0, "area_km2": 1.50,
            "critical_inlets": ["HSR-RAJA-KALUVE-02"],
            "landmark_type": "Residential Valley Lowpoint"
        }
    ],

    "kolkata": [
        {
            "zone_id": "KOL-Z01", "zone_name": "Thanthania Kalibari (Bidhan Sarani)",
            "center": {"lat": 22.5805, "lon": 88.3640}, "radius_meters": 650,
            "elevation_m": 4.5, "drainage_capacity_mm_hr": 16.0, "area_km2": 1.30,
            "critical_inlets": ["THANTH-BRICK-SEWER-01", "KMC-PUMP-COLL"],
            "landmark_type": "Heritage Bowl (Severe Waterlogging)"
        },
        {
            "zone_id": "KOL-Z02", "zone_name": "College Street / Boi Para",
            "center": {"lat": 22.5744, "lon": 88.3630}, "radius_meters": 650,
            "elevation_m": 5.1, "drainage_capacity_mm_hr": 20.0, "area_km2": 1.25,
            "critical_inlets": ["COLL-ST-GULLY-02", "CU-DRAIN"],
            "landmark_type": "Historic Low Elevation Commercial Hub"
        },
        {
            "zone_id": "KOL-Z03", "zone_name": "Park Circus 7-Point Crossing",
            "center": {"lat": 22.5430, "lon": 88.3685}, "radius_meters": 700,
            "elevation_m": 5.8, "drainage_capacity_mm_hr": 30.0, "area_km2": 1.60,
            "critical_inlets": ["PARK-CIRCUS-PUMP-01"],
            "landmark_type": "Major Traffic Hub & Basin"
        },
        {
            "zone_id": "KOL-Z04", "zone_name": "EM Bypass - Ruby Hospital Junction",
            "center": {"lat": 22.5125, "lon": 88.4010}, "radius_meters": 850,
            "elevation_m": 6.8, "drainage_capacity_mm_hr": 65.0, "area_km2": 2.00,
            "critical_inlets": ["BYPASS-CANAL-03"],
            "landmark_type": "Elevated Arterial Expressway"
        },
        {
            "zone_id": "KOL-Z05", "zone_name": "VIP Road Haldiram / Airport Underpass",
            "center": {"lat": 22.6160, "lon": 88.4320}, "radius_meters": 750,
            "elevation_m": 4.8, "drainage_capacity_mm_hr": 24.0, "area_km2": 1.50,
            "critical_inlets": ["BAGJOLA-CANAL-PUMP", "VIP-HALDIRAM-01"],
            "landmark_type": "Bagjola Canal Backflow Hotspot"
        }
    ],

    "chennai": [
        {
            "zone_id": "CHE-Z01", "zone_name": "Velachery Main Rd (Lake Basin)",
            "center": {"lat": 12.9815, "lon": 80.2180}, "radius_meters": 800,
            "elevation_m": 3.2, "drainage_capacity_mm_hr": 18.0, "area_km2": 1.80,
            "critical_inlets": ["VELACHERY-CANAL-01"],
            "landmark_type": "Marshland Flood Bowl"
        },
        {
            "zone_id": "CHE-Z02", "zone_name": "Madipakkam Koot Road",
            "center": {"lat": 12.9640, "lon": 80.2010}, "radius_meters": 750,
            "elevation_m": 2.8, "drainage_capacity_mm_hr": 20.0, "area_km2": 1.60,
            "critical_inlets": ["MADI-STORM-04"],
            "landmark_type": "Severe Inundation Lowland"
        },
        {
            "zone_id": "CHE-Z03", "zone_name": "Mudichur / Tambaram West",
            "center": {"lat": 12.9230, "lon": 80.0820}, "radius_meters": 850,
            "elevation_m": 5.1, "drainage_capacity_mm_hr": 22.0, "area_km2": 2.20,
            "critical_inlets": ["ADYAR-RIVER-INFLOW"],
            "landmark_type": "Adyar River Overflow Corridor"
        },
        {
            "zone_id": "CHE-Z04", "zone_name": "T Nagar (G.N. Chetty Road)",
            "center": {"lat": 13.0418, "lon": 80.2340}, "radius_meters": 700,
            "elevation_m": 6.5, "drainage_capacity_mm_hr": 45.0, "area_km2": 1.40,
            "critical_inlets": ["MAMBALAM-CANAL-02"],
            "landmark_type": "Commercial Shopping Basin"
        }
    ],

    "hyderabad": [
        {
            "zone_id": "HYD-Z01", "zone_name": "Tolichowki (Al-Hasnath Colony)",
            "center": {"lat": 17.3990, "lon": 78.4140}, "radius_meters": 700,
            "elevation_m": 512.0, "drainage_capacity_mm_hr": 22.0, "area_km2": 1.50,
            "critical_inlets": ["TOLICHOWKI-NALA-01"],
            "landmark_type": "Nala Surcharge Valley"
        },
        {
            "zone_id": "HYD-Z02", "zone_name": "Moosarambagh Bridge (Musi River)",
            "center": {"lat": 17.3730, "lon": 78.5080}, "radius_meters": 750,
            "elevation_m": 501.0, "drainage_capacity_mm_hr": 18.0, "area_km2": 1.70,
            "critical_inlets": ["MUSI-CAUSEWAY-SUMP"],
            "landmark_type": "Causeway Submergence Point"
        },
        {
            "zone_id": "HYD-Z03", "zone_name": "Gachibowli Outer Ring Road",
            "center": {"lat": 17.4400, "lon": 78.3489}, "radius_meters": 850,
            "elevation_m": 542.0, "drainage_capacity_mm_hr": 70.0, "area_km2": 2.10,
            "critical_inlets": ["ORR-FLYOVER-DRAIN"],
            "landmark_type": "Elevated IT Expressway"
        }
    ]
}

# Backward compatibility alias
URBAN_ZONES = METRO_ZONES["mumbai"]

# Mumbai Drainage Network Nodes & Inter-Zone Road Connectivity Graph
NETWORK_NODES = {
    "MUM-Z01": {"name": "Bandra West", "lat": 19.0544, "lon": 72.8330, "elevation": 10.5},
    "MUM-Z02": {"name": "Dadar TT", "lat": 19.0178, "lon": 72.8478, "elevation": 4.8},
    "MUM-Z03": {"name": "Hindmata Parel", "lat": 19.0062, "lon": 72.8425, "elevation": 2.1},
    "MUM-Z04": {"name": "Santa Cruz West", "lat": 19.0815, "lon": 72.8380, "elevation": 8.2},
    "MUM-Z05": {"name": "Kurla West (Mithi)", "lat": 19.0688, "lon": 72.8710, "elevation": 2.4},
    "MUM-Z06": {"name": "BKC", "lat": 19.0596, "lon": 72.8656, "elevation": 5.5},
    "MUM-Z07": {"name": "Milan Subway", "lat": 19.0910, "lon": 72.8430, "elevation": 1.8},
    "MUM-Z08": {"name": "Sion Circle", "lat": 19.0375, "lon": 72.8615, "elevation": 3.2},
    "MUM-Z09": {"name": "Dharavi / Mahim", "lat": 19.0435, "lon": 72.8520, "elevation": 6.2},
    # Also support Z01-Z09 aliases
    "Z01": {"name": "Bandra West", "lat": 19.0544, "lon": 72.8330, "elevation": 10.5},
    "Z02": {"name": "Dadar TT", "lat": 19.0178, "lon": 72.8478, "elevation": 4.8},
    "Z03": {"name": "Hindmata Parel", "lat": 19.0062, "lon": 72.8425, "elevation": 2.1},
    "Z04": {"name": "Santa Cruz West", "lat": 19.0815, "lon": 72.8380, "elevation": 8.2},
    "Z05": {"name": "Kurla West (Mithi)", "lat": 19.0688, "lon": 72.8710, "elevation": 2.4},
    "Z06": {"name": "BKC", "lat": 19.0596, "lon": 72.8656, "elevation": 5.5},
    "Z07": {"name": "Milan Subway", "lat": 19.0910, "lon": 72.8430, "elevation": 1.8},
    "Z08": {"name": "Sion Circle", "lat": 19.0375, "lon": 72.8615, "elevation": 3.2},
    "Z09": {"name": "Dharavi / Mahim", "lat": 19.0435, "lon": 72.8520, "elevation": 6.2}
}

NETWORK_EDGES = [
    {"source": "MUM-Z07", "target": "MUM-Z04", "distance_km": 1.20, "pipe_diameter_m": 1.2, "road_name": "Milan Subway -> SV Road"},
    {"source": "MUM-Z04", "target": "MUM-Z01", "distance_km": 2.80, "pipe_diameter_m": 1.5, "road_name": "SV Road -> Bandra Linking Road"},
    {"source": "MUM-Z04", "target": "MUM-Z05", "distance_km": 3.40, "pipe_diameter_m": 1.8, "road_name": "Santa Cruz -> Kurla CST Road"},
    {"source": "MUM-Z01", "target": "MUM-Z06", "distance_km": 3.10, "pipe_diameter_m": 1.6, "road_name": "Bandra -> BKC Connector"},
    {"source": "MUM-Z05", "target": "MUM-Z06", "distance_km": 1.45, "pipe_diameter_m": 2.2, "road_name": "Kurla Mithi Basin -> BKC Avenue"},
    {"source": "MUM-Z06", "target": "MUM-Z08", "distance_km": 2.60, "pipe_diameter_m": 1.8, "road_name": "BKC -> Sion-Bandra Link Road"},
    {"source": "MUM-Z08", "target": "MUM-Z02", "distance_km": 2.40, "pipe_diameter_m": 1.8, "road_name": "Sion Circle -> Dadar TT"},
    {"source": "MUM-Z02", "target": "MUM-Z03", "distance_km": 1.35, "pipe_diameter_m": 2.0, "road_name": "Dadar TT -> Hindmata Parel"}
]
