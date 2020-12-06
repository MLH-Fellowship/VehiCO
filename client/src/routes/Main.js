import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MapView from '../components/MapView';
import TripReport from '../components/TripReport';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

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
    grid: {
        height: "100vh"
    },
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

const Main = (props) => {
    const { origin, dest } = props.location.state;
    const classes = useStyles();

    const modes = ["walk", "bicycle", "transit", "drive"]
    const [tabValue, setTabValue] = useState(3)
    const [mode, setMode] = useState("drive");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api?mode=${mode}&origin=${origin.lat},${origin.lon}&dest=${dest.lat},${dest.lon}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
    }, [mode, origin, dest])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setMode(modes[newValue]);
    }

    const googleMapRedirect = () => {
        const modeMap = new Map([["walk","walking"],["drive","driving"],["bicycle","bicycling"],["transit","transit"]]);
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.label}&destination=${dest.label}&travelmode=${modeMap.get(mode)}`
        window.open(url, "_blank");
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="row" alignItems="center" spacing={0} className={classes.grid}>
            <Grid item xs={7}>
                    <Tabs centered variant="fullWidth" onChange={handleTabChange} className={ classes.tabContainer } indicatorColor="secondary" value={tabValue}>
                        <Tab className={ classes.tab } icon={ <DirectionsWalkIcon /> } aria-label="walk"/>
                        <Tab className={ classes.tab } icon={ <DirectionsBikeIcon /> } aria-label="bike"/>
                        <Tab className={ classes.tab } icon={ <DirectionsBusIcon /> } aria-label="bus"/>
                        <Tab className={ classes.tab } icon={ <DirectionsCarIcon /> } aria-label="car"/>
                    </Tabs>
                    <MapView origin={origin} dest={dest} />
                </Grid>
                <Grid item xs={4}>
                    <h1 className={classes.logo}>VehiCO</h1>
                    <TripReport isLoading={isLoading} tripData={data} redirectToMap={googleMapRedirect}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main;