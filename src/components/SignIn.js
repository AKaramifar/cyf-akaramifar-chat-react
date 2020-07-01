import React from "react";
import "./SignIn.css";

const SignIn = ({ signIn_F_P }) => {
  const showPassword = (e) => {
    if (e.target.className === "I_Eye_Style far fa-eye-slash") {
      e.target.className = "I_Eye_Style far fa-eye";
      document.getElementById("Input_PasswordSignIn_JSX").type = "password";
    } else {
      e.target.className = "I_Eye_Style far fa-eye-slash";
      document.getElementById("Input_PasswordSignIn_JSX").type = "text";
    }
  };
  const formValidation = () => {
    let userName = document.getElementById("Input_UserNameSignIn_JSX");
    let password = document.getElementById("Input_PasswordSignIn_JSX");
    let userNameDiv = document.getElementById("Div_UserNameSignIn_JSX");
    let passwordDiv = document.getElementById("Div_PasswordSignIn_JSX");
    let showErrorDiv = document.getElementById("Div_SignInErrorMessage_JSX");
    let showError = document.getElementById("P_SignInError_JSX");
    if ((userName.value === "") & (password.value === "")) {
      userNameDiv.style.animation = "error infinite 2s";
      passwordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else if (userName.value === "") {
      userNameDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else if (password.value === "") {
      passwordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else {
      fetch(
        `https://cyf-akaramifar-chat-node.glitch.me/signin?username=${userName.value}&password=${password.value}`,  { method: "POST" }
      )
        .then((Response) => Response.json())
        .then((data) => {
          showError.textContent = data;
          showErrorDiv.style.display = "block";
        })
        .catch((err) => console.log(err));
      //   signIn_F_P(false);
    }
  };
  return (
    <div className="Div_SignIn_Style">
      <div className="Div_SignInUserIcon_Style">
        <i className="I_SignInUserIcon_Style fas fa-user-circle"></i>
      </div>
      <div id="Div_UserNameSignIn_JSX" className="Div_UserNameSignIn_Style">
        <i className="I_User_Style fas fa-user-circle"></i>
        <input
          id="Input_UserNameSignIn_JSX"
          className="Input_UserNameSignIn_Style"
          spellCheck="false"
          placeholder="User Name . . ."
          type="text"
          onChange={() => {
            let userNameDiv = document.getElementById("Div_UserNameSignIn_JSX");
            let showErrorDiv = document.getElementById("Div_SignInErrorMessage_JSX");
            userNameDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
      </div>
      <div id="Div_PasswordSignIn_JSX" className="Div_PasswordSignIn_Style">
        <i className="I_User_Style fas fa-lock"></i>
        <input
          id="Input_PasswordSignIn_JSX"
          placeholder="Password . . ."
          type="password"
          className="Input_PasswordSignIn_Style"
          onChange={() => {
            let passwordDiv = document.getElementById("Div_PasswordSignIn_JSX");
            let showErrorDiv = document.getElementById("Div_SignInErrorMessage_JSX");
            passwordDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
        <i
          className="I_Eye_Style far fa-eye"
          onClick={(e) => {
            showPassword(e);
          }}
        ></i>
      </div>
      <div
        id="Div_SignInErrorMessage_JSX"
        className="Div_SignInErrorMessage_Style"
      >
        <p id="P_SignInError_JSX"></p>
      </div>
      <div className="Div_SignInButton_Style" onClick={() => formValidation()}>
        Sign In&nbsp;&nbsp;
        <i className="fas fa-sign-in-alt"></i>
      </div>
      <div className="Div_SignUpButton_Style">
        &nbsp;&nbsp;&nbsp;&nbsp;Create Account
        <i className="P_SignUp_Style fas fa-user-plus">
          <span className="Span_SignUpTooltip_Style">Sign Up</span>
        </i>
      </div>
    </div>
  );
};

export default SignIn;
