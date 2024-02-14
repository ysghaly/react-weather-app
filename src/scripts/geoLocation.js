import $ from "jquery";
import App from "../App";
import React from "react";
import isDayTime from '../scripts/isDayTime';





const geoLocation = (root) => {

        
    var ip_address;
    const geo_settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.ipgeolocation.io/getip`,
        "method": "GET"
    };
    $.ajax(geo_settings).done(function (response) {
        ip_address = response.ip;

        
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": process.env.REACT_APP_SERVER_URL,
            "headers": {
                "ip": ip_address
            },
            "method": "GET"
        };
        
        $.ajax(settings).done(function (response) {
            //jQuery('#countryinfo').html(response)
            var ip_address = response.ip;
            var current_time;
            var sunrise;
            var sunset;
            var local_date = response.date;
            sunrise = response.sunrise;
            sunset = response.sunset;
            var city=response.location.city;
            var state=response.location.state_prov;
            var country=response.location.country_name;
            var lat = response.location.latitude;
            var lon = response.location.longitude;
            var weather_icon = response.weather[0].icon;
            var weather_desc = response.weather[0].description;
            var current_temp = response.main.temp;
            var feels_like = response.main.feels_like;
            var humidity = response.main.humidity;

            var timezone = response.timezone;
            current_time = getTime(timezone);
            var sun_s = response.sys.sunset;
            var sun_r = response.sys.sunrise;

            isDayTime(weather_icon);
            root.render(
                <React.StrictMode>
                <App time={[timezone, sun_r, sun_s, current_time, local_date]} location={[lat,lon]} ip={ip_address} city={city} state={state} country={country} weather_info={[weather_icon,weather_desc,current_temp,feels_like,humidity, current_time]} />
                </React.StrictMode>
            );


        });
    });


}




function getTime(timezone){
    var hours_offset = timezone / (60 * 60);
    var date = new Date();
    date.setHours(date.getHours() + hours_offset + (date.getTimezoneOffset() / 60));
    return (date.toLocaleTimeString());
}


export default geoLocation;