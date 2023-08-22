import $ from "jquery";
import isDayTime from "./isDayTime";


const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
const Weather_API_key = process.env.REACT_APP_Weather_API_key;     

const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.ipgeolocation.io/getip`,
    "method": "GET"
};

const changeCity = (city, update) => {

    

    settings.url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${Weather_API_key}`;
            $.ajax(settings).done(function (response) {
                
                if (response.length > 0)
                    getCity(response, update);
                else 
                    alert("Invalid City Name!");


            });
}

function getTime(timezone){
    var hours_offset = timezone / (60 * 60);
    var date = new Date();
    date.setHours(date.getHours() + hours_offset + (date.getTimezoneOffset() / 60));
    return (date.toLocaleTimeString());
}

function getCity(response, update){
    console.log(response);
                response = response[0];
                var local_date = response.date;
                var sunrise = response.sunrise;
                var sunset = response.sunset;
                var timezone = response.timezone;


                // getWeather(response.location.latitude, response.location.longitude);
                // $('#countryinfo').append(`<h2>${response.location.city}, ${response.location.state_prov}, ${response.location.country_name} </h2>`);
            
                var city=response.name;
                var state=response.state;
                var country=response.country;
   

                settings.url = `https://api.openweathermap.org/data/2.5/weather?` +
                    `lat=${response.lat}&lon=${response.lon}&appid=${Weather_API_key}&units=metric`
                $.ajax(settings).done(function (response) {
                    // printWeather(response);
                    //jQuery('#countryinfo').html(JSON.stringify(response));

                    console.log(response);
                    
                    var current_time = getTime(response.timezone);
                    var weather_icon = response.weather[0].icon;
                    var weather_desc = response.weather[0].description;
                    var current_temp = response.main.temp;
                    var feels_like = response.main.feels_like;
                    var humidity = response.main.humidity;

                    update[0](city);
                    update[1](state);
                    update[2](country);
                    update[3](weather_icon);
                    update[4](weather_desc);
                    update[5](current_temp);
                    update[6](feels_like);
                    update[7](humidity);
                    update[8](current_time);

                    isDayTime(weather_icon);

                });
}

export default changeCity;