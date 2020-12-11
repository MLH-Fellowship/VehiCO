const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api_docs.json');

var bodyParser = require('body-parser')
var request = require('request-promise');
require('dotenv').config();

const KG_PER_TON = 907;
const SEC_PER_MIN = 60;
const METER_PER_MILE = 1609;

app.use(cors(),
        bodyParser.json())
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.get("/api", async (req, res) => {
    const { origin, dest, mode } = req.query;
    const mode_map = new Map([["walk","walk"],["drive","petrolCar"],["bicycle","bicycle"],["transit","bus"]]);
    const trip_mode = mode_map.get(mode);
    let geoapify_token = process.env.GEOAPIFY_API_KEY;
    let distance = 0;
    let time = 0;
    let cf_val = 0;
    let route_url = "https://api.geoapify.com/v1/routing?waypoints="+origin+"|"+dest+"&mode="+mode+"&apiKey="+geoapify_token;
    const geoopt = {
        method: "GET",
        uri: route_url
    }
    await request(geoopt).then(function(result){
        let route_info = JSON.parse(result).features[0].properties;
        distance = route_info.distance/ METER_PER_MILE; //dist in miles
        time = route_info.time / SEC_PER_MIN; //time in mins
    })
    .catch(function(err){
        return res.status(400).json(JSON.parse(err.error));
    });

    // Fetch TripToCarbon API if mode is not walk or bicycle
    if (trip_mode !== "walk" && trip_mode !== "bicycle" && distance !== 0) {
        let cf_url = "https://api.triptocarbon.xyz/v1/footprint?activity="+distance+"&activityType=miles&country=def&mode="+trip_mode;
        const ttopt = {
            method: "GET",
            uri: cf_url
        }
        await request(ttopt).then(function(result){
            cf_val = JSON.parse(result).carbonFootprint / KG_PER_TON;
        })
        .catch(function(err){
            return res.status(400).json(JSON.parse(err.error));
        });
    }

    res.status(200).json({"statusCode": 200, "cf": cf_val, "distance": distance, "time": time});
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})