import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import startIcon from './assets/location_svgrepo.com (1).png';
import endIcon from './assets/location_svgrepo.com (2).png';
import frameIcon from './assets/Frame 334.png';

const Map = () => {

    const [currentPosition, setCurrentPosition] = useState([22.1696, 91.4996]);
    const startPoint = [22.1696, 91.4996];
    const endPoint = [22.2637, 91.7159];
    const speed = 20; //kmph
    const refreshRate = 0.5; //in seconds (2FPS)

    useEffect(() => {
        const distance = L.latLng(startPoint).distanceTo(endPoint); // in meters
        const time = (distance / 1000) / speed; // in hours
        const numSteps = Math.ceil(time / refreshRate); // total steps needed
        const stepLat = (endPoint[0] - startPoint[0]) / numSteps;
        const stepLng = (endPoint[1] - startPoint[1]) / numSteps;

        let step = 0;
        const interval = setInterval(() => {
            if (step <= numSteps) {
                const newLat = startPoint[0] + stepLat * step;
                const newLng = startPoint[1] + stepLng * step;
                setCurrentPosition([newLat, newLng]);
                step++;
            } else {
                clearInterval(interval);
            }
        }, refreshRate * 1000);

        return () => clearInterval(interval);
    }, []);


    const vesselPopupContent = (
        <div>
            <h4>Vessel position</h4>
            <p>Latitude: {currentPosition[0]}</p>
            <p>Longitude: {currentPosition[1]}</p>
        </div>
    );



    // const frameIconMarker = L.icon({
    //     // iconUrl: frameIcon,
    //     iconSize: [10, 60],
    //     iconAnchor: [10, 50],
    //     popupAnchor: [0, -20],
    //     className: 'vessel-icon',
    // });

    const frameIconMarker = L.divIcon({
        iconAnchor: [11, 50],
        popupAnchor: [0, -70],
        className: 'vessel-icon',
        html: `<img style="transform: rotate(60deg);" height="50" width="50" src="${frameIcon}">`
    });
    

    const startIconMarker = L.icon({
        iconUrl: startIcon,
        iconSize: [30, 30],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    const endIconMarker = L.icon({
        iconUrl: endIcon,
        iconSize: [30, 30],
        iconAnchor: [10, 45],
        popupAnchor: [0, -40],
    });


    return (

        <MapContainer center={currentPosition} zoom={10} scrollWheelZoom={false} className='map-container'>
            <TileLayer
                attribution='&copy;'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition} icon={frameIconMarker}>
                <Popup>
                    {vesselPopupContent}
                </Popup>
            </Marker>
            <Marker position={startPoint} icon={startIconMarker}>
                <Popup>Starting Point</Popup>
            </Marker>
            <Marker position={endPoint} icon={endIconMarker}>
                <Popup>Ending Point</Popup>
            </Marker>
        </MapContainer>
    )
};

export default Map;

