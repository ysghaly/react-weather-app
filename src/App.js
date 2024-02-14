import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Location from './components/Location';
import { useState, useEffect } from 'react';
import $ from "jquery";
import './weather.css';
import isDayTime from './scripts/isDayTime';
import Search from './components/Search';
import axios from "axios";

function App(props) {

  const [ip, setIp] = useState(props.ip);


  const [city, setCity] = useState(props.city);
  const [state, setState] = useState(props.state);
  const [country, setCountry] = useState(props.country);
  const [latitude, setLatitude] = useState(props.location[0]);
  const [longitude, setLongitude] = useState(props.location[1]);

  
  const [weather_icon, setWeather_icon] = useState(props.weather_info[0]);
  const [weather_desc, setWeather_desc] = useState(props.weather_info[1]);
  const [current_temp, setCurrent_temp] = useState(props.weather_info[2]);
  const [feels_like, setFeels_like] = useState(props.weather_info[3]);
  const [humidity, setHumidity] = useState(props.weather_info[4]);
  const [time, setTime] = useState(props.weather_info[5]);
    
  // isDayTime(weather_icon);

  useEffect(()=>{
    // console.log("test");
    fetch('http://localhost:5000')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

  }, [])

  return (
    <div className="App">
      <Header temp={current_temp} />
      <Form icon={weather_icon} setIp={setIp} location={[latitude,longitude]} city={city} setCity={setCity} state={state} country={country} update={[setCity,setState,setCountry,setWeather_icon,setWeather_desc,setCurrent_temp,setFeels_like,setHumidity,setTime, setLatitude, setLongitude]}/>
      <br /><br />
      <div className='info'>

        <Location data={[city, state, country, time]}/>
        <Weather data={[weather_icon,weather_desc,current_temp,feels_like,humidity,time]} />
      </div>
    </div>
  );

}




export default App;




