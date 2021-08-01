import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
function App(){

  const responseSuccessGoogle = (response)=>{
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/googlelogin",
      data: {tokenId: response.tokenId}
    }).then(response=>{
      console.log("Google login success", response); // here after success
      window.location = "http://localhost:8000/api/success"
    })
  }
  const responseErrorGoogle = (response)=>{

  }

  return (
    <div className="App">
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Login With Google</h1>

        <GoogleLogin
          clientId={{GOOGLE_CLIENT_ID}}   // YOUR GOOGLE CLIENT ID HERE
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />,
      </div>
    </div>
  );
}

export default App;