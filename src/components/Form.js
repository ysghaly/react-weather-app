import changeCity from "../scripts/chageCity";  
import currentCity from "../scripts/currentCity";  
import $ from "jquery";



function Form(props) {

  const refresh = () => {
    changeCity(props.ip[0], props);
  }

  const change_ip = (event) => {
    var new_ip = (event.currentTarget.value);
    changeCity(new_ip, props);
  }
  const getCurrentLocation = () => {
    
    currentCity(props);
  }

    return (
      <div className="form">
        <div>Refresh <br></br><span onClick={() => {refresh()}} className="refresh">&#x21bb;</span><br/><br/></div>
        <button id="update" onClick={() => {getCurrentLocation()}}>Current Location</button>
        <label>Other Cities: </label>
        <select id="select_city" onChange={(event) => {change_ip(event)}}>
            <option value=""></option>
            <option value="174.0.182.145">Calgary</option>
            <option value="23.236.229.228">Hamilton</option>
            <option value="158.69.60.97">Montreal</option>
            <option value="188.244.45.250">Moscow</option>
            <option value="210.146.35.2">Tokyo</option>
            <option value="54.240.197.233">Dublin</option>
        </select>
      </div>
    );
  }
  


  export default Form;
  