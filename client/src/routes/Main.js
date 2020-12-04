import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from '../components/MapView';

const Main = (props) => {
    console.log(props.location.state);
    
    return (
        
        <div>
            <MapView loc_data = {props.location.state}/>
        </div>
    )
}

export default Main;