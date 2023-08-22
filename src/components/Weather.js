

function Weather(props) {
    var img_src = "http://openweathermap.org/img/wn/" + props.data[0] + "@2x.png";
    return (

        
        <div id="tempid">
            <img src={img_src}></img>
            <h3>Weather: {props.data[1]}</h3>
            <h3>The current temperature is: {props.data[2]}°C</h3>
            <h3>Feels like: {props.data[3]}°C.</h3>
            <h3>The current humidity is: {props.data[4]}%</h3>
        </div>
    );
  }
  
  export default Weather;
  