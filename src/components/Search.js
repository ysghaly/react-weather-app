// import Select from './Select';
import { useState, useEffect } from "react";
import searchCity from '../scripts/searchCity';
import search from '../scripts/search';
import Select from "./Select";
import $ from "jquery";


// Use this API to search for cities: 
// https://openweathermap.org/api/geocoding-api
function Search(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cel, setCel] = useState(null);
    const [selectedValue, setSelectedValue] = useState(0);

    const [searchResults, setSearchResults] = useState([]);
    const [response, setResponse] = useState(null);

    const handleChange = (event) => {
        // Get the input from the user and save it in a state variable
        // event.target is the input element
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        // API docs https://openweathermap.org/api/geocoding-api
  

            
        if (searchTerm){
            console.log("search term: " + searchTerm);
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": process.env.REACT_APP_SERVER_URL,
                "headers": {
                    "search": searchTerm 
                },
                "method": "GET"
            };
        

            $.ajax(settings).done(function (response) {
                setResponse(response);

            });
            // fetch(`${url}?q=${searchTerm}&limit=5&appid=${Weather_API_key}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log("test2: " + data);
            //         setResponse(data);
                    
            //     });
        }
        else {
            setResponse(false);
        }
    }, [searchTerm]);



    const handleSubmit = (event) => {
        console.log(selectedValue);
        props.update[9](response.lat);
        props.update[10](response.lon);
        setCel(() => (searchTerm - 32) / 1.8);
        search(response[selectedValue], props.update);
        event.preventDefault(); // Prevent default form submission behavior 
    }

    // Replace this search results with the results you get from the API:
    // https://openweathermap.org/api/geocoding-api
   



    

    return (
        <div className="container p-3 bg-success">
            {/* <i className='text-danger fw-bold'>Search component</i> */}
            <form onSubmit={handleSubmit} className='my-3 row g-3'>
                <label className="col-sm-4 col-form-label">
                    Enter city name:
                </label>
                <br />
                <div className="col-sm-4">
                    <input type="text" value={searchTerm}
                        onChange={handleChange} className="form-control" required/>
                        &nbsp;
                </div>
                <Select data={response} city={props.city} set_city={setSelectedValue} />
                <input data-testid="search_button" type="submit" value="Search" className="btn btn-primary mb-3" />
            </form>
        </div>
    );
}


export default Search;