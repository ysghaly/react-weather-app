
import { useState } from 'react';


function Location(props) {


    const [city, setCity] = useState(props.data[0]);
    const [state, setState] = useState(props.data[1]);
    const [country, setCountry] = useState(props.data[2]);


    return (

        
        <div id="countryinfo">
            <h2>{props.data[0]}, {props.data[1] && props.data[1] + ', '} {props.data[2]}</h2>
            <h3>Current Time: {props.data[3]}</h3>
        </div>
    );
  }
  
  export default Location;
  