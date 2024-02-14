import $ from "jquery";
import isDayTime from "./isDayTime";

   



function searchCity(searchTerm, setResponse){

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:5000`,
        "headers": {
            "searchTerm": searchTerm
        },
        "method": "GET"
    };

            $.ajax(settings).done(function (response) {
                setResponse(response);
                // if (response.length > 0)
                //     setResponse(response);
                // else 
                //     alert("Invalid City Name!");


            });
}

export default searchCity;