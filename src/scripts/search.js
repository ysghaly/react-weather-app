import $ from "jquery";
import isDayTime from "./isDayTime";


// const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
// const Weather_API_key = process.env.REACT_APP_Weather_API_key;     

// const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://api.ipgeolocation.io/getip`,
//     "headers": {
//         "lat": data.lat,
//         "lon": data.lon
//     },
//     "method": "GET"
// };

function getTime(timezone){
    var hours_offset = timezone / (60 * 60);
    var date = new Date();
    date.setHours(date.getHours() + hours_offset + (date.getTimezoneOffset() / 60));
    return (date.toLocaleTimeString());
}

function search(data, update){
                
    var city=data.name;
    var state=data.state;
    var country=data.country;


    const settings = {
        "async": true,
        "crossDomain": true,
        "url": process.env.REACT_APP_SERVER_URL,
        "headers": {
            "lat": data.lat,
            "lon": data.lon
        },
        "method": "GET"
    };

    // settings.url = `https://api.openweathermap.org/data/2.5/weather?` +
    //     `lat=${data.lat}&lon=${data.lon}&appid=${Weather_API_key}&units=metric`
    $.ajax(settings).done(function (response) {
        
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
        update[9](data.lat);
        update[10](data.lon);

        isDayTime(weather_icon);

    });
}

export default search;