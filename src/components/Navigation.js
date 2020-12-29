import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "./images/clogo.jpeg";
import { Login } from "./login.js";
import google from "./images/img_2.png"

function Navigation(props) {
  const[loginStatus,setLoginStatus] = useState(false);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a
            href="/"
            className=" FontColor  col-md-4 col-sm-4 col-4 text-center"
          >
            <img className="navbar-brand" src={Logo} alt="logo" width="35px" />A
            L I N E A I N V E S T
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li
              className ={`nav-item  col-md-6 ${
                props.location.pathname === "/" ? "active sel" : ""
              }`}
            >
              <Link className ="nav-link" to="/">
                Home
                <span className ="sr-only">(current)</span>
              </Link>
            </li>
            <li
              className ={`nav-item col-md-6 ${
                props.location.pathname === "/watchlist" ? "active sel" : ""
              }`}
            >
              <Link className="nav-link " to="/watchlist">
                Watchlist
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0 ">
          <ul className="navbar-nav float-right">
          
      {localStorage.getItem('user_name') ? <li className="pr-4">
                            
      <img src={localStorage.getItem('user_logo')} className="rounded-circle" alt="user" width="35px" />
  </li> : (<li className="pr-4">
          <button  className = "google-button" onClick={() => { setLoginStatus(true) }}>
          <span><img src={google} alt={"google logo"}  width="25px"/></span> Contious with google</button>
      </li>) }
           
      </ul>
          </div>
        </div>
      </nav>
      <div className="popup">
      {
        loginStatus ? <Login show={true} setlogStatus ={setLoginStatus}></Login> : ""
      }
      </div>
    </div>
  );
}

export default withRouter(Navigation);
