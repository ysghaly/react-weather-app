import $ from "jquery";
import isDayTime from "./isDayTime";


const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
    var local_date;
    var ip_address;
const currentCity = (props) => {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:5000`,
        "method": "GET"
    };


    $.ajax(settings).done(function (response) {
        //jQuery('#countryinfo').html(response)
        ip_address = response.ip;
        props.setIp(ip_address);
        var current_time;
        var sunrise;
        var sunset;

    

        var local_date = response.date;
        var sunrise = response.sunrise;
        var sunset = response.sunset;
        var city=response.location.city;
        var state=response.location.state_prov;
        var country=response.location.country_name;
        var lat = response.location.latitude;
        var lon = response.location.longitude;

        const Weather_API_key = process.env.REACT_APP_Weather_API_key;        
        var weather_icon = response.weather[0].icon;
        var weather_desc = response.weather[0].description;
        var current_temp = response.main.temp;
        var feels_like = response.main.feels_like;
        var humidity = response.main.humidity;
        current_time = getTime(response.timezone);


        props.update[0](city);
        props.update[1](state);
        props.update[2](country);
        props.update[3](weather_icon);
        props.update[4](weather_desc);
        props.update[5](current_temp);
        props.update[6](feels_like);
        props.update[7](humidity);
        props.update[8](current_time);
        props.update[9](lat);
        props.update[10](lon);

        isDayTime(weather_icon);

    }); 

}

function getTime(timezone){
    var hours_offset = timezone / (60 * 60);
    var date = new Date();
    date.setHours(date.getHours() + hours_offset + (date.getTimezoneOffset() / 60));
    return (date.toLocaleTimeString());
}

export default currentCity;