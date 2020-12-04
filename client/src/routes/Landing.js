import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useDebounce from '../utils/UseDebounce';

import LeftGraphic from '../assets/left-graphic.png';
import BottomGraphic from '../assets/undraw_bike_ride.svg';

const useStyles = makeStyles({
    root: {
        width: "95vw"
    },
    logo: {
        fontSize: '5vw',
        fontWeight: "normal",
        color: '#04034E',
        marginBottom: '2vh',
        marginTop: '7vh'
    },
    tagline: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '2vw',
    },
    grid: {
        marginLeft: '1vw'
    },
    sideGrid: {
        margin: "0 1vw 0 1vw",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleGrid: {
        width: '40vw',
        height: '35vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        color: 'black',
        background: "white",
        borderRadius: "25px",
    },
    submitButton: {
        padding: "0 1.5vw 0 1.5vw",
        fontSize: "5vw",
        borderRadius: "1.3vw",
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
    bottomGraphic: {
        width: "25vw",
        height: "35vh"
    },
    inputRoot: {
        color: "purple",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white !important",
          borderRadius: "25px",
          border: "none",
        },
        "& .MuiOutlinedInput-input": {
            background: "white",
            borderRadius: "25px",
            height: "5vh"
        },
      }
  });

const Landing = (props) => {
  const classes = useStyles();

  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);
  const [originResults, setOriginResults] = useState([]);
  const [destResults, setDestResults] = useState([]);

  const debouncedOriginQuery = useDebounce(originQuery, 500);
  const debouncedDestQuery = useDebounce(destQuery, 500);


  function handleSubmit() {
    if (origin && dest) {
        let result = {
            "origin": {
                "lat": origin.properties.lat,
                "lon": origin.properties.lon,
                "label": origin.properties.formatted
            },
            "dest": {
                "lat": dest.properties.lat,
                "lon": dest.properties.lon,
                "label": dest.properties.formatted
            }
        }
    
        props.history.push({ 
            pathname: '/map',
            state: result
        });
    }
    else {
        alert("Please input an origin and destination")
    }

  }

  useEffect(() => {
    if (debouncedOriginQuery && !origin) {
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${debouncedOriginQuery}&limit=5&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            let results = data.features
            let newOptions = [];

            if (origin) {
                newOptions = [origin];
            }
    
            if (results) {
                newOptions = [...newOptions, ...results];
            }

            setOriginResults(newOptions)
        })
    }
  }, [debouncedOriginQuery, origin]);

  useEffect(() => {
    if (debouncedDestQuery && !dest) {
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${debouncedDestQuery}&limit=5&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            let results = data.features
            let newOptions = [];

            if (dest) {
                newOptions = [dest];
            }
    
            if (results) {
                newOptions = [...newOptions, ...results];
            }

            setDestResults(newOptions)
        })
    }
  }, [debouncedDestQuery, dest]);

  return (
    <div className={classes.root}>
        <h1 className={classes.logo}>VehiCO</h1>
        <h2 className={classes.tagline}> saving the planet one trip at a time </h2>
        <Grid container justify="center" spacing={5} className={classes.grid}>
            <Grid item className={classes.sideGrid}>
                <img src={LeftGraphic} alt="Map Graphic"/>
            </Grid>
            <Grid item className={classes.middleGrid}>
                <Autocomplete
                    className={classes.inputRoot}
                    fullWidth
                    getOptionLabel={(option) => option.properties.formatted}
                    options={originResults}
                    autoComplete
                    includeInputInList
                    disableClearable
                    forcePopupIcon={false}
                    value={origin}
                    onChange={(event, newOrigin) => {
                        setOrigin(newOrigin);
                        setOriginResults(newOrigin ? [newOrigin, ...originResults] : originResults);
                    }}
                    onInputChange={(event, newOriginQuery) => {
                        setOriginQuery(newOriginQuery);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                        />
                    )}
                />
                <Autocomplete
                    className={classes.inputRoot}
                    fullWidth
                    getOptionLabel={(option) => option.properties.formatted}
                    options={destResults}
                    autoComplete
                    includeInputInList
                    disableClearable
                    forcePopupIcon={false}
                    value={dest}
                    onChange={(event, newDest) => {
                        setDest(newDest);
                        setDestResults(newDest ? [newDest, ...destResults] : destResults);
                    }}
                    onInputChange={(event, newDestQuery) => {
                        setDestQuery(newDestQuery);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item className={classes.sideGrid}>
                <button className={classes.submitButton} onClick={() => handleSubmit()}>{">"}</button>
            </Grid>
        </Grid>
        <img src={BottomGraphic} alt="Bottom Graphic" className={classes.bottomGraphic}/>
    </div>
  );
}

export default Landing;
