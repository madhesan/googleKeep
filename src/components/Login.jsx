import React, { useEffect, useState } from "react"
import { GoogleLogout,GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Notes from "./notes/Notes";
import HeaderBar from "./HeaderBar";
import { Navigate } from "react-router-dom";


const Login=()=>{
  const  client_Id="970545682560-m76skfo8i9dlo43o6lnf5nb368p4qh2l.apps.googleusercontent.com"
  const [showloginbutton,setloginbutton]=useState(true);
  const [showlogoutbutton,setlogoutbutton]=useState(false);
  const [username,setusername]=useState();
  const [userphoto,setuserphoto]=useState();
  useEffect(()=>{
    gapi.load("client:auth2",()=>{
gapi.auth2.init({clientId:client_Id})
})
},[])
  const  onLoginSuccess=(res)=>{
    window.location = "/home";
    console.log("login successfully",res.profileObj)
    
    setloginbutton(false);
    setlogoutbutton(true);
    setusername(res.profileObj.name);
    setuserphoto(res.profileObj.imageUrl);
    console.log(res.profileObj.imageUrl);

  }
  const  onFailureSuccess=(res)=>{
    console.log("login failed",res)
  }
  const  onsignoutsuccess=async(res)=>{
    alert("user logged out successfully");
    console.log("user logout successfully")
    setusername(null);
    setuserphoto(null);
    setloginbutton(true);
    setlogoutbutton(false);
  }
return(
    <div style={{ marginTop:"5px"}}>
    <div>
    {showloginbutton ?
       <GoogleLogin  
    clientId={client_Id}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onFailureSuccess}
    cookiePolicy={'single_host_origin'}
  /> : null
  }
  </div>
  <div>
    {showlogoutbutton ?
    <GoogleLogout
      clientId={client_Id}
      buttonText="Logout"
      onLogoutSuccess={onsignoutsuccess}
    /> : null
    }
    </div>
    <div style={{marginLeft:"20px",marginTop:"-40px"}}>
    <ListItemAvatar style={{ marginLeft:"260px"}}>
        
        <Avatar alt="Profile Picture" src={userphoto} />
  
      </ListItemAvatar>
      </div>
  {/* <Name  name={username} /> */}
  {/* <HeaderBar photo={userphoto}/> */}
    </div>

)
}
export default Login;