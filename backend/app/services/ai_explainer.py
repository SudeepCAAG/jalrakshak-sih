class AIExplainerService:
    @staticmethod
    def generate_zone_explanation(zone_name: str, rain: float, drain_cap: float, elev: float, depth_cm: float, risk_level: str) -> str:
        """
        Synthesizes hydraulic & topographic parameters into actionable municipal intelligence.
        """
        if risk_level == "HIGH":
            return (
                f"Severe hydraulic overload at {zone_name}. Real-time precipitation ({rain} mm/hr) "
                f"exceeds underground pipe discharge ({drain_cap} mm/hr) by {round(((rain - drain_cap)/drain_cap)*100)}%. "
                f"Low local elevation ({elev}m) causes depression water accumulation of ~{depth_cm}cm. Immediate dewatering required."
            )
        elif risk_level == "MEDIUM":
            return (
                f"Moderate waterlogging risk at {zone_name}. Rainfall ({rain} mm/hr) is within 85% of drainage threshold "
                f"({drain_cap} mm/hr). Upstream runoff from higher corridors may cause localized street ponding (~{depth_cm}cm)."
            )
        else:
            return (
                f"Optimal hydraulic drainage at {zone_name}. High elevation ({elev}m) and adequate storm sewer capacity "
                f"({drain_cap} mm/hr) maintain rapid gravity discharge with negligible surface retention."
            )

ai_explainer = AIExplainerService()
