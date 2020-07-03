import React from "react";
import "./SignIn.css";

const SignIn = ({
  signUp_Func_Parm,
  signIn_Func_Parm,
  setUserState_Func_Parm,
}) => {
  const showPassword_Func = (e) => {
    if (e.target.className === "SignIn_I_Eye_CN far fa-eye-slash") {
      e.target.className = "SignIn_I_Eye_CN far fa-eye";
      document.getElementById("SignIn_Input_Password_Id").type = "password";
    } else {
      e.target.className = "SignIn_I_Eye_CN far fa-eye-slash";
      document.getElementById("SignIn_Input_Password_Id").type = "text";
    }
  };
  const formValidation_Func = () => {
    let userName_Input = document.getElementById("SignIn_Input_UserName_Id");
    let password_Input = document.getElementById("SignIn_Input_Password_Id");
    let userName_Div = document.getElementById("SignIn_Div_UserName_Id");
    let password_Div = document.getElementById("SignIn_Div_Password_Id");
    let showError_Div = document.getElementById("SignIn_Div_ErrorMessage_Id");
    let showError_P = document.getElementById("SignIn_P_Error_Id");
    let userTitle_P = document.getElementById("Header_P_User_Id");
    let signInIcon_I = document.getElementById("SignIn_I_SignInIcon_Id");
    if (userName_Input.value === "") {
      userName_Div.style.animation = "SignIn_Keyframes_Error infinite 2s";
      signInIcon_I.className = "fas fa-sign-in-alt";
      showError_Div.style.display = "none";
    }
    if (password_Input.value === "") {
      password_Div.style.animation = "SignIn_Keyframes_Error infinite 2s";
      signInIcon_I.className = "fas fa-sign-in-alt";
      showError_Div.style.display = "none";
    } 
    if (userName_Input.value !== "" && password_Input.value !== "") {
      signInIcon_I.className = "SignIn_I_SignInIcon_CN fa fa-cog fa-spin fa-3x fa-fw";
      fetch(
        `https://cyf-akaramifar-chat-node.glitch.me/signin?username=${userName_Input.value}&password=${password_Input.value}`,
        { method: "POST" }
      )
        .then((Response) => Response.json())
        .then((data) => {
          showError_P.textContent = data;
          showError_Div.style.display = "block";
          if (data === "Success") {            
            userTitle_P.textContent = userName_Input.value;
            setUserState_Func_Parm(true);
            signIn_Func_Parm(false);
          } else {
            signInIcon_I.className = "fas fa-sign-in-alt";
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="SignIn_Div_SignIn_CN">
      <div className="SignIn_Div_SignInClose_CN">
        <i
          className="SignIn_I_SignInClose_CN fas fa-times-circle"
          onClick={() => signIn_Func_Parm(false)}
        ></i>
      </div>
      <div className="SignIn_Div_SignInUserIcon_CN">
        <i className="SignIn_I_SignInUserIcon_CN fas fa-user-circle"></i>
      </div>
      <div id="SignIn_Div_UserName_Id" className="SignIn_Div_UserName_CN">
        <i className="SignIn_I_User_CN fas fa-user-circle"></i>
        <input
          id="SignIn_Input_UserName_Id"
          className="SignIn_Input_UserName_CN"
          spellCheck="false"
          autoComplete="off"
          placeholder="User Name . . ."
          type="text"
          onChange={() => {
            let userName_Div = document.getElementById("SignIn_Div_UserName_Id");
            let showError_Div = document.getElementById(
              "SignIn_Div_ErrorMessage_Id"
            );
            userName_Div.style.animation = "";
            showError_Div.style.display = "none";
          }}
        ></input>
      </div>
      <div id="SignIn_Div_Password_Id" className="SignIn_Div_Password_CN">
        <i className="SignIn_I_Lock_CN fas fa-lock"></i>
        <input
          id="SignIn_Input_Password_Id"
          placeholder="Password . . ."
          type="password"
          className="SignIn_Input_Password_CN"
          onChange={() => {
            let password_Div = document.getElementById("SignIn_Div_Password_Id");
            let showError_Div = document.getElementById(
              "SignIn_Div_ErrorMessage_Id"
            );
            password_Div.style.animation = "";
            showError_Div.style.display = "none";
          }}
        ></input>
        <i
          className="SignIn_I_Eye_CN far fa-eye"
          onClick={(e) => {
            showPassword_Func(e);
          }}
        ></i>
      </div>
      <div
        id="SignIn_Div_ErrorMessage_Id"
        className="SignIn_Div_ErrorMessage_CN"
      >
        <p id="SignIn_P_Error_Id"></p>
      </div>
      <div className="SignIn_Div_SignInButton_CN" onClick={() => formValidation_Func()}>
        Sign In&nbsp;&nbsp;
        <i id="SignIn_I_SignInIcon_Id" className="fas fa-sign-in-alt"></i>
      </div>
      <div className="SignIn_Div_SignUpIcon_CN">
        &nbsp;&nbsp;&nbsp;&nbsp;Create Account
        <i
          className="SignIn_I_SignUpIcon_CN fas fa-user-plus"
          onClick={() => {
            signUp_Func_Parm(true);
            signIn_Func_Parm(false);
          }}
        >
          <span className="SignIn_Span_SignUpTooltip_CN">Sign Up</span>
        </i>
      </div>
    </div>
  );
};

export default SignIn;
