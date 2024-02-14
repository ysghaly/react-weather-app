import { useState } from "react";


function Select(props) {
    const [userInput, setUserInput] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
        // Get the input from the user and save it in a state variable
        // event.target is the input element
        setUserInput(event.target.value);
    }

    

    // const countries = [
    //     { country: "ca", name: 'Canada' },
    //     { country: 'us', name: 'USA' },
    //     { country: "eg", name: 'Egypt' }];
    const cities = props.data;
    console.log("cities" + cities);
    return (
        <div className="container p-3 bg-warning">
            {/* <i className='text-danger fw-bold'>Select component</i> */}
                <select value={userInput} onChange={handleChange}
                    className='form-select col-md' required style={{minWidth: "150px"}}>
                    {cities && cities.map((city, index) =>
                        <option key={city.country + index} value={`${city.name},${city.country}`}>
                            {city.name}, {city.state && city.state +", "} {city.country}</option>
                    )}
                </select>
        </div>
    );
}

export default Select;