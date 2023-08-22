// import Select from './Select';
import { useState, useEffect } from "react";
import searchCity from '../scripts/searchCity';

// Use this API to search for cities: 
// https://openweathermap.org/api/geocoding-api
function Search(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cel, setCel] = useState(null);

    const handleChange = (event) => {
        // Get the input from the user and save it in a state variable
        // event.target is the input element
        setSearchTerm(event.target.value);
    }

    const getSearchTerm = () => {
        return searchTerm;
    }

    const handleSubmit = (event) => {
        console.log('The form submitted with input: ' + searchTerm);
        setCel(() => (searchTerm - 32) / 1.8);
        // props.city[1](searchTerm);
        event.preventDefault(); // Prevent default form submission behavior 
        searchCity(searchTerm, props.update);
    }

    // Replace this search results with the results you get from the API:
    // https://openweathermap.org/api/geocoding-api
    const [searchResults, setSearchResults] = useState([]);



    // useEffect(() => {
    //     // API docs https://openweathermap.org/api/geocoding-api
    //     const Weather_API_key = process.env.REACT_APP_Weather_API_key;
    //     const url = 'http://api.openweathermap.org/geo/1.0/direct';

    //     try {

    //         fetch(`${url}?q=${getSearchTerm}&limit=5&appid=${Weather_API_key}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setSearchResults(data);
    //                 console.log('API data came mounted')
    //             });

    //     } catch (err) {
    //         console.log('API Call Failed!');
    //     }
    // }, []);

    return (
        <div className="container p-3 bg-success">
            {/* <i className='text-danger fw-bold'>Search component</i> */}
            <form onSubmit={handleSubmit} className='my-3 row g-3'>
                <label className="col-sm-4 col-form-label">
                    Please enter city name:
                </label>
                <div className="col-sm-4">
                    <input type="text" value={searchTerm}
                        onChange={handleChange} className="form-control" required/>
                </div>
                <div className="col-sm-4">
                    <input data-testid="search_button" type="submit" value="Search" className="btn btn-primary mb-3" />
                </div>
            </form>
            {/* <Select data={searchResults} city={props.city} /> */}
        </div>
    );
}


export default Search;