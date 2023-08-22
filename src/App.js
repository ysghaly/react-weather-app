import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Location from './components/Location';
import { useState } from 'react';
import $ from "jquery";
import './weather.css';
import isDayTime from './scripts/isDayTime';
import Search from './components/Search';


function App(props) {

  const [ip, setIp] = useState(props.ip);


  const [city, setCity] = useState(props.city);
  const [state, setState] = useState(props.state);
  const [country, setCountry] = useState(props.country);

  
  const [weather_icon, setWeather_icon] = useState(props.weather_info[0]);
  const [weather_desc, setWeather_desc] = useState(props.weather_info[1]);
  const [current_temp, setCurrent_temp] = useState(props.weather_info[2]);
  const [feels_like, setFeels_like] = useState(props.weather_info[3]);
  const [humidity, setHumidity] = useState(props.weather_info[4]);
  const [time, setTime] = useState(props.weather_info[5]);
    
  // isDayTime(weather_icon);

  return (
    <div className="App">
      <Header temp={current_temp} />
      <Form icon={weather_icon} ip={[ip,setIp]} update={[setCity,setState,setCountry,setWeather_icon,setWeather_desc,setCurrent_temp,setFeels_like,setHumidity,setTime]}/>
      <br /><br />
      <Search  update={[setCity,setState,setCountry,setWeather_icon,setWeather_desc,setCurrent_temp,setFeels_like,setHumidity,setTime]} />
      <div className='info'>

        <Location data={[city, state, country, time]}/>
        <Weather data={[weather_icon,weather_desc,current_temp,feels_like,humidity,time]} />
      </div>
    </div>
  );

}




export default App;




