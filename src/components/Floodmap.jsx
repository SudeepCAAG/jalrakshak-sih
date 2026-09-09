import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Floodmap = () => {
  const position = [22.5726, 88.3639];

  return (
    <div className='floodmap-1'>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> 
        <Marker position={position}>
          <Popup>
            📍 Sector V Flood Zone Monitoring
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Floodmap;