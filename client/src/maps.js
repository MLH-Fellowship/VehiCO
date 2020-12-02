import React from 'react'; 
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
      const center_position = [22.5259,88.3702];
      return (
        <MapContainer
        className="map"
        center = {[center_position[0],center_position[1]]}
        zoom={16}
        maxZoom={30}
        >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center_position}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
        </Marker>
      </MapContainer>
      );
  };
export default MapView;
   
