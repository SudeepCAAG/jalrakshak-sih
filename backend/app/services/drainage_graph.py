import math
import networkx as nx
from typing import Dict, Any, List
from app.data.zones_data import NETWORK_NODES, NETWORK_EDGES
from app.config import settings

class DrainageGraphModel:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_graph()

    def _build_graph(self):
        """Construct the directed hydraulic drainage network graph."""
        # Add Nodes (Manholes/Inlets)
        for node_id, data in NETWORK_NODES.items():
            self.graph.add_node(
                node_id,
                name=data["name"],
                lat=data["lat"],
                lon=data["lon"],
                elevation=data["elevation"],
                inflow_m3_s=0.0,
                surcharge_volume_m3=0.0,
                is_surcharged=False
            )

        # Add Edges (Stormwater Pipes/Culverts)
        for edge in NETWORK_EDGES:
            u, v = edge["source"], edge["target"]
            dist_m = edge["distance_km"] * 1000.0
            diameter_m = edge["pipe_diameter_m"]
            
            # Elevation difference and hydraulic slope
            z_u = NETWORK_NODES[u]["elevation"]
            z_v = NETWORK_NODES[v]["elevation"]
            
            # Ensure minimum positive slope for gravity flow
            slope = max(abs(z_u - z_v) / dist_m, 0.001)
            
            # Pipe Hydraulic Properties (Full-bore Manning's Equation)
            # Area = pi * (D/2)^2
            area = math.pi * ((diameter_m / 2.0) ** 2)
            # Hydraulic Radius R = D / 4
            hydraulic_radius = diameter_m / 4.0
            # Manning's n (smooth concrete / aged culvert)
            manning_n = settings.MANNING_N_CONCRETE
            
            # Manning's Capacity Q = (1 / n) * A * (R ^ (2/3)) * (S ^ (1/2))
            capacity_m3_s = (1.0 / manning_n) * area * (hydraulic_radius ** (2.0 / 3.0)) * math.sqrt(slope)
            
            self.graph.add_edge(
                u, v,
                distance_m=dist_m,
                diameter_m=diameter_m,
                slope=slope,
                capacity_m3_s=capacity_m3_s,
                current_flow_m3_s=0.0,
                road_name=edge["road_name"]
            )

    def calculate_hydraulic_state(self, rainfall_rates: Dict[str, float], blockage_pct: float = 0.0) -> Dict[str, Any]:
        """
        Simulate hydraulic routing through graph.
        rainfall_rates: Dict[zone_id, mm_hr]
        blockage_pct: percentage (0-100) of siltation/blockage in pipes.
        """
        node_states = {}
        edge_states = []
        
        # 1. Calculate Surface Runoff Inflow at each node Q = (C * I * A) / 3600
        for node_id in self.graph.nodes:
            rain_mm_hr = rainfall_rates.get(node_id, 45.0)
            # Area ~ 1.5 km^2 = 1,500,000 m^2, C = 0.85 (Impervious concrete)
            area_m2 = 1_500_000.0
            runoff_coeff = 0.85
            
            # Inflow volume in m^3/s
            inflow_m3_s = (runoff_coeff * (rain_mm_hr / 1000.0) * area_m2) / 3600.0
            self.graph.nodes[node_id]["inflow_m3_s"] = inflow_m3_s
            
            # Calculate total outgoing pipe capacity
            out_edges = list(self.graph.out_edges(node_id, data=True))
            if out_edges:
                total_out_cap = sum(e[2]["capacity_m3_s"] * (1.0 - (blockage_pct / 100.0)) for e in out_edges)
            else:
                total_out_cap = 8.5 # Terminal outfall node
                
            # Surcharge backflow occurs when surface inflow exceeds pipe discharge capacity
            is_surcharged = inflow_m3_s > total_out_cap
            surcharge_rate = max(0.0, inflow_m3_s - total_out_cap)
            
            # Equivalent water accumulation depth (cm) over 1 hour lead time
            # Depth = (Surcharge Volume / Street Area)
            street_drainage_area_m2 = 45_000.0 # Effective street basin surface area
            accumulated_volume_m3 = surcharge_rate * 3600.0 * 0.45 # retention factor
            water_depth_cm = round((accumulated_volume_m3 / street_drainage_area_m2) * 100.0, 1)
            
            # Adjust based on topography: low elevation zones accumulate water flowing from high zones
            elev = self.graph.nodes[node_id]["elevation"]
            if elev < 3.5:
                water_depth_cm = round(water_depth_cm * 1.45 + 12.0, 1)
            elif elev < 5.0:
                water_depth_cm = round(water_depth_cm * 1.15 + 4.0, 1)
            else:
                water_depth_cm = max(0.0, round(water_depth_cm * 0.6 - 2.0, 1))
                
            node_states[node_id] = {
                "inflow_m3_s": round(inflow_m3_s, 2),
                "total_pipe_capacity_m3_s": round(total_out_cap, 2),
                "is_surcharged": is_surcharged,
                "surcharge_rate_m3_s": round(surcharge_rate, 2),
                "water_depth_cm": max(0.0, water_depth_cm),
                "elevation_m": elev
            }

        # 2. Record Edge Capacities & Bottlenecks
        for u, v, data in self.graph.edges(data=True):
            eff_cap = data["capacity_m3_s"] * (1.0 - (blockage_pct / 100.0))
            edge_states.append({
                "source": u,
                "target": v,
                "road_name": data["road_name"],
                "capacity_m3_s": round(eff_cap, 2),
                "diameter_m": data["diameter_m"],
                "slope": round(data["slope"], 4),
                "is_bottleneck": node_states[u]["is_surcharged"]
            })
            
        return {
            "node_states": node_states,
            "edge_states": edge_states
        }

drainage_graph = DrainageGraphModel()
