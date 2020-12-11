import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MapView from '../components/MapView';
import TripReport from '../components/TripReport';
import swal from 'sweetalert';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles({
    root: {
        marginRight: "1vw",
        marginLeft: "1vw",
    },
    logo: {
        fontSize: '4vw',
        fontWeight: "normal",
        marginBottom: '2vh',
        marginTop: '0.5vh',
    },
    logoLink: {
        color: '#04034E',
        textDecoration: 'none',
    },
    grid: {
        height: "100vh",
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
    backButton: {
        padding: "0 1vw 0 1vw",
        fontSize: "3vw",
        borderRadius: "1vw",
        border: "none",
        outline: "none",
        color: "white",
        background: "#04034E",
        '&:hover': {
            cursor: "pointer",
            transition: "transform 0.3s ease-out",
            transform: "scale(0.97)"
        },
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
        const apiUrl = "https://vehico-server.herokuapp.com";
        setIsLoading(true);
        fetch(`${apiUrl}/api?mode=${mode}&origin=${origin.lat},${origin.lon}&dest=${dest.lat},${dest.lon}`)
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200) {
                    setData(data);
                    setIsLoading(false);
                }
                else {
                    swal("Invalid trip",data.message,"error");
                }
            })
            .catch(err => console.log(err));
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

    const handleBack = () => {
        props.history.push({ 
            pathname: '/'
        });
    }

    return (
        
        <div className={classes.root}>
            <Grid container justify="center" direction="row" alignItems="center" spacing={0} className={classes.grid}>
                <Grid item xs={1}>
                    <button className={classes.backButton} onClick={handleBack}>{"<"}</button>
                </Grid>
                <Grid item xs={7}>
                    <Tabs centered variant="fullWidth" onChange={handleTabChange} className={ classes.tabContainer } indicatorColor="secondary" value={tabValue}>
                        <Tab className={ classes.tab } icon={ <DirectionsWalkIcon /> } aria-label="walk"/>
                        <Tab className={ classes.tab } icon={ <DirectionsBikeIcon /> } aria-label="bike"/>
                        <Tab className={ classes.tab } icon={ <DirectionsBusIcon /> } aria-label="bus"/>
                        <Tab className={ classes.tab } icon={ <DirectionsCarIcon /> } aria-label="car"/>
                    </Tabs>
                    <MapView origin={origin} dest={dest} mode={mode}/>
                </Grid>
                <Grid item xs={4}>
                    <h1 className={classes.logo}><a href="/" className={classes.logoLink}>VehiCO</a></h1>
                    <TripReport isLoading={isLoading} tripData={data} redirectToMap={googleMapRedirect}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main;