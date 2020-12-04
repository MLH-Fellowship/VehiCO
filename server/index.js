const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api_docs.json');

var bodyParser = require('body-parser')
var request = require('request-promise');
require('dotenv').config();

app.use(cors(),
        bodyParser.json())
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.get("/api", async (req, res) => {
    let origin = req.query.origin;
    let dest = req.query.dest;
    let mode = req.query.mode;
    let geoapify_token = process.env.GEOAPIFY_API_KEY;
    let distance = 0;
    let time = 0;
    let cf_val = 0;
    let route_url = "https://api.geoapify.com/v1/routing?waypoints="+origin+"|"+dest+"&mode="+mode+"&apiKey="+geoapify_token;
    await request(route_url,function(err,res,body){
        let route_info = JSON.parse(res.body).features[0].properties;
        distance = route_info.distance/1000*0.621371; //dist in miles
        time = route_info.time/60; //time in mins
    })
    let cf_url = "https://api.triptocarbon.xyz/v1/footprint?activity="+distance+"&activityType=miles&country=def&mode="+"taxi";
    await request(cf_url,function(err,res,body){
        cf_val = JSON.parse(res.body).carbonFootprint;
    });
    res.json({"cf": cf_val,"distance":distance,"time":time});
});

const port = process.env.port || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
