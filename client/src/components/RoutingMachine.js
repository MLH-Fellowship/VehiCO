import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(22.5259, 88.3702), L.latLng(17.3850, 78.4867)],
      fitSelectedRoutes: true,
      useZoomParameter: true,
      draggableWaypoints: false
    }).addTo(map.leafletElement);
    leafletElement.hide();
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);