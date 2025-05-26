import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

declare module 'leaflet' {
	namespace Routing {
		interface RoutingControlOptions extends L.ControlOptions {
			waypoints?: L.LatLng[];
			routeWhileDragging?: boolean;
			show?: boolean;
		}

		class Control extends L.Control {
			constructor(options?: RoutingControlOptions);
			setWaypoints(waypoints: L.LatLng[]): void;
		}

		function control(options?: RoutingControlOptions): Control;
	}
}

const ClickRouting = () => {
	const map = useMap();
	const [points, setPoints] = useState<L.LatLng[]>([]);
	const [routingControl, setRoutingControl] =
		useState<L.Routing.Control | null>(null);

	useEffect(() => {
		if (!map) return;

		const onClick = (e: L.LeafletMouseEvent) => {
			setPoints((prev) => {
				if (prev.length === 2) {
					return [e.latlng]; // Reset with new first point
				}
				return [...prev, e.latlng];
			});
		};

		map.on('click', onClick);
		return () => {
			map.off('click', onClick);
		};
	}, [map]);

	useEffect(() => {
		if (points.length === 2 && map) {
			// Remove previous route
			routingControl?.remove();

			const control = L.Routing.control({
				waypoints: points,
				routeWhileDragging: false,
				show: false,
			}).addTo(map);

			setRoutingControl(control);
		}
	}, [points]);

	return (
		<>
			{points.map((pt, i) => (
				<Marker key={i} position={pt}>
					<Popup>{i === 0 ? 'Start' : 'End'}</Popup>
				</Marker>
			))}
		</>
	);
};

export default ClickRouting;
