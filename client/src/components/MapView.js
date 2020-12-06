import React, { Component } from 'react'; 
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import FlightIcon from '@material-ui/icons/Flight';

import Routing from "./RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class MapView extends Component {
      state = {
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
        const origin_obj = this.props.loc_data.origin;
        const dest_obj = this.props.loc_data.dest;
        const center_position = [origin_obj.lat,origin_obj.lon];
        const origin = center_position;
        const dest = [dest_obj.lat,dest_obj.lon];
        return (
          <div>
          <Tabs style={{backgroundColor: "darkblue",marginLeft:"100px",width:"50.5%",height:"30px",marginTop:"10px",borderRadius:"10px"}}>
            <Tab icon={<DirectionsWalkIcon style={{ color: 'white'}}/>} aria-label="walk"/>
            <Tab icon={<DirectionsBikeIcon style={{ color: 'white' }}/>} aria-label="bike"/>
            <Tab icon={<DirectionsBusIcon style={{ color: 'white' }}/>} aria-label="bus"/>
            <Tab icon={<LocalTaxiIcon style={{ color: 'white' }}/>} aria-label="car"/>
            <Tab icon={<FlightIcon style={{ color: 'white' }}/>} aria-label="flight"/>
          </Tabs>
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
                You are here.
              </span>
          </Popup>
          </Marker>
          
          {this.state.isMapInit && <Routing map={this.map} origin ={origin} dest={dest}/>}
        </Map>
        </div>
        );
      };
  };
   
