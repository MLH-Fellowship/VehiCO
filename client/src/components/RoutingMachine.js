import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement(props) {
    const { map } = props.props;
    const { origin } = props.props.origin;
    const { dest } = props.props.dest;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(origin[0],origin[1]), 
        L.latLng(dest[0],dest[1])],
      fitSelectedRoutes: true,
      useZoomParameter: true,
      draggableWaypoints: false,
      routeWhileDragging: false,
      router: L.Routing.graphHopper(process.env.REACT_APP_GRAPHHOPPER_API_KEY, {
        urlParameters:{
          vehicle:'hike'
        }
      })
    }).addTo(map.leafletElement);
    leafletElement.hide();
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);