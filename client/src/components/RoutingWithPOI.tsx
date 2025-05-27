import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

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

  // 初始化與 routeMode 切換時重設所有資料（達到刷新效果）
  useEffect(() => {
    if (routingControl) {
      try {
        routingControl.remove();
      } catch (e) {
        console.warn('清除路線控制器失敗：', e);
      }
      setRoutingControl(null);
    }
    setUserPoints([]);
    setSelectedSpots([]);
  }, [routeMode]);

  // 點擊新增使用者地點（限制 3 點）
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

  // 建立路線（只要有兩點以上就畫）
  useEffect(() => {
    if (!map || userPoints.length + selectedSpots.length < 2) return;

    if (routingControl) {
      try {
        routingControl.remove();
      } catch (err) {
        console.warn('清除舊路線錯誤：', err);
      }
    }

    const waypoints = [
      ...selectedSpots.map(s => L.latLng(s.lat, s.lng)),
      ...userPoints
    ];

    const control = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      show: false
    }).addTo(map);

    setRoutingControl(control);
  }, [userPoints, selectedSpots]);

  return (
    <>
      {routeMode && userPoints.map((pt, idx) => (
        <Marker key={`pt-${idx}`} position={pt}>
          <Popup>Routing Point {idx + 1}</Popup>
        </Marker>
      ))}

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
                    const exists = prev.find((s) => s.name === spot.name);
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