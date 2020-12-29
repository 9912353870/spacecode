import React, { useState } from 'react';
import Logo from "./images/clogo.jpeg";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseIcon from '@material-ui/icons/Close';
import GoogleLogin from 'react-google-login';

export function Login(param) {
    
    const [close, setclose] = useState(param.show);

    const closeModal =() =>{
        setclose(false)
        param.setlogStatus(false);
    }
    const handleGoogleLogin = (response) => {
        console.log(response);
        localStorage.setItem("user_logo","https://www.w3schools.com/w3css/img_avatar3.png" );
        localStorage.setItem("user_name", "Dummy user");
        if(response && response.wt.Ad !== ""){
          localStorage.setItem("user_logo", response.wt.SJ);
          localStorage.setItem("user_name", response.wt.Ad);
        }
        setclose(false)

      }
  return (
    <Modal show={close} size="lg">
      <Modal.Body>
        <div className="container ">
          <div className="row model-height">
            <div className="col-6 col-lg-6 left-div ">
              <div className="post-img ">
                <p className="tiitle-div">Keep Track of Your stcoks</p>
              </div>
            </div>
            <div className=" newsWrap">
              <div className="card-body">
                <p className="closeicons" onClick={closeModal}>
                  <CloseIcon />
                </p>
                <p className="image-icon">
                  <img
                    className="navbar-brand"
                    src={Logo}
                    alt="logo"
                    width="35px"
                  />{" "}
                  ALINEA INVEST
                </p>
                <div className="google-account">
                  <GoogleLogin
                    clientId="117747797044-gvq5kra46v3femse3ajq2a1fpm7rlgeh.apps.googleusercontent.com"
                    buttonText="Continous with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    cookiePolicy={"single_host_origin"}
                  />
                  ,
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
