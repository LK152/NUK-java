import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { isMobile } from 'react-device-detect';
import Routing from './components/Routing';
import axios from 'axios';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
	const [spots, setSpots] = useState<
		{ name: string; lat: number; lng: number; description: string }[]
	>([]);

	useEffect(() => {
		axios.get('http://localhost:8080/spots').then((res) => {
			setSpots(res.data);
		});
	}, []);

	const center: [number, number] = [22.734441337328143, 120.28448584692757];
	const bounds: [[number, number], [number, number]] = [
		[22.724854183611672, 120.2677869207884], // 左下
		[22.74233846938526, 120.29635579575306], // 右上
	];

	return (
		<div style={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
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
				{spots.map(({ name, lat, lng, description }) => (
					<Marker key={name} position={[lat, lng]}>
						<Popup>
							<h3 style={{ margin: 0 }}>{name}</h3>
							<p>{description}</p>
						</Popup>
					</Marker>
				))}
				<Routing />
			</MapContainer>
		</div>
	);
};

export default Map;