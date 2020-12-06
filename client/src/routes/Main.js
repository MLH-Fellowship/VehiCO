import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from '../components/MapView';

const Main = (props) => {
    return (
        <div>
            <MapView loc_data = {props.location.state}/>
        </div>
    )
}

export default Main;