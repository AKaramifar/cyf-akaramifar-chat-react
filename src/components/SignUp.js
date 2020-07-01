import React from "react";
import "./SignUp.css";

const SignUp = ({
  signUp_Func_Parm,
  signIn_Func_Parm,
  setUserState_Func_Parm,
}) => {
  const passwordValidator = (password) => {
    // let checkPoint = 0;
    // checkPoint= 100;
    let cover = document.getElementById("Div_PasswordValidStateCover_JSX");
    // if (/\d/.test(password)) {
    //   checkPoint += 2;
    // }
    // if (/[a-z]/g.test(password)) {
    //   checkPoint += 2;
    // }
    // if (/[A-Z]/g.test(password)) {
    //   checkPoint += 2;
    // }
    // // if (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password)) {
    // //   checkPoint += 2;
    // // }
    // if (password.length >= 8) {
    //   checkPoint += 2;
    // }
    console.log(cover.style.width);
  };
  const showPassword = (e, element) => {
    if (e.target.className === "I_Eye_Style far fa-eye-slash") {
      e.target.className = "I_Eye_Style far fa-eye";
      document.getElementById(element).type = "password";
    } else {
      e.target.className = "I_Eye_Style far fa-eye-slash";
      document.getElementById(element).type = "text";
    }
  };
  const formValidation = () => {
    let userName = document.getElementById("Input_UserNameSignIn_JSX");
    let password = document.getElementById("Input_PasswordSignUp_JSX");
    let rTPassword = document.getElementById("Input_PasswordSignUp_JSX");
    let userNameDiv = document.getElementById("Div_UserNameSignIn_JSX");
    let passwordDiv = document.getElementById("Div_PasswordSignIn_JSX");
    let rTPasswordDiv = document.getElementById("Div_RTPasswordSignIn_JSX");
    let showErrorDiv = document.getElementById("Div_SignInErrorMessage_JSX");
    let showError = document.getElementById("P_SignInError_JSX");
    let userTitle = document.getElementById("P_User_JSX");
    if ((userName.value === "") && (password.value === "") && (rTPassword.value === "")) {
      userNameDiv.style.animation = "error infinite 2s";
      passwordDiv.style.animation = "error infinite 2s";
      rTPasswordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else if (userName.value === "") {
      userNameDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else if (password.value === "") {
      passwordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else if (rTPassword.value === "") {
        rTPasswordDiv.style.animation = "error infinite 2s";
        showErrorDiv.style.display = "none";
    }else {
      fetch(
        `https://cyf-akaramifar-chat-node.glitch.me/signin?username=${userName.value}&password=${password.value}`,
        { method: "POST" }
      )
        .then((Response) => Response.json())
        .then((data) => {
          showError.textContent = data;
          showErrorDiv.style.display = "block";
          if (data === "Success") {
            setUserState_Func_Parm(true);
            userTitle.textContent = userName.value;
            signUp_Func_Parm(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="Div_SignUp_Style">
      <div className="Div_SignInClose_Style">
        <i
          className="P_SignInClose_Style fas fa-times-circle"
          onClick={() => signUp_Func_Parm(false)}
        ></i>
      </div>
      {/* -------------------------------------------------- */}
      <div className="Div_SignInUserIcon_Style">
        <i className="I_SignInUserIcon_Style fas fa-user-circle"></i>
      </div>
      <div id="Div_UserNameSignIn_JSX" className="Div_UserNameSignIn_Style">
        <i className="I_User_Style fas fa-user-circle"></i>
        <input
          id="Input_UserNameSignIn_JSX"
          className="Input_UserNameSignIn_Style"
          spellCheck="false"
          autoComplete="off"
          placeholder="Type Your User Name..."
          type="text"
          onChange={() => {
            let userNameDiv = document.getElementById("Div_UserNameSignIn_JSX");
            let showErrorDiv = document.getElementById(
              "Div_SignInErrorMessage_JSX"
            );
            userNameDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
      </div>
      <div id="Div_PasswordSignIn_JSX" className="Div_PasswordSignIn_Style">
        <i className="I_Lock_Style fas fa-lock"></i>
        <input
          id="Input_PasswordSignUp_JSX"
          placeholder="Type Your Password..."
          type="password"
          className="Input_PasswordSignIn_Style"
          onChange={(e) => {
            let passwordDiv = document.getElementById("Input_PasswordSignUp_JSX");
            let showErrorDiv = document.getElementById(
              "Div_SignInErrorMessage_JSX"
            );
            passwordValidator(e.target.value);
            passwordDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
        <i
          className="I_Eye_Style far fa-eye"
          onClick={(e) => {
            showPassword(e,"Input_PasswordSignUp_JSX");
          }}
        ></i>
      </div>
      <div id="Div_RTPasswordSignIn_JSX" className="Div_PasswordSignIn_Style">
        <i className="I_Lock_Style fas fa-lock"></i>
        <input
          id="Input_RTPasswordSignUp_JS"
          placeholder="Re-Type Your Password..."
          type="password"
          className="Input_PasswordSignIn_Style"
          onChange={() => {
            let passwordDiv = document.getElementById("Input_RTPasswordSignUp_JS");
            let showErrorDiv = document.getElementById(
              "Div_SignInErrorMessage_JSX"
            );
            passwordDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
        <i
          className="I_Eye_Style far fa-eye"
          onClick={(e) => {
            showPassword(e, "Input_RTPasswordSignUp_JS");
          }}
        ></i>
      </div>
      <div className="Div_PasswordValidState_Style">
        <div className="Div_PasswordValidStateChild_Style">
          <div className="Div_PoorPassword_Style"></div>
          <div className="Div_MidumPassword_style"></div>
          <div className="Div_StrongPassword_Style"></div>
        </div>
        <div id="Div_PasswordValidStateCover_JSX" className="Div_PasswordValidStateCover_Style"></div>
      </div>
      <div
        id="Div_SignInErrorMessage_JSX"
        className="Div_SignInErrorMessage_Style"
      >
        <p id="P_SignInError_JSX"></p>
      </div>
      <div className="Div_SignInButton_Style" onClick={() => formValidation()}>
        Create Accunt&nbsp;&nbsp;
        <i className="fas fa-user-plus"></i>
      </div>
      <div className="Div_SignUpButton_Style">
        &nbsp;&nbsp;&nbsp;&nbsp;Sign In
        <i
          className="P_SignUp_Style fas fa-sign-in-alt"
          onClick={() => {
            signUp_Func_Parm(true);
            signIn_Func_Parm(false);
          }}
        >
          <span className="Span_SignUpTooltip_Style">Sign In</span>
        </i>
      </div>
      {/* -------------------------------------------------- */}
    </div>
  );
};

export default SignUp;
