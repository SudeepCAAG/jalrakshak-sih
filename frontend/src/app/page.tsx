'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { NationalNavbar } from '@/components/NationalNavbar';
import { HeroLandingPage } from '@/components/HeroLandingPage';
import { StreetGISNowcastView } from '@/components/StreetGISNowcastView';
import { CitizenSafeNavView } from '@/components/CitizenSafeNavView';
import { MoESConsoleView } from '@/components/MoESConsoleView';
import { DisasterBulletinsView } from '@/components/DisasterBulletinsView';
import { EmergencyHelplineView } from '@/components/EmergencyHelplineView';
import { AuthorityLoginModal } from '@/components/AuthorityLoginModal';
import { AIChatAssistantModal } from '@/components/AIChatAssistantModal';
import { CAPEmergencyBroadcastBanner } from '@/components/CAPEmergencyBroadcastBanner';
import { CitizenReportModal } from '@/components/CitizenReportModal';
import { Camera } from 'lucide-react';

import { ZoneDetailModal } from '@/components/ZoneDetailModal';
import { SimulationModal } from '@/components/SimulationModal';
import { SystemInfoModal } from '@/components/SystemInfoModal';
import { NationalFooter } from '@/components/NationalFooter';

import { Zone, SystemOverview, NowcastForecastItem, ActiveAlertItem } from '@/types';
import { translations, Language } from '@/utils/translations';
import { API_BASE_URL } from '@/utils/apiConfig';

// Reliable initial zones catalog for all 6 Indian Metros
const DEFAULT_ZONES_BY_CITY: Record<string, Zone[]> = {
  kolkata: [
    {
      zone_id: 'CCU-Z01', zone_name: 'Thanthania Kalibari (Amherst St)',
      center: { lat: 22.5830, lon: 88.3680 }, radius_meters: 600,
      rainfall_mm_hr: 78.0, elevation_m: 4.2, drainage_capacity_mm_hr: 16.0,
      risk_score: 96, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 120.0,
      surcharged_nodes_count: 2, critical_inlets: ['THANTHANIA-SUMP-01'],
      ai_advisory: 'Severe bowl accumulation. Amherst St waterlogged.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'CCU-Z02', zone_name: 'College Street / Boi Para',
      center: { lat: 22.5744, lon: 88.3629 }, radius_meters: 650,
      rainfall_mm_hr: 72.0, elevation_m: 4.8, drainage_capacity_mm_hr: 20.0,
      risk_score: 91, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 100.0,
      surcharged_nodes_count: 1, critical_inlets: ['COLLEGE-DRAIN-01'],
      ai_advisory: 'Trams suspended due to deep standing water.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'CCU-Z03', zone_name: 'EM Bypass - Ruby Hospital',
      center: { lat: 22.5125, lon: 88.4028 }, radius_meters: 800,
      rainfall_mm_hr: 28.0, elevation_m: 7.2, drainage_capacity_mm_hr: 80.0,
      risk_score: 18, risk_level: 'LOW', trend: 'steady', water_depth_cm: 2.0,
      surcharged_nodes_count: 0, critical_inlets: ['BYPASS-CULVERT-02'],
      ai_advisory: 'Arterial bypass fully passable.',
      citizen_water_level: 'DRY / PASSABLE'
    },
    {
      zone_id: 'CCU-Z04', zone_name: 'Park Street & Camac St',
      center: { lat: 22.5510, lon: 88.3524 }, radius_meters: 650,
      rainfall_mm_hr: 45.0, elevation_m: 6.0, drainage_capacity_mm_hr: 55.0,
      risk_score: 48, risk_level: 'MEDIUM', trend: 'steady', water_depth_cm: 18.0,
      surcharged_nodes_count: 1, critical_inlets: ['PARK-STORM-01'],
      ai_advisory: 'Slow movement near flyover base. Ankle deep water.',
      citizen_water_level: 'ANKLE DEEP'
    }
  ],
  mumbai: [
    {
      zone_id: 'MUM-Z01', zone_name: 'Bandra West (Hill Rd)',
      center: { lat: 19.0544, lon: 72.8330 }, radius_meters: 750,
      rainfall_mm_hr: 35.0, elevation_m: 10.5, drainage_capacity_mm_hr: 85.0,
      risk_score: 15, risk_level: 'LOW', trend: 'steady', water_depth_cm: 2.0,
      surcharged_nodes_count: 0, critical_inlets: ['MH-BANDRA-01', 'SEA-OUTFALL-01'],
      ai_advisory: 'Elevated coastal ridge maintains rapid gravity drainage.',
      citizen_water_level: 'DRY / PASSABLE'
    },
    {
      zone_id: 'MUM-Z02', zone_name: 'Dadar TT / Plaza',
      center: { lat: 19.0178, lon: 72.8478 }, radius_meters: 700,
      rainfall_mm_hr: 55.0, elevation_m: 4.8, drainage_capacity_mm_hr: 50.0,
      risk_score: 62, risk_level: 'MEDIUM', trend: 'increasing', water_depth_cm: 26.0,
      surcharged_nodes_count: 1, critical_inlets: ['MH-DADAR-12'],
      ai_advisory: 'Moderate traffic congestion; water accumulating near tram shed.',
      citizen_water_level: 'ANKLE DEEP'
    },
    {
      zone_id: 'MUM-Z03', zone_name: 'Hindmata / Parel (Bowl)',
      center: { lat: 19.0062, lon: 72.8425 }, radius_meters: 650,
      rainfall_mm_hr: 75.0, elevation_m: 2.1, drainage_capacity_mm_hr: 20.0,
      risk_score: 95, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 82.0,
      surcharged_nodes_count: 3, critical_inlets: ['MH-HIND-01', 'PUMP-BRITANNIA-01'],
      ai_advisory: 'Severe hydraulic surcharge. Low-lying bowl depression submerged.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'MUM-Z07', zone_name: 'Milan Subway Underpass',
      center: { lat: 19.0910, lon: 72.8430 }, radius_meters: 650,
      rainfall_mm_hr: 72.0, elevation_m: 1.8, drainage_capacity_mm_hr: 18.0,
      risk_score: 92, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 78.0,
      surcharged_nodes_count: 2, critical_inlets: ['MH-MILAN-SUBWAY'],
      ai_advisory: 'Railway underpass sunk grade submerged. Closed to light vehicles.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    }
  ],
  delhi: [
    {
      zone_id: 'DEL-Z01', zone_name: 'Minto Bridge Underpass (CP)',
      center: { lat: 28.6360, lon: 77.2244 }, radius_meters: 600,
      rainfall_mm_hr: 70.0, elevation_m: 210.2, drainage_capacity_mm_hr: 18.0,
      risk_score: 94, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 85.0,
      surcharged_nodes_count: 2, critical_inlets: ['MINTO-PUMP-01'],
      ai_advisory: 'Severe depression inundation. High risk of bus submersion.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'DEL-Z02', zone_name: 'ITO Junction & Vikas Marg',
      center: { lat: 28.6295, lon: 77.2435 }, radius_meters: 700,
      rainfall_mm_hr: 50.0, elevation_m: 211.5, drainage_capacity_mm_hr: 30.0,
      risk_score: 72, risk_level: 'MEDIUM', trend: 'increasing', water_depth_cm: 32.0,
      surcharged_nodes_count: 1, critical_inlets: ['ITO-DRAIN-12'],
      ai_advisory: 'Moderate waterlogging; slow traffic towards Yamuna bridge.',
      citizen_water_level: 'KNEE DEEP'
    },
    {
      zone_id: 'DEL-Z03', zone_name: 'Pul Prahladpur Underpass',
      center: { lat: 28.5020, lon: 77.2890 }, radius_meters: 650,
      rainfall_mm_hr: 68.0, elevation_m: 208.5, drainage_capacity_mm_hr: 15.0,
      risk_score: 89, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 65.0,
      surcharged_nodes_count: 1, critical_inlets: ['PRAHLAD-PUMP-01'],
      ai_advisory: 'Sunken railway underpass blocked. Diverted via Mehrauli-Badarpur.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'DEL-Z05', zone_name: 'Dhaula Kuan Ridge Junction',
      center: { lat: 28.5925, lon: 77.1645 }, radius_meters: 800,
      rainfall_mm_hr: 28.0, elevation_m: 242.0, drainage_capacity_mm_hr: 90.0,
      risk_score: 12, risk_level: 'LOW', trend: 'steady', water_depth_cm: 1.5,
      surcharged_nodes_count: 0, critical_inlets: ['RIDGE-DRAIN-01'],
      ai_advisory: 'Elevated ridge terrain ensures high velocity natural runoff.',
      citizen_water_level: 'DRY / PASSABLE'
    }
  ],
  bengaluru: [
    {
      zone_id: 'BLR-Z01', zone_name: 'Silk Board Junction Depression',
      center: { lat: 12.9175, lon: 77.6238 }, radius_meters: 700,
      rainfall_mm_hr: 66.5, elevation_m: 892.0, drainage_capacity_mm_hr: 22.0,
      risk_score: 91, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 71.2,
      surcharged_nodes_count: 1, critical_inlets: ['SILK-STORM-01'],
      ai_advisory: 'Severe bottleneck at Silk Board. Valley sump inundation.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    },
    {
      zone_id: 'BLR-Z02', zone_name: 'Outer Ring Road (Bellandur Ecospace)',
      center: { lat: 12.9260, lon: 77.6762 }, radius_meters: 800,
      rainfall_mm_hr: 75.0, elevation_m: 888.0, drainage_capacity_mm_hr: 18.0,
      risk_score: 96, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 120.0,
      surcharged_nodes_count: 2, critical_inlets: ['ECOSPACE-OUTFALL-01'],
      ai_advisory: 'Severe flooding across tech corridor. Road closed.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    }
  ],
  chennai: [
    {
      zone_id: 'MAA-Z01', zone_name: 'Velachery Lake Basin & MRTS',
      center: { lat: 12.9790, lon: 80.2185 }, radius_meters: 750,
      rainfall_mm_hr: 76.0, elevation_m: 5.2, drainage_capacity_mm_hr: 19.0,
      risk_score: 95, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 95.0,
      surcharged_nodes_count: 2, critical_inlets: ['VELACHERY-DRAIN-01'],
      ai_advisory: 'Lake overflow into residential streets. Submerged.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    }
  ],
  hyderabad: [
    {
      zone_id: 'HYD-Z01', zone_name: 'Tolichowki Nala & Al-Hasnath',
      center: { lat: 17.3990, lon: 78.4160 }, radius_meters: 700,
      rainfall_mm_hr: 70.0, elevation_m: 512.0, drainage_capacity_mm_hr: 24.0,
      risk_score: 90, risk_level: 'HIGH', trend: 'increasing', water_depth_cm: 80.0,
      surcharged_nodes_count: 2, critical_inlets: ['TOLICHOWKI-NALA-01'],
      ai_advisory: 'Nala bank overflow inundates residential flyover base.',
      citizen_water_level: 'DANGEROUSLY SUBMERGED'
    }
  ]
};

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState('kolkata');
  const [activePage, setActivePage] = useState<'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency'>('home');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [zones, setZones] = useState<Zone[]>(DEFAULT_ZONES_BY_CITY.kolkata);
  const [forecast, setForecast] = useState<NowcastForecastItem[]>([]);
  const [alerts, setAlerts] = useState<ActiveAlertItem[]>([]);
  const [citizenReports, setCitizenReports] = useState<any[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals state
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Simulation parameters
  const [simRainMultiplier, setSimRainMultiplier] = useState(1.0);
  const [simBlockagePct, setSimBlockagePct] = useState(0.0);

  const fetchSystemData = useCallback(async (
    city = selectedCity, 
    rainMult = simRainMultiplier, 
    blockPct = simBlockagePct
  ) => {
    setIsRefreshing(true);
    try {
      const [overviewRes, zonesRes, forecastRes, alertsRes, reportsRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/api/overview?city=${city}&rain_multiplier=${rainMult}&blockage_pct=${blockPct}`),
        axios.get(`${API_BASE_URL}/api/zones?city=${city}&rain_multiplier=${rainMult}&blockage_pct=${blockPct}`),
        axios.get(`${API_BASE_URL}/api/forecast?city=${city}&rain_multiplier=${rainMult}`),
        axios.get(`${API_BASE_URL}/api/alerts?city=${city}&rain_multiplier=${rainMult}&blockage_pct=${blockPct}`),
        axios.get(`${API_BASE_URL}/api/reports/list?city=${city}`),
      ]);

      if (overviewRes.status === 'fulfilled') setOverview(overviewRes.value.data);
      if (zonesRes.status === 'fulfilled' && zonesRes.value.data?.zones?.length > 0) {
        setZones(zonesRes.value.data.zones);
      } else {
        setZones(DEFAULT_ZONES_BY_CITY[city] || DEFAULT_ZONES_BY_CITY.kolkata);
      }
      if (forecastRes.status === 'fulfilled') setForecast(forecastRes.value.data.forecast);
      if (alertsRes.status === 'fulfilled') setAlerts(alertsRes.value.data.alerts);
      if (reportsRes.status === 'fulfilled' && reportsRes.value.data?.reports) {
        setCitizenReports(reportsRes.value.data.reports);
      }
    } catch (err) {
      console.warn('Backend API standby, using synchronized dataset:', err);
      setZones(DEFAULT_ZONES_BY_CITY[city] || DEFAULT_ZONES_BY_CITY.kolkata);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedCity, simRainMultiplier, simBlockagePct]);

  useEffect(() => {
    fetchSystemData(selectedCity);
  }, [selectedCity, fetchSystemData]);

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    setZones(DEFAULT_ZONES_BY_CITY[cityId] || DEFAULT_ZONES_BY_CITY.kolkata);
    fetchSystemData(cityId, simRainMultiplier, simBlockagePct);
  };

  const handleApplySimulation = (rainMult: number, blockPct: number) => {
    setSimRainMultiplier(rainMult);
    setSimBlockagePct(blockPct);
    fetchSystemData(selectedCity, rainMult, blockPct);
  };

  const handlePageNavigation = (page: 'home' | 'gis-nowcast' | 'safe-nav' | 'moes-console' | 'bulletins' | 'emergency') => {
    if (page === 'moes-console' && !isAuthorized) {
      setIsAuthModalOpen(true);
      return;
    }
    setActivePage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-cyan-500 selection:text-white">
      {/* Official National Top Navbar */}
      <NationalNavbar
        overview={overview}
        activePage={activePage}
        onSelectPage={handlePageNavigation}
        selectedCity={selectedCity}
        onSelectCity={handleCityChange}
        onRefresh={() => fetchSystemData(selectedCity, simRainMultiplier, simBlockagePct)}
        isRefreshing={isRefreshing}
        isAuthorized={isAuthorized}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogoutAuth={() => {
          setIsAuthorized(false);
          setActivePage('home');
        }}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* Feature 3: CAP Priority Emergency Siren & Broadcast Alert Banner */}
        <CAPEmergencyBroadcastBanner
          currentLang={currentLang}
          selectedCity={selectedCity}
          onNavigateSafeNav={() => handlePageNavigation('safe-nav')}
          onNavigateEmergency={() => handlePageNavigation('emergency')}
        />

        {/* PAGE 1: National Mission Hero Page */}
        {activePage === 'home' && (
          <HeroLandingPage
            overview={overview}
            zones={zones}
            selectedCity={selectedCity}
            onSelectCity={handleCityChange}
            onNavigatePage={handlePageNavigation}
            onSelectZone={(zone) => setSelectedZone(zone)}
            currentLang={currentLang}
            citizenReports={citizenReports}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* PAGE 2: Street-Level Dynamic GIS Nowcasting (0–3h Window) */}
        {activePage === 'gis-nowcast' && (
          <StreetGISNowcastView
            zones={zones}
            overview={overview}
            forecast={forecast}
            alerts={alerts}
            onSelectZone={(zone) => setSelectedZone(zone)}
            onApplySimulationMultiplier={(mult) => setSimRainMultiplier(mult)}
            citizenReports={citizenReports}
          />
        )}

        {/* PAGE 3: Citizen & Emergency Flood-Safe Navigation */}
        {activePage === 'safe-nav' && (
          <CitizenSafeNavView
            zones={zones}
            overview={overview}
            selectedCity={selectedCity}
            onSelectZone={(zone) => setSelectedZone(zone)}
          />
        )}

        {/* PAGE 4: Emergency Helplines & SOS Dispatch */}
        {activePage === 'emergency' && (
          <EmergencyHelplineView
            overview={overview}
            selectedCity={selectedCity}
            currentLang={currentLang}
          />
        )}

        {/* PAGE 5: Ministry of Earth Sciences & Municipal Console (Password Protected) */}
        {activePage === 'moes-console' && isAuthorized && (
          <MoESConsoleView
            overview={overview}
            zones={zones}
            onApplySimulation={handleApplySimulation}
          />
        )}

        {/* PAGE 6: Official Disaster Bulletins & Reports */}
        {activePage === 'bulletins' && (
          <DisasterBulletinsView
            overview={overview}
            zones={zones}
          />
        )}
      </main>

      {/* Premium Multi-Column National Disaster Resilience Footer */}
      <NationalFooter
        onNavigatePage={handlePageNavigation}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isAuthorized={isAuthorized}
        selectedCity={selectedCity}
        onSelectCity={handleCityChange}
      />



      {/* Citizen Flood Report Modal */}
      <CitizenReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedCity={selectedCity}
        currentLang={currentLang}
        onReportSubmitted={(newRep) => setCitizenReports(prev => [newRep, ...prev])}
      />

      {/* AI Assistant Modal */}
      <AIChatAssistantModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        currentCity={selectedCity}
        currentLang={currentLang}
      />

      {/* Authority Passcode Modal */}
      <AuthorityLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthorized(true);
          setActivePage('moes-console');
        }}
      />

      {/* Inspection Modals */}
      <ZoneDetailModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />

      <SimulationModal
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        onApplySimulation={handleApplySimulation}
      />

      <SystemInfoModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
