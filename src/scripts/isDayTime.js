import $ from "jquery";



function testDaytime(props){

    var timezone = props[0];
    var current_time = props[3];
    var local_date = props[4];
    var time_offset_hours = (timezone / (60 * 60)) + ((new Date()).getTimezoneOffset() / 60);

    var current_hours = current_time.slice(0,2);
    var current_min = current_time.slice(3,5);
    var current_sec = current_time.slice(6,8);

    var current_day = local_date.slice(8,10);
    var current_month = local_date.slice(5,7);
    var current_year = local_date.slice(0,4);


    var current_date = new Date();
    current_date.setFullYear(current_year, current_month -1, current_day);
    current_date.setHours(current_hours);
    current_date.setMinutes(current_min);
    current_date.setSeconds(current_sec);
    
    

    var sunrise = props[1];
    var sunset = props[2] ;
    var rise_date = new Date(sunrise * 1000);
    var set_date = new Date(sunset * 1000);

    rise_date.setHours(rise_date.getHours() + time_offset_hours);
    set_date.setHours(set_date.getHours() + time_offset_hours);

    // var rise_hours = rise_date.getHours();
    // var set_hours = set_date.getHours();

    // var rise_min = rise_date.getMinutes();
    // var set_min = set_date.getMinutes();

    // var rise_sec = rise_date.getSeconds();
    // var set_sec = set_date.getSeconds();

    var daytime;
   

    if ((rise_date.getTime() < current_date.getTime()) && (current_date.getTime() < set_date.getTime()))
        return true;
    
    else
        return false;
}

function iconDay(icon){
    var icon_char = icon.endsWith("d");
    return icon_char;
}

const isDayTime = (props) => {

    var daytime = iconDay(props);

    if (daytime){
        $("#root").css("background-color", "lightblue");
        $("#root").css("color", "black");
    }
    else {
        $("#root").css("background-color", "darkblue");
        $("#root").css("color", "white");

    }
}

export default isDayTime;