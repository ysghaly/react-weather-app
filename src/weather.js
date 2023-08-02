import $ from "jquery"
import './weather.css'


function Weather() {
    return (
      <div className="Weather">
        <div id="top">
            
        <div>Refresh <br></br><span className="refresh">&#x21bb;</span><br/><br/></div>
        <button id="update">Current Location</button>
        <label>Other Cities: </label>
        <select id="select_city" onChange={changeWeather}>
            <option value=""></option>
            <option value="174.0.182.145">Calgary</option>
            <option value="23.236.229.228">Hamilton</option>
            <option value="158.69.60.97">Montreal</option>
            <option value="188.244.45.250">Moscow</option>
            <option value="210.146.35.2">Tokyo</option>
            <option value="54.240.197.233">Dublin</option>
        </select>
        <h2 id="advisory"></h2>
        </div>
        <div id="info">
            
            <div id="countryinfo">

            </div>
            <div id="tempid"></div>
        </div>
      </div>
    );
  }
  

    const Goe_API_KEY = process.env.REACT_APP_Goe_API_KEY;
    var ip_address;
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.ipgeolocation.io/getip`,
            "method": "GET"
        };

        var sunrise;
        var sunset;
        $(() => {
            $.ajax(settings).done(function (response) {
                //jQuery('#countryinfo').html(response)
                ip_address = response.ip;
                getAstronomy();
            });

            
            $("#update").click(function (){
                settings.url = "https://api.ipgeolocation.io/getip";
                $.ajax(settings).done(function (response) {

                    //jQuery('#countryinfo').html(response)
                    ip_address = response.ip;
                    clearAll();
                    getAstronomy();
                });

            });

            $(".refresh").click(
                function (){
                    clearAll();
                    refreshWeather();
                }
            )
        });

        function clearAll(){
            $("#countryinfo").empty();
            $("#tempid").empty();
            $("#advisory").html("");
            $("#advisory").css("display", "none");
            $("select").val('');
            console.clear();
        }

        function getAstronomy() {
            var ip = ip_address;
            settings.url = `https://api.ipgeolocation.io/astronomy?apiKey=${Goe_API_KEY}&ip=${ip}`;
            $.ajax(settings).done(function (response) {
                console.log("Geolocation stuff");
                console.log(response);
                sunrise = response.sunrise;
                sunset = response.sunset;
                getWeather(response.location.latitude, response.location.longitude);
                $('#countryinfo').append(`<h2>${response.location.city}, ${response.location.state_prov}, ${response.location.country_name} </h2>`);
            });
        }

 
        function getWeather(lat, lon) {
            // Create a free account on https://openweathermap.org/
            const Weather_API_key = process.env.REACT_APP_Weather_API_key;        

            settings.url = `https://api.openweathermap.org/data/2.5/weather?` +
                `lat=${lat}&lon=${lon}&appid=${Weather_API_key}&units=metric`
            $.ajax(settings).done(function (response) {
                printWeather(response);
                //jQuery('#countryinfo').html(JSON.stringify(response));
            });
        }

        function changeWeather(){
            var city = document.getElementById("select_city").value;
            if (city != "")   {
                ip_address = city;
                clearAll();
                getAstronomy();
            }
        }

        
        function refreshWeather(){
            getAstronomy();
        }

        function printWeather(response){

            $('#tempid').append(`<img src='${getWeatherIcon(response.weather[0].icon)}'><h3>Weather: ${response.weather[0].description}</h3>`);
            $('#tempid').append(`<h3>The current temperature is: ${response.main.temp}°C</h3>`);
            $('#tempid').append(`<h3>Feels like: ${response.main.feels_like}°C.</h3>`);
            $('#tempid').append(`<h3>The current humidity is: ${response.main.humidity}%</h3>`);
            $('#tempid').append(`<h3>Sunrise: ${sunrise}</h3>`);
            $('#tempid').append(`<h3>Sunset: ${sunset}</h3>`);

            var current_time = getCurrentTime(response);
            var sunsrise_time = getSunriseTime(response);
            var sunset_time = getSunsetTime(response)
            $('#tempid').append(`<h3>Current Time: ${current_time.toLocaleTimeString()}</h3>`);


            if (response.main.temp > 30){
                $("#advisory").html("High Temperatures");
                $("#advisory").css("background-color", "red");
                $("#advisory").css("display", "block");
            }
            else if (response.main.temp < -30){
                $("#advisory").html("Low Temperatures");
                $("#advisory").css("background-color", "red");
                $("#advisory").css("display", "block");
            }

            var time_now = current_time.getTime() / 1000;
            var time_sunsrise = sunsrise_time.getTime();
            var time_sunset = sunset_time.getTime();
            console.log("weather stuff ");
            console.log(response);
            console.log(current_time);
            console.log(sunsrise_time);
            console.log(sunset_time);
            var daytime = ((response.sys.sunrise) < time_now) && (time_now < (response.sys.sunset));
            

            if (daytime){
                $("body").css("background-color", "lightblue");
                $("body").css("color", "black");
            }
            else {
                $("body").css("background-color", "darkblue");
                $("body").css("color", "white");

            }
        }

        function getWeatherIcon(icon){
            var url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            return url;
        }

        function getCurrentTime(response){
            var timezone = response.timezone;

            const date = new Date();
            date.setUTCSeconds(date.getSeconds() + timezone);

            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();
            const day = date.getUTCDate();
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const seconds = date.getUTCSeconds();
            const milliseconds = date.getUTCMilliseconds();

            var time = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            return (time);
        }

        function getSunriseTime(response){
            var timezone = response.timezone;

            const date = new Date(response.sys.sunrise * 1000);
            date.setUTCSeconds(date.getSeconds() + timezone);

            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();
            const day = date.getUTCDate();
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const seconds = date.getUTCSeconds();
            const milliseconds = date.getUTCMilliseconds();

            var time = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            return (time);
        }

        

        function getSunsetTime(response){
            var timezone = response.timezone;

            const date = new Date(response.sys.sunset * 1000);
            date.setUTCSeconds(date.getSeconds() + timezone);

            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();
            const day = date.getUTCDate();
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const seconds = date.getUTCSeconds();
            const milliseconds = date.getUTCMilliseconds();

            var time = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            return (time);
        }



  export default Weather;
