import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, origin, dest, mode } = this.props;
    const modeMap = new Map([["walk","hike"],["drive","car"],["bicycle","bike"],["transit","truck"]]);

    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(origin.lat,origin.lon), 
        L.latLng(dest.lat,dest.lon)],
      fitSelectedRoutes: true,
      useZoomParameter: true,
      draggableWaypoints: false,
      routeWhileDragging: false,
      router: L.Routing.graphHopper(process.env.REACT_APP_GRAPHHOPPER_API_KEY, {
        urlParameters:{
          vehicle: modeMap.get(mode)
        }
      })
    }).addTo(map.leafletElement);

    leafletElement.hide();

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);