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

function searchCity(searchTerm, setResponse){

    

    settings.url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${Weather_API_key}`;
            $.ajax(settings).done(function (response) {
                setResponse(response);
                // if (response.length > 0)
                //     setResponse(response);
                // else 
                //     alert("Invalid City Name!");


            });
}

export default searchCity;