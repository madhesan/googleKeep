import React, { useEffect, useState } from "react"
import {  GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';

const Login = () => {
  const client_Id = "970545682560-m76skfo8i9dlo43o6lnf5nb368p4qh2l.apps.googleusercontent.com"
  const [showloginbutton, setloginbutton] = useState(true);
  const [showlogoutbutton, setlogoutbutton] = useState(false);
  const [username, setusername] = useState();
  const [userphoto, setuserphoto] = useState();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: client_Id })
    })
  }, [])
  const onLoginSuccess = (res) => {
    window.location = "/googleNotes";
    console.log("login successfully", res.profileObj)
    localStorage.setItem("token1", res.profileObj.imageUrl);
    localStorage.setItem("tokenId", res.profileObj.googleId);
    setloginbutton(false);
    setlogoutbutton(true);
    setusername(res.profileObj.name);
    setuserphoto(res.profileObj.imageUrl);

  }
  const onFailureSuccess = (res) => {
    console.log("login failed", res)
  }
  const onsignoutsuccess = async (res) => {
    alert("user logged out successfully");
    console.log("user logout successfully")
    setusername(null);
    setuserphoto(null);
    setloginbutton(true);
    setlogoutbutton(false);
  }
  return (
    <div >
      <div >
        {showloginbutton ?
          <GoogleLogin
            clientId={client_Id}
            buttonText="Login With Google Account"
            onSuccess={onLoginSuccess}
            onFailure={onFailureSuccess}
            cookiePolicy={'single_host_origin'}
          /> : null
        }
      </div>
      <div style={{ marginLeft: "20px", marginTop: "-40px" }}>
      </div>
    </div>

  )
}
export default Login;