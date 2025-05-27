import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import RoutingWithPOI from './components/RoutingWithPOI';
import FloatingMenu from './components/FloatingMenu';
import orangeMarker from './images/marker-icon-orange.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import './map.css';

const orangeIcon = new L.Icon({
  iconUrl: orangeMarker,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
  const username = localStorage.getItem('username');
  const [spots, setSpots] = useState<
    { name: string; lat: number; lng: number; description: string; image: string }[]
  >([]);
  const [routeMode, setRoutingMode] = useState(false);
  const [routingKey, setRoutingKey] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setCurrentLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    axios
      .get('https://nukserver.xn--hrr.tw/spots')
      .then((res) => setSpots(res.data))
      .catch((err) => console.error('讀取失敗', err));
  }, []);

  const toggleRouteMode = () => {
    setRoutingMode(true);
    setRoutingKey((k) => k + 1);
  };

  const center: [number, number] = [22.734441, 120.284485];
  const bounds: [[number, number], [number, number]] = [
    [22.724854, 120.267786],
    [22.742338, 120.296355],
  ];

  const handleSearchClick = () => {
    const keyword = window.prompt('請輸入要搜尋的地標名稱');
    if (!keyword || !mapInstance) return;

    const found = spots.find((s) =>
      s.name.toLowerCase().includes(keyword.trim().toLowerCase())
    );

    if (found) {
      const latlng = L.latLng(found.lat, found.lng);
      mapInstance.setView(latlng, 18);
      L.popup()
        .setLatLng(latlng)
        .setContent(`<strong>${found.name}</strong><br>${found.description}`)
        .openOn(mapInstance);
    } else {
      alert('找不到符合的地標');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      <FloatingMenu
        onRouteClick={() => setRoutingMode(true)}
        onAboutClick={() => alert('這是我們的簡介')}
        onSDGsClick={() => alert('這是SDGs永續宣導')}
        onSearchClick={handleSearchClick}
        userName={username ? username : null}
        routeMode={routeMode}
      />

	<MapContainer
	  center={center}
	  zoom={17}
	  minZoom={17}
	  maxZoom={18}
	  maxBounds={bounds}
    whenReady={() => {
    // Use document.querySelector to get the map instance if needed, or use a ref
    }}
    ref={(node) => {
    if (node) setMapInstance(node);
    }}
	  style={{ height: isMobile ? '100vh' : '800px', width: '100%', margin: 'auto' }}
	>
	  <TileLayer
		attribution='&copy; OpenStreetMap contributors'
		url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	  />
	  <RoutingWithPOI
		key={routingKey}
		spots={spots}
		routeMode={routeMode}
	  />
	  {currentLocation && (
		<Marker position={currentLocation} icon={orangeIcon}>
		<Popup>你在這裡</Popup>
		</Marker>
	  )}
	</MapContainer>
    </div>
  );
};

export default Map;