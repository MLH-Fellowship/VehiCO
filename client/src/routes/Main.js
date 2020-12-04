import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from '../components/MapView';

const Main = (props) => {
    console.log(props.location.state);
    return (
        <div>
            <MapView />
        </div>
    )
}

export default Main;