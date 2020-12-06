import React from 'react'; 
import { withStyles } from '@material-ui/styles';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';


import Routing from "./RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const styles = () => ({
  tabContainer: {
    backgroundColor: "#04034E",
    borderStyle: "solid",
    borderWidth: "3px",
    borderBottom: "0px",
    borderColor: "#04034E",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    width:"90%",
    marginTop:"10px",
  },
  tab: {
    color: "white"
  },
});

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      maxZoom: 30,
      isMapInit: false,
      tabValue: 0
    }
  }

  saveMap = map =>{
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  handleTabChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    })
  }

  render(){
    const { classes } = this.props;
    const { tabValue } = this.state;
    const { origin, dest } = this.props.loc_data;
    const center = [origin.lat,origin.lon];
    return (
      <div>
        <Tabs centered variant="fullWidth" onChange={this.handleTabChange} className={ classes.tabContainer } indicatorColor="secondary" value={tabValue}>
          <Tab className={ classes.tab } icon={ <DirectionsWalkIcon /> } aria-label="walk"/>
          <Tab className={ classes.tab } icon={ <DirectionsBikeIcon /> } aria-label="bike"/>
          <Tab className={ classes.tab } icon={ <DirectionsBusIcon /> } aria-label="bus"/>
          <Tab className={ classes.tab } icon={ <DirectionsCarIcon /> } aria-label="car"/>
        </Tabs>
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
        {this.state.isMapInit && <Routing map={this.map} origin ={origin} dest={dest}/>}
      </Map>
    </div>
    );
  };
};
   
export default withStyles(styles)(MapView);