import $ from "jquery";

function Header(props) {

    var temp = Number(props.temp);

    var advisory;
    if (temp > 30){
        advisory = (<h2 id="heat_advisory">Caution: High Temperatures</h2>);
    }

    else if (temp < -30){
        advisory = (<h2 id="cold_advisory">Caution: Low Temperatures</h2>);

    }

    else {
        
        advisory = (<div></div>);

    }

    return (
        <header className="header">
            
            {advisory}
        </header>
    );
  }
  
  export default Header;
  