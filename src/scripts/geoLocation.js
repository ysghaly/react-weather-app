import $ from "jquery";
import App from "../App";
import React from "react";
import isDayTime from '../scripts/isDayTime';




const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
    var local_date;
    var ip_address;
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.ipgeolocation.io/getip`,
            "method": "GET"
        };

const geoLocation = (root) => {
    
    $.ajax(settings).done(function (response) {
        //jQuery('#countryinfo').html(response)
        ip_address = response.ip;
        var current_time;
        var sunrise;
        var sunset;

                

        settings.url = `https://api.ipgeolocation.io/astronomy?apiKey=${Goe_API_KEY}&ip=${ip_address}`;
            $.ajax(settings).done(function (response) {
                current_time = response.current_time.slice(0,8);
                local_date = response.date;
                sunrise = response.sunrise;
                sunset = response.sunset;
                // getWeather(response.location.latitude, response.location.longitude);
                // $('#countryinfo').append(`<h2>${response.location.city}, ${response.location.state_prov}, ${response.location.country_name} </h2>`);
            
                var city=response.location.city;
                var state=response.location.state_prov;
                var country=response.location.country_name;

                const Weather_API_key = process.env.REACT_APP_Weather_API_key;        

                settings.url = `https://api.openweathermap.org/data/2.5/weather?` +
                    `lat=${response.location.latitude}&lon=${response.location.longitude}&appid=${Weather_API_key}&units=metric`
                $.ajax(settings).done(function (response) {
                    // printWeather(response);
                    //jQuery('#countryinfo').html(JSON.stringify(response));

                    var weather_icon = response.weather[0].icon;
                    var weather_desc = response.weather[0].description;
                    var current_temp = response.main.temp;
                    var feels_like = response.main.feels_like;
                    var humidity = response.main.humidity;

                    var timezone = response.timezone;
                    var sun_s = response.sys.sunset;
                    var sun_r = response.sys.sunrise;

                    isDayTime(weather_icon);
                    root.render(
                      <React.StrictMode>
                        <App time={[timezone, sun_r, sun_s, current_time, local_date]} ip={ip_address} city={city} state={state} country={country} weather_info={[weather_icon,weather_desc,current_temp,feels_like,humidity, current_time]} />
                      </React.StrictMode>
                    );


                });


            });

        
    });
    


    
};


export default geoLocation;