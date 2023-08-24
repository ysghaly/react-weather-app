import changeCity from "../scripts/chageCity";  
import search from "../scripts/search";
import currentCity from "../scripts/currentCity";  
import $ from "jquery";
import Search from './Search';



function Form(props) {

  const refresh = () => {
    var response = {
      "name" : props.city,
      "state" : props.state,
      "country" : props.country,
      "lat" : props.location[0],
      "lon" : props.location[1]
    };
    search(response, props.update);
  }

  const change_ip = (event) => {
    var city = (event.currentTarget.value);
    search(city, props.update);
  }
  const getCurrentLocation = () => {
    
    currentCity(props);
  }

    return (
      <div className="form">
        <div>Refresh <br></br><span onClick={() => {refresh()}} className="refresh">&#x21bb;</span><br/><br/></div>
        <button id="update" onClick={() => {getCurrentLocation()}}>Current Location</button>
        <Search city={[props.city, props.setCity]}  update={props.update} />

      </div>
    );
  }
  


  export default Form;
  