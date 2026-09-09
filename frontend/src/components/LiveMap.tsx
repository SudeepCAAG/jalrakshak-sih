'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { Zone } from '@/types';

interface LiveMapProps {
  zones: Zone[];
  onSelectZone: (zone: Zone) => void;
  activeRoute?: any;
  citizenReports?: any[];
}

const MapAutoCenter: React.FC<{ zones: Zone[] }> = ({ zones }) => {
  const map = useMap();
  useEffect(() => {
    if (zones && zones.length > 0) {
      const avgLat = zones.reduce((acc, z) => acc + z.center.lat, 0) / zones.length;
      const avgLon = zones.reduce((acc, z) => acc + z.center.lon, 0) / zones.length;
      map.setView([avgLat, avgLon], 13);
    }
  }, [zones, map]);
  return null;
};

const RouteAutoCenter: React.FC<{ routeCoords: [number, number][] }> = ({ routeCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (routeCoords && routeCoords.length > 1) {
      try {
        const bounds = L.latLngBounds(routeCoords.map(c => [c[0], c[1]]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
      } catch (e) {
        console.warn('Map auto fit bounds error:', e);
      }
    }
  }, [routeCoords, map]);
  return null;
};

const MapFlyToUser: React.FC<{ userLocation: [number, number] | null }> = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 15, { animate: true });
    }
  }, [userLocation, map]);
  return null;
};

export const LiveMap: React.FC<LiveMapProps> = ({ zones, onSelectZone, activeRoute, citizenReports }) => {
  const [mapType, setMapType] = useState<'streets' | 'satellite' | 'topo'>('streets');
  const [isClient, setIsClient] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setIsLocating(false);
      },
      () => {
        alert('Could not retrieve GPS location. Please allow location access in your browser.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const defaultCenter: [number, number] = userLocation 
    ? userLocation 
    : (zones.length > 0 ? [zones[0].center.lat, zones[0].center.lon] : [22.5726, 88.3639]);

  const getTileUrl = () => {
    if (mapType === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    if (mapType === 'topo') {
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  const getDepthStyle = (depth: number) => {
    if (depth >= 55.0) {
      return {
        fill: '#dc2626',
        stroke: '#991b1b',
        textColor: 'text-rose-700',
        badgeBg: 'bg-rose-600',
        badgeLabel: 'SUBMERGED',
        status: 'Closed',
        pulse: true
      };
    }
    if (depth >= 28.0) {
      return {
        fill: '#ea580c',
        stroke: '#c2410c',
        textColor: 'text-orange-700',
        badgeBg: 'bg-orange-600',
        badgeLabel: 'KNEE DEEP',
        status: 'Hazard',
        pulse: false
      };
    }
    if (depth >= 12.0) {
      return {
        fill: '#d97706',
        stroke: '#b45309',
        textColor: 'text-amber-700',
        badgeBg: 'bg-amber-500',
        badgeLabel: 'ANKLE DEEP',
        status: 'Caution',
        pulse: false
      };
    }
    return {
      fill: '#10b981',
      stroke: '#047857',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-600',
      badgeLabel: 'DRY / SAFE',
      status: 'Safe',
      pulse: false
    };
  };

  const createUserLocationIcon = () => {
    return L.divIcon({
      className: 'user-gps-pulse',
      html: `
        <div class="relative flex items-center justify-center select-none" style="transform: translate(-50%, -50%);">
          <div class="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <div class="absolute -top-7 bg-blue-900 text-white font-bold text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-md border border-blue-400">
            You are here
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  const createCitizenMarker = (name: string, depth: number) => {
    const style = getDepthStyle(depth);
    const shortName = name.split(' (')[0].split(' /')[0];
    const pulseRing = style.pulse ? 'ring-4 ring-rose-400/50 animate-pulse' : '';

    return L.divIcon({
      className: 'citizen-map-pin',
      html: `
        <div class="flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -100%);">
          <div class="bg-white/95 backdrop-blur-xs border border-stone-300 shadow-md rounded-lg px-2 py-0.5 text-[10px] font-bold text-stone-800 whitespace-nowrap mb-1 flex items-center gap-1 group-hover:scale-105 transition">
            <span class="w-1.5 h-1.5 rounded-full ${style.badgeBg}"></span>
            <span>${shortName}</span>
            <span class="${style.textColor} font-black">~${Math.round(depth)}cm</span>
          </div>
          <div class="w-7 h-7 rounded-full ${style.badgeBg} text-white flex items-center justify-center border-2 border-white shadow-lg ${pulseRing}">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  const createStartMarker = (label: string) => {
    const cleanLabel = label.split(' (')[0].split(' /')[0];
    return L.divIcon({
      className: 'route-start-pin',
      html: `
        <div class="flex flex-col items-center cursor-pointer select-none" style="transform: translate(-50%, -100%);">
          <div class="bg-blue-900/95 backdrop-blur-xs border border-blue-400 shadow-xl rounded-lg px-2.5 py-1 text-[11px] font-black text-white whitespace-nowrap mb-1 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>START: ${cleanLabel}</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-2xl ring-4 ring-blue-500/40">
            <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  const createDestMarker = (label: string) => {
    const cleanLabel = label.split(' (')[0].split(' /')[0];
    return L.divIcon({
      className: 'route-dest-pin',
      html: `
        <div class="flex flex-col items-center cursor-pointer select-none" style="transform: translate(-50%, -100%);">
          <div class="bg-rose-900/95 backdrop-blur-xs border border-rose-400 shadow-xl rounded-lg px-2.5 py-1 text-[11px] font-black text-white whitespace-nowrap mb-1 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            <span>DEST: ${cleanLabel}</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white shadow-2xl ring-4 ring-rose-500/40">
            <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
              <line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  const safeRouteCoords: [number, number][] = activeRoute?.flood_safe_route?.road_geometry && activeRoute.flood_safe_route.road_geometry.length > 1
    ? activeRoute.flood_safe_route.road_geometry
    : (activeRoute?.flood_safe_route?.waypoints
        ? activeRoute.flood_safe_route.waypoints.map((w: any) => [w.lat, w.lon])
        : []);

  const directRouteCoords: [number, number][] = activeRoute?.normal_direct_route?.road_geometry && activeRoute.normal_direct_route.road_geometry.length > 1
    ? activeRoute.normal_direct_route.road_geometry
    : (activeRoute?.normal_direct_route?.waypoints
        ? activeRoute.normal_direct_route.waypoints.map((w: any) => [w.lat, w.lon])
        : []);

  const routeForFitting = safeRouteCoords.length > 1 ? safeRouteCoords : directRouteCoords;

  if (!isClient) {
    return (
      <div className="w-full h-full min-h-[440px] bg-amber-50/50 rounded-2xl flex items-center justify-center text-stone-400 text-sm font-medium">
        Loading JalRakshak GIS Live Map &amp; Navigation Network...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden border border-amber-200/80 shadow-md bg-stone-50">
      <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
        <button
          onClick={handleLocateMe}
          title="Track My Live GPS Location"
          className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-amber-200 text-xs font-bold text-amber-900 hover:bg-amber-50 transition"
        >
          <LocateFixed className={`w-3.5 h-3.5 text-blue-600 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{userLocation ? 'GPS Active' : 'Locate Me'}</span>
        </button>

        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-stone-200">
          <button
            onClick={() => setMapType('streets')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              mapType === 'streets'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              mapType === 'satellite'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('topo')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              mapType === 'topo'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Terrain
          </button>
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapAutoCenter zones={zones} />
        <RouteAutoCenter routeCoords={routeForFitting} />
        <MapFlyToUser userLocation={userLocation} />
        
        <TileLayer
          url={getTileUrl()}
          attribution="&copy; OpenStreetMap contributors & JalRakshak GIS"
          maxZoom={18}
        />

        {userLocation && (
          <Marker position={userLocation} icon={createUserLocationIcon()}>
            <Tooltip direction="top" offset={[0, -20]} opacity={0.95}>
              <div className="text-xs font-bold text-blue-900">
                You are currently here (Live GPS)
              </div>
            </Tooltip>
          </Marker>
        )}

        {directRouteCoords.length > 1 && (
          <>
            <Polyline
              positions={directRouteCoords}
              color="#ffffff"
              weight={8}
              opacity={0.85}
              lineCap="round"
              lineJoin="round"
            />
            <Polyline
              positions={directRouteCoords}
              color="#dc2626"
              weight={4.5}
              opacity={0.95}
              dashArray="8, 12"
              lineCap="round"
              lineJoin="round"
            />
          </>
        )}

        {safeRouteCoords.length > 1 && (
          <>
            <Polyline
              positions={safeRouteCoords}
              color="#ffffff"
              weight={10}
              opacity={0.9}
              lineCap="round"
              lineJoin="round"
            />
            <Polyline
              positions={safeRouteCoords}
              color="#065f46"
              weight={7}
              opacity={0.95}
              lineCap="round"
              lineJoin="round"
            />
            <Polyline
              positions={safeRouteCoords}
              color="#10b981"
              weight={4}
              opacity={1}
              lineCap="round"
              lineJoin="round"
            />
          </>
        )}

        {activeRoute?.origin_zone && (
          <Marker 
            position={[activeRoute.origin_zone.center.lat, activeRoute.origin_zone.center.lon]}
            icon={createStartMarker(activeRoute.origin_zone.zone_name)}
          />
        )}

        {activeRoute?.destination_zone && (
          <Marker 
            position={[activeRoute.destination_zone.center.lat, activeRoute.destination_zone.center.lon]}
            icon={createDestMarker(activeRoute.destination_zone.zone_name)}
          />
        )}

        {zones.map((zone) => {
          const depthStyle = getDepthStyle(zone.water_depth_cm);

          return (
            <React.Fragment key={zone.zone_id}>
              <Circle
                center={[zone.center.lat, zone.center.lon]}
                radius={zone.radius_meters || 600}
                pathOptions={{
                  fillColor: depthStyle.fill,
                  fillOpacity: zone.water_depth_cm > 25 ? 0.38 : 0.22,
                  color: depthStyle.stroke,
                  weight: zone.water_depth_cm > 50 ? 2.8 : 1.5,
                  dashArray: zone.water_depth_cm < 15 ? '5, 5' : undefined
                }}
                eventHandlers={{
                  click: () => onSelectZone(zone),
                }}
              />

              <Marker
                position={[zone.center.lat, zone.center.lon]}
                icon={createCitizenMarker(zone.zone_name, zone.water_depth_cm)}
                eventHandlers={{
                  click: () => onSelectZone(zone),
                }}
              >
                <Tooltip direction="top" offset={[0, -32]} opacity={0.98}>
                  <div className="p-1 text-xs space-y-1 max-w-[200px]">
                    <div className="font-black text-stone-900">{zone.zone_name}</div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">Water Depth:</span>
                      <span className="font-bold text-rose-600">~{zone.water_depth_cm.toFixed(1)} cm</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">Elevation:</span>
                      <span className="font-medium text-stone-700">{zone.elevation_m}m MSL</span>
                    </div>
                    <div className="text-[10px] text-amber-700 font-semibold italic border-t border-stone-200 pt-0.5 mt-0.5">
                      {zone.ai_advisory}
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Verified Citizen Live Flood Reports */}
        {citizenReports && citizenReports.map((rep, idx) => (
          <Marker
            key={rep.report_id || idx}
            position={[rep.lat, rep.lon]}
            icon={L.divIcon({
              className: 'citizen-report-pin',
              html: `
                <div class="flex flex-col items-center cursor-pointer select-none group" style="transform: translate(-50%, -100%);">
                  <div class="bg-stone-900/95 text-white border border-cyan-400 shadow-xl rounded-lg px-2 py-0.5 text-[10px] font-bold whitespace-nowrap mb-1 flex items-center gap-1 group-hover:scale-105 transition">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    <svg class="w-2.5 h-2.5 fill-current text-cyan-300" viewBox="0 0 24 24"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                    <span>${rep.location_name.split(' (')[0].slice(0, 18)}</span>
                    <span class="text-amber-400 font-black">~${rep.water_depth_cm}cm</span>
                  </div>
                  <div class="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center border-2 border-white shadow-xl ring-4 ring-cyan-400/50">
                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                  </div>
                </div>
              `,
              iconSize: [0, 0],
              iconAnchor: [0, 0]
            })}
          >
            <Tooltip direction="top" offset={[0, -32]} opacity={0.98}>
              <div className="p-1 text-xs space-y-1.5 max-w-[220px]">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                  <span className="font-black text-stone-900">{rep.location_name}</span>
                  <span className="text-[9px] bg-cyan-100 text-cyan-900 px-1.5 py-0.2 rounded font-bold">Citizen Verified</span>
                </div>
                {rep.image_url && (
                  <img src={rep.image_url} alt="Flood snapshot" className="w-full h-20 object-cover rounded-lg shadow-xs" />
                )}
                <div className="text-[11px] text-stone-700 font-medium">
                  {rep.description}
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5 border-t border-stone-100">
                  <span>By: {rep.reporter_name}</span>
                  <span className="font-bold text-amber-600">~{rep.water_depth_cm} cm</span>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-3.5 left-3.5 z-30 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-md max-w-xs text-xs space-y-1.5 select-none">
        <div className="font-black text-stone-800 text-[11px] flex items-center justify-between">
          <span>JalRakshak Inundation Legend</span>
          <span className="text-[9px] font-medium text-stone-400">Street-level</span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="text-stone-700 font-medium">Dry / Safe (&lt;12cm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
            <span className="text-stone-700 font-medium">Ankle Deep (12–28cm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0"></span>
            <span className="text-stone-700 font-medium">Knee Deep (28–55cm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 animate-pulse"></span>
            <span className="text-stone-700 font-bold">Submerged (55cm+)</span>
          </div>
        </div>

        {activeRoute && (
          <div className="pt-1.5 border-t border-stone-200 text-[10px] space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 rounded-full bg-emerald-600"></span>
              <span className="text-emerald-800 font-bold">Recommended Flood-Safe Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 border-t-2 border-dashed border-rose-600"></span>
              <span className="text-rose-800 font-semibold">Hazardous Direct Route</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
