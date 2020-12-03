import React, { Component } from 'react'; 
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Routing from "../RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class MapView extends Component {
      state = {
        lat: 22.5259,
        lng: 88.3702,
        zoom: 13,
        maxZoom: 30,
        isMapInit: false
      };
      saveMap = map =>{
        this.map = map;
        this.setState({
          isMapInit: true
        });
      };
      render(){
        const center_position = [this.state.lat,this.state.lng];
        return (
          <Map
          center = {center_position}
          zoom={this.state.zoom}
          ref={this.saveMap}>
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
          {this.state.isMapInit && <Routing map={this.map}/>}
        </Map>
        );
      };
  };
   
