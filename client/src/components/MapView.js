import React from 'react'; 
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



import Routing from "./RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      maxZoom: 30,
      isMapInit: false
    }
  }

  saveMap = map =>{
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const { origin, dest, mode } = this.props;
    const center = [origin.lat,origin.lon];
    return (
      <div>
        <Map
          center = {center}
          zoom={this.state.zoom}
          ref={this.saveMap}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
        <Popup>
            <span>
              You are here.
            </span>
        </Popup>
        </Marker>
        {this.state.isMapInit && <Routing map={this.map} origin={origin} dest={dest} mode={mode}/>}
      </Map>
    </div>
    );
  };
};
   
export default MapView;