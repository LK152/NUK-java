import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import RoutingWithPOI from './components/RoutingWithPOI';
import FloatingMenu from './components/FloatingMenu';
import orangeMarker from './images/marker-icon-orange.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import './map.css';

// 自訂使用者位置圖標
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
		{
			name: string;
			lat: number;
			lng: number;
			description: string;
			image: string;
		}[]
	>([]);
	const [routeMode, setRoutingMode] = useState(false);
	const [routingKey, setRoutingKey] = useState(0); // 用來強制刷新 RoutingWithPOI
	const [currentLocation, setCurrentLocation] = useState<
		[number, number] | null
	>(null);

	// 定位使用者
	useEffect(() => {
		if (!navigator.geolocation) {
			console.warn('Geolocation not supported');
			return;
		}

		const watchId = navigator.geolocation.watchPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				setCurrentLocation([latitude, longitude]);
			},
			(err) => console.error('Geolocation error:', err),
			{
				enableHighAccuracy: true,
				maximumAge: 10000,
				timeout: 20000,
			}
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	useEffect(() => {
		axios
			.get('https://nukserver.xn--hrr.tw/spots')
			.then((res) => setSpots(res.data));
	}, []);

	const toggleRouteMode = () => {
		setRoutingMode((prev) => !prev);
		setRoutingKey((prev) => prev + 1); // 改變 key 會觸發 component 重掛載
	};

	const center: [number, number] = [22.734441337328143, 120.28448584692757];
	const bounds: [[number, number], [number, number]] = [
		[22.724854183611672, 120.2677869207884],
		[22.74233846938526, 120.29635579575306],
	];

	return (
		<div
			style={{ width: '100%', minHeight: '100vh', position: 'relative' }}
		>
			<FloatingMenu
				onRouteClick={() => setRoutingMode(true)}
				onAboutClick={() => alert('這是我們的簡介')}
				onSDGsClick={() => alert('這是SDGs永續宣導')}
				userName={username ? username : null}
				routeMode={routeMode}
			/>

			<MapContainer
				center={center}
				zoom={17}
				minZoom={17}
				maxZoom={18}
				maxBounds={bounds}
				style={{
					height: isMobile ? '100vh' : '800px',
					width: '100%',
					margin: 'auto',
				}}
			>
				<TileLayer
					attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{/* 強制重新掛載 RoutingWithPOI 組件 */}
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
