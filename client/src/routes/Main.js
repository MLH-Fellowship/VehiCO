import React from 'react';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MapView from '../components/MapView';
import TripReport from '../components/TripReport';

const useStyles = makeStyles({
    root: {
        marginRight: "2vw",
        marginLeft: "2vw",
    },
    logo: {
        fontSize: '4vw',
        fontWeight: "normal",
        color: '#04034E',
        marginBottom: '2vh',
        marginTop: '0.5vh'
    },
});

const Main = (props) => {
    const classes = useStyles();
    // console.log(props.location.state);;
    var user_input = props.location.state;
    var origin = user_input.origin.lat+","+user_input.origin.lon;
    var dest = user_input.dest.lat+","+user_input.dest.lon;
    fetch("http://localhost:5000/api?origin="+origin+"&dest="+dest+"&mode=drive")
            .then((res) => res.json())
            .then((data) => {
               console.log("info:",data);
               const info = JSON.parse(data);
        });
    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="row" alignItems="center" spacing={0} className={classes.grid}>
            <Grid item xs={7}>
                    <MapView loc_data = {props.location.state}/>
                </Grid>
                <Grid item xs={4}>
                    <h1 className={classes.logo}>VehiCO</h1>
                    <TripReport/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main;