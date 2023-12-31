import $ from "jquery";
import isDayTime from "./isDayTime";


const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;

const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.ipgeolocation.io/getip`,
    "method": "GET"
};

const changeCity = (city_ip, props) => {

    var ip_address = city_ip;
    
    props.ip[1](ip_address);

    settings.url = `https://api.ipgeolocation.io/astronomy?apiKey=${Goe_API_KEY}&ip=${ip_address}`;
            $.ajax(settings).done(function (response) {
                var current_time = response.current_time.slice(0,8);
                var local_date = response.date;
                var sunrise = response.sunrise;
                var sunset = response.sunset;
                var timezone = response.timezone;


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

                    props.update[0](city);
                    props.update[1](state);
                    props.update[2](country);
                    props.update[3](weather_icon);
                    props.update[4](weather_desc);
                    props.update[5](current_temp);
                    props.update[6](feels_like);
                    props.update[7](humidity);
                    props.update[8](current_time);

                    isDayTime(weather_icon);

                });


            });
}

export default changeCity;