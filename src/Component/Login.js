import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = ({ onLogin }) => {
  const responseGoogle = (response) => {
    // console.log(response);
    var decode = jwt_decode(response.credential);
    // console.log(decode);

    onLogin(decode);
  };

  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt="slack-logo"
        />

        <h1>Sign in to slack</h1>
        <p>www.slack.com</p>

        <GoogleOAuthProvider clientId="331600933892-93mjm3c8fko6mrv9k6onokqaqmuopigg.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={onError}
            render={({ onClick }) => (
              <Button onClick={onClick}>Sign in with Google</Button>
            )}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
