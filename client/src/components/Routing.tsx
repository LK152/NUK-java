import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

// TypeScript declaration for leaflet-routing-machine
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

const Routing = () => {
  const map = useMap();
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  // 點擊地圖時加入最多三個點
  useEffect(() => {
    if (!map) return;

    const onClick = (e: L.LeafletMouseEvent) => {
      setPoints((prev) => {
        const updated = [...prev, e.latlng];
        if (updated.length > 3) updated.shift();
        return updated;
      });
    };

    map.on('click', onClick);
    return () => {
      map.off('click', onClick);
    };
  }, [map]);

  // 點擊兩個以上點時，自動更新路徑
  useEffect(() => {
    if (map && points.length >= 2) {
      // 移除先前路徑
      routingControl?.remove();

      const control = L.Routing.control({
        waypoints: points,
        routeWhileDragging: false,
        show: false,
      }).addTo(map);

      setRoutingControl(control);
    }
  }, [map, points]);

  return (
    <>
      {points.map((pt, i) => (
        <Marker key={i} position={pt}>
          <Popup>
            {i === 0 ? '起點' : i === points.length - 1 ? '終點' : `中繼點 ${i + 1}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default Routing;