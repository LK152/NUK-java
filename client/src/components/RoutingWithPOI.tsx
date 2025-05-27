import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Spot類型定義
export type Spot = {
  name: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
};

interface RoutingWithPOIProps {
  spots: Spot[];
  routeMode: boolean;
}

const RoutingWithPOI: React.FC<RoutingWithPOIProps> = ({ spots, routeMode }) => {
  const map = useMap();
  const [userPoints, setUserPoints] = useState<L.LatLng[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<Spot[]>([]);
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  // 清除路線
  useEffect(() => {
    if (map && userPoints.length >= 2) {
      routingControl?.remove();
      const combined = [...selectedSpots.map(s => L.latLng(s.lat, s.lng)), ...userPoints];
      const control = L.Routing.control({
        waypoints: combined,
        routeWhileDragging: false,
        show: false,
      }).addTo(map);
      setRoutingControl(control);
    }
  }, [userPoints, selectedSpots]);

  // 為地圖設定 click 事件
    useEffect(() => {
        if (!map || !routeMode) return;

        const onClick = (e: L.LeafletMouseEvent) => {
            setUserPoints((prev) => {
            const updated = [...prev, e.latlng];
            if (updated.length > 3) updated.shift();
            return updated;
            });
        };

        map.on('click', onClick);

        return () => {
            map.off('click', onClick);
        };
    }, [map, routeMode]);

  return (
    <>
      {/* 顯示非普通點 */}
      {routeMode && userPoints.map((pt, idx) => (
        <Marker key={`pt-${idx}`} position={pt}>
          <Popup>Routing Point {idx + 1}</Popup>
        </Marker>
      ))}

      {/* 顯示 Spot 並可加入路線 */}
      {spots.map((spot) => (
        <Marker key={spot.name} position={[spot.lat, spot.lng]}>
          <Popup>
            <h3>{spot.name}</h3>
            <img
                src={`http://lukewu.site:8088/images/spots/${spot.image}`}
                alt={spot.name}
                style={{ width: '100px', borderRadius: '8px' }}
            />
            <p>{spot.description}</p>
            {routeMode && (
              <button
                onClick={() => {
                  setSelectedSpots((prev) => {
                    const exists = prev.find(s => s.name === spot.name);
                    return exists ? prev : [...prev, spot];
                  });
                }}
              >
                加入路線
              </button>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default RoutingWithPOI;