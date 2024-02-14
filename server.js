// defining the server port
const port = 5000

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
app.use(cors())

// listening for port 5000
app.listen(5000, ()=> console.log(`Server is running on ${port}` ))

// API request
app.get('/', (req,res)=>{  
    
    const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
    const options = {
        method: 'GET',
        url: 'https://api.ipgeolocation.io/getip',
        // headers: {
        //     'X-RapidAPI-Key':process.env.REACT_APP_API_KEY,
        //     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        // } 
   };
   
    if ((JSON.stringify(req.headers["ip"]) != null) && (JSON.stringify(req.headers["lat"]) == null) && (JSON.stringify(req.headers["lon"]) == null) && (JSON.stringify(req.headers["search"]) == null)){
        
        axios.request(options).then(function (response) {
            ip_address = req.headers["ip"];
            options.url = `https://api.ipgeolocation.io/astronomy?apiKey=${Goe_API_KEY}&ip=${ip_address}`;
            console.log(req.headers["ip"]);
            axios.request(options).then(function (response) { 
                getWeather(response.data, options, res);

            }).catch(function (error) {
                console.error(error);
            }); 
        }).catch(function (error) {
            console.error(error);
        }); 
    }

    else if ((req.headers["search"]) == null) {
        
        
        const Weather_API_key = process.env.REACT_APP_Weather_API_key;
        options.url = `https://api.openweathermap.org/data/2.5/weather?` +
            `lat=${req.headers["lat"]}&lon=${req.headers["lon"]}&appid=${Weather_API_key}&units=metric`;

        axios.request(options).then(function (response) {
            res.json(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        
    }

    else {
        
        const Weather_API_key = process.env.REACT_APP_Weather_API_key; 

        options.url = `https://api.openweathermap.org/geo/1.0/direct?q=${req.headers["search"]}&limit=5&appid=${Weather_API_key}`;
        axios.request(options).then(function (response) {
            res.json(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    

}); 

function getWeather(geo_data, options, res){
    const Weather_API_key = process.env.REACT_APP_Weather_API_key;  
    var mergedJSON;
    options.url = `https://api.openweathermap.org/data/2.5/weather?` +
            `lat=${geo_data.location.latitude}&lon=${geo_data.location.longitude}&appid=${Weather_API_key}&units=metric`;
        
    axios.request(options).then(function (response) {
        mergedJSON = Object.assign({}, geo_data, response.data);
        res.json(mergedJSON);
    }).catch(function (error) {
        console.error(error);
    });
    
}