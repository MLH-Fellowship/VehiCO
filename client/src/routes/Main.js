import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from '../components/MapView';

const Main = (props) => {
    var user_input = props.location.state;
    var origin = user_input.origin.lat+","+user_input.origin.lon;
    var dest = user_input.dest.lat+","+user_input.dest.lon;
    // fetch("http://localhost:5000/api?origin="+origin+"&dest="+dest+"&mode=drive")
    //         .then((res) => res.json())
    //         .then((data) => {
    //            console.log(data);
    //     });
    return (
        <div>
            <MapView loc_data = {props.location.state}/>
        </div>
    )
}

export default Main;