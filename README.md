# Urban Flood Nowcasting System (Drainage & Rainfall Coupling)
> **SIH (Smart India Hackathon) Submission**
> **High-Resolution, Real-Time Street-Level Flood Inundation Prediction (0–3 Hour Lead Time)**

---

## 🌊 1. Executive Summary & Problem Context

Urban flooding in major Indian metros (Kolkata, Mumbai, Delhi, Chennai, Bengaluru) has become an acute annual crisis. Traditional Numerical Weather Prediction (NWP) models (such as GFS or ECMWF) fall short because **knowing how much rain will fall does not automatically translate into knowing which streets will flood**.

Urban flooding is a hyper-local phenomenon dictated by:
1. **Micro-Topography (Digital Elevation Models - DEM):** Localized slope variations and depressions where water converges.
2. **Surface Imperviousness:** Concrete streets and buildings prevent natural infiltration ($>90\%$ surface runoff).
3. **Underground Drainage Network:** Stormwater pipe diameter, slope, manhole capacity, and silt blockages. When surface runoff exceeds discharge capacity, **hydraulic surcharging (backflow)** forces water out of manholes onto streets.

This solution delivers a **Coupled Hydrodynamic & AI Nowcasting System** combining real-time rainfall nowcasts, high-resolution DEM elevations, and a graph-based mathematical model of the underground drainage network.

---

## 🏗️ 2. System Architecture & Scientific Workflow

```
                       ┌───────────────────────────────┐
                       │  Doppler Radar & Weather API  │
                       │     (Open-Meteo / IMD / NWP)  │
                       └──────────────┬────────────────┘
                                      │ Real-time Rain Intensity (mm/hr)
                                      ▼
                       ┌───────────────────────────────┐
                       │ 0-3h AI Nowcast Extrapolator  │
                       └──────────────┬────────────────┘
                                      │
┌────────────────────────┐            │            ┌────────────────────────┐
│  Digital Elevation DEM │            │            │ Undergound Drain Graph │
│  (Open-Meteo / SRTM)   │            │            │  (NetworkX 1D Pipes)   │
└───────────┬────────────┘            │            └───────────┬────────────┘
            │ Slope & Elevation       │                        │ Manning's Capacity
            ▼                         ▼                        ▼
    ┌───────────────────────────────────────────────────────────────────┐
    │           Coupled 2D Terrain & 1D Hydraulic Engine                │
    │  - Rational Method Runoff: Q = C * I * A                          │
    │  - Pipe Capacity (Manning): Q_cap = (1/n) * A * R^(2/3) * S^(1/2) │
    │  - Hydraulic Surcharging: Backflow Delta V = (Q - Q_cap) * dt     │
    │  - Inundation Water Depth (cm) & Composite Risk Score (0-100)     │
    └─────────────────────────────────┬─────────────────────────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Next.js GIS Web Dashboard   │              │ Flood-Safe Navigation Router │
│ - Exact Reference UI Layout  │              │ - Dynamic Weighted Dijkstra  │
│ - Satellite & Street Maps    │              │ - Dry Corridor Pathfinding   │
│ - 0-3h Forecast & Alerts     │              │ - Emergency Vehicle Routing  │
└──────────────────────────────┘              └──────────────────────────────┘
```

---

## 📡 3. Required APIs & Data Sources

| API / Data Source | Provider | Purpose | Cost |
| :--- | :--- | :--- | :--- |
| **Weather & Radar Nowcasting** | Open-Meteo Weather API | Real-time rain rate ($mm/hr$), convective precipitation, humidity, wind | **100% Free** (No API Key required) |
| **Topography (DEM)** | Open-Meteo Elevation API / SRTM | Ground elevation ($m$ above sea level) per coordinate | **100% Free** |
| **Base Map Layers** | OpenStreetMap & Esri World Imagery | High-resolution satellite earth imagery & street vector tiles | **100% Free** |
| **Drainage Network Topology** | OpenStreetMap / Municipal GIS | Manholes (nodes), Culverts/Pipes (edges), Sluice gates | **Open Data** |
| **Emergency Route Pathfinder** | Python NetworkX + Safe Routing Engine | Calculates dry path avoiding flooded road corridors | **Built-in Backend** |

---

## 🚀 4. How to Run Locally

### Prerequisites
- **Python 3.10+**
- **Node.js 18+ & npm**

### Option A: One-Click Start (Windows)
Double-click `start_all.bat` in the root folder. It will launch both the backend and frontend simultaneously.

### Option B: Manual Start

#### 1. Backend (Python FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Docs & Swagger UI: `http://127.0.0.1:8000/docs`

#### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Open browser at `http://localhost:3000`

---

## 🗺️ 5. Key Features & SIH Deliverables

1. **Pixel-Perfect Reference UI:** Exactly replicates the clean dashboard design with live metrics, color-coded zones ($Z01-Z09$), and active alerts.
2. **Interactive Multi-Layer GIS Map:** Switch smoothly between **Street View** and **High-Resolution Satellite / Google Earth Imagery**.
3. **0–3 Hour Predictive Nowcasting:** 4-step forward-looking table predicting convective rainfall trajectory and overall risk level.
4. **Hydraulic Surcharging & Depth Estimation:** Computes street water inundation depth in centimeters ($cm$) based on pipe backflow and micro-topography.
5. **Emergency Flood-Safe Pathfinding:** Interactive utility allowing ambulances, buses, and commuters to find safe dry routes that avoid submerged corridors.
6. **Simulation Lab (What-If Analysis):** Interactive sliders to test extreme cloudburst surges ($0.5x - 2.5x$) and pipe siltation blockage ($0\% - 80\%$).
