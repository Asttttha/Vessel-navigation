import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import startIcon from './assets/location_svgrepo.com (1).png';
import endIcon from './assets/location_svgrepo.com (2).png';
import frameIcon from './assets/Frame 334.png';

const Map = ({ startingCoordinates, endingCoordinates, currentPosition }) => {

    //icons
    const startIconUrl = startIcon;
    const endIconUrl = endIcon;
    const frameIconUrl = frameIcon;

    //icon size
    const startIconSize = [24, 24];
    const endIconSize = [24, 24];
    const frameIconSize = [10, 60];

    //icon amchor
    const startIconAnchor = [12, 12];
    const endIconAnchor = [12, 12];
    const frameIconAnchor = [2, 24];

    //properties
    const startIconOptions = {
        iconUrl: startIconUrl,
        iconSize: startIconSize,
        iconAnchor: startIconAnchor
    };

    const endIconOptions = {
        iconUrl: endIconUrl,
        iconSize: endIconSize,
        iconAnchor: endIconAnchor
    };

    const frameIconOptions = {
        iconUrl: frameIconUrl,
        iconSize: frameIconSize,
        iconAnchor: frameIconAnchor
    };

    const customStartIcon = L.icon(startIconOptions);
    const customEndIcon = L.icon(endIconOptions);
    const customFrameIcon = L.icon(frameIconOptions);

    //vessel position and updates
    const [vesselPosition, setVesselPosition] = useState(startingCoordinates);

    useEffect(() => {
        const totalDistance = calculateDistance(startingCoordinates, endingCoordinates);
        const totalTime = (totalDistance / 20) * 3600; // Assuming speed of 20 m/s
        const intervals = Math.ceil(totalTime / 500); // 500 ms intervals for 2FPS

        let currentInterval = 0;
        const updatePosition = setInterval(() => {
            console.log('Interval triggered');
            if (currentInterval >= intervals) {
                clearInterval(updatePosition);
            } else {
                const fraction = (currentInterval + 1) / intervals;
                const lat = startingCoordinates[0] + fraction * (endingCoordinates[0] - startingCoordinates[0]);
                const lng = startingCoordinates[1] + fraction * (endingCoordinates[1] - startingCoordinates[1]);

                setVesselPosition([lat, lng]);
                console.log('Vessel position:', [lat, lng]);
                currentInterval++;

            }
        }, 500); // Interval duration set to 500ms

        return () => clearInterval(updatePosition);
    }, [startingCoordinates, endingCoordinates]);

    return (
        <MapContainer center={currentPosition} zoom={10} scrollWheelZoom={false} className='map-container'>
            <TileLayer
                attribution='&copy;'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={vesselPosition} icon={customFrameIcon}>
                <Popup>
                    Vessel Position <br /> Lat: {vesselPosition[0]}, Long: {vesselPosition[1]}
                </Popup>
            </Marker>
            <Marker position={startingCoordinates} icon={customStartIcon}>
                <Popup>Starting Point</Popup>
            </Marker>
            <Marker position={endingCoordinates} icon={customEndIcon}>
                <Popup>End Point</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;

function calculateDistance(coord1, coord2) {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}
