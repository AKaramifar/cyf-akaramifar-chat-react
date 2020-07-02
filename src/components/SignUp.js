import React from "react";
import "./SignUp.css";

const SignUp = ({
  signUp_Func_Parm,
  signIn_Func_Parm,
  setUserState_Func_Parm,
}) => {
  const passwordValidator = (password) => {
    let numberOfValidatePass = 0;
    let showErrorDiv = document.getElementById("Div_SignUpErrorMessage_JSX");
    let strongPassword = document.getElementById("Div_StrongPassword_JSX");
    let mediumPassword = document.getElementById("Div_MediumPassword_JSX");
    let poorPassword = document.getElementById("Div_PoorPassword_JSX");
    let passwordDiv = document.getElementById("Div_PasswordSignUp_JSX");
    let reTypePasswordDiv = document.getElementById(
      "Div_ReTypePasswordSignUp_JSX"
    );
    let passwordE = document.getElementById("Input_PasswordSignUp_JSX");
    let reTypePassword = document.getElementById(
      "Input_ReTypePasswordSignUp_JSX"
    );
    if (passwordE.value.length > 0) {
      passwordDiv.style.animation = "none";
      showErrorDiv.style.display = "none";
    } else {
      passwordDiv.style.animation = "error infinite 2s";
    }
    if (reTypePassword.value.length > 0) {
      reTypePasswordDiv.style.animation = "none";
      showErrorDiv.style.display = "none";
    } else {
      reTypePasswordDiv.style.animation = "error infinite 2s";
    }
    if (/\d/.test(password)) {
      numberOfValidatePass += 1;
    }
    if (/[a-z]/g.test(password)) {
      numberOfValidatePass += 1;
    }
    if (/[A-Z]/g.test(password)) {
      numberOfValidatePass += 1;
    }
    if (/[-!$%^&*()#@_+|~=`{}\]:";'<>?,.]/.test(password)) {
      numberOfValidatePass += 1;
    }
    if (password.length >= 8) {
      numberOfValidatePass += 1;
    }
    if (numberOfValidatePass > 0 && numberOfValidatePass <= 2) {
      poorPassword.style.display = "block";
      mediumPassword.style.display = "none";
      strongPassword.style.display = "none";
    }
    if (numberOfValidatePass > 2 && numberOfValidatePass <= 4) {
      poorPassword.style.display = "block";
      mediumPassword.style.display = "block";
      strongPassword.style.display = "none";
    }
    if (numberOfValidatePass === 5) {
      poorPassword.style.display = "block";
      mediumPassword.style.display = "block";
      strongPassword.style.display = "block";
    }
    if (numberOfValidatePass === 0) {
      poorPassword.style.display = "none";
      mediumPassword.style.display = "none";
      strongPassword.style.display = "none";
    }
    if (
      passwordE.value.length === reTypePassword.value.length &&
      passwordE.value !== reTypePassword.value &&
      passwordE.length > 0
    ) {
      console.log("true");
      reTypePasswordDiv.style.animation = "error infinite 2s";
      passwordDiv.style.animation = "error infinite 2s";
    }
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
    let numberOfEmptyElements = 0;
    let userName = document.getElementById("Input_UserNameSignUp_JSX");
    let password = document.getElementById("Input_PasswordSignUp_JSX");
    let reTypePassword = document.getElementById(
      "Input_ReTypePasswordSignUp_JSX"
    );
    let userNameDiv = document.getElementById("Div_UserNameSignUp_JSX");
    let passwordDiv = document.getElementById("Div_PasswordSignUp_JSX");
    let reTypePasswordDiv = document.getElementById(
      "Div_ReTypePasswordSignUp_JSX"
    );
    let showErrorDiv = document.getElementById("Div_SignUpErrorMessage_JSX");
    let showError = document.getElementById("P_SignUpError_JSX");
    let userTitle = document.getElementById("P_UserSignUp_JSX");
    if (userName.value === "") {
      numberOfEmptyElements += 1;
      userNameDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else {
      userNameDiv.style.animation = "none";
    }
    if (password.value === "") {
      numberOfEmptyElements += 1;
      passwordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else {
      password.style.animation = "none";
    }
    if (reTypePassword.value === "") {
      numberOfEmptyElements += 1;
      reTypePasswordDiv.style.animation = "error infinite 2s";
      showErrorDiv.style.display = "none";
    } else {
      reTypePasswordDiv.style.animation = "none";
    }
    if (
      password.length === reTypePassword.length &&
      password.value !== reTypePassword.value &&
      password.length > 0
    ) {
      reTypePasswordDiv.style.animation = "error infinite 2s";
      passwordDiv.style.animation = "error infinite 2s";
    }
    if (numberOfEmptyElements === 0) {
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
      <div className="Div_SignUpClose_Style">
        <i
          className="P_SignUpClose_Style fas fa-times-circle"
          onClick={() => signUp_Func_Parm(false)}
        ></i>
      </div>
      {/* -------------------------------------------------- */}
      <div className="Div_SignUpUserIcon_Style">
        <i className="I_SignUpUserIcon_Style fas fa-user-circle"></i>
      </div>
      <div id="Div_UserNameSignUp_JSX" className="Div_UserNameSignUp_Style">
        <i className="I_User_Style fas fa-user-circle"></i>
        <input
          id="Input_UserNameSignUp_JSX"
          className="Input_UserNameSignUp_Style"
          spellCheck="false"
          autoComplete="off"
          placeholder="Type Your User Name..."
          type="text"
          onChange={() => {
            let userNameDiv = document.getElementById("Div_UserNameSignUp_JSX");
            let showErrorDiv = document.getElementById(
              "Div_SignUpErrorMessage_JSX"
            );
            userNameDiv.style.animation = "";
            showErrorDiv.style.display = "none";
          }}
        ></input>
      </div>
      <div id="Div_PasswordSignUp_JSX" className="Div_PasswordSignUp_Style">
        <i className="I_Lock_Style fas fa-lock"></i>
        <input
          id="Input_PasswordSignUp_JSX"
          placeholder="Type Your Password..."
          type="password"
          className="Input_PasswordSignUp_Style"
          onChange={(e) => {
            let passwordDiv = document.getElementById("Div_PasswordSignUp_JSX");
            let showErrorDiv = document.getElementById(
              "Div_SignUpErrorMessage_JSX"
            );
            passwordValidator(e.target.value);
            // passwordDiv.style.animation = "";
            // showErrorDiv.style.display = "none";
          }}
        ></input>
        <i
          className="I_Eye_Style far fa-eye"
          onClick={(e) => {
            showPassword(e, "Input_PasswordSignUp_JSX");
          }}
        ></i>
      </div>
      <div className="Div_PasswordValidState_Style">
        <div id="Div_PoorPassword_JSX" className="Div_PoorPassword_Style"></div>
        <div
          id="Div_MediumPassword_JSX"
          className="Div_MediumPassword_Style"
        ></div>
        <div
          id="Div_StrongPassword_JSX"
          className="Div_StrongPassword_Style"
        ></div>
      </div>
      <div
        id="Div_ReTypePasswordSignUp_JSX"
        className="Div_PasswordSignUp_Style"
      >
        <i className="I_Lock_Style fas fa-lock"></i>
        <input
          id="Input_ReTypePasswordSignUp_JSX"
          placeholder="Re-Type Your Password..."
          type="password"
          className="Input_PasswordSignUp_Style"
          onChange={(e) => {
            let reTypePasswordDiv = document.getElementById(
              "Div_ReTypePasswordSignUp_JSX"
            );
            let showErrorDiv = document.getElementById(
              "Div_SignUpErrorMessage_JSX"
            );
            passwordValidator(e.target.value);
            // reTypePasswordDiv.style.animation = "";
            // showErrorDiv.style.display = "none";
          }}
        ></input>
        <i
          className="I_Eye_Style far fa-eye"
          onClick={(e) => {
            showPassword(e, "Input_ReTypePasswordSignUp_JSX");
          }}
        ></i>
      </div>
      <div className="Div_ReTypePasswordValidState_Style">
        <div id="Div_ReTypePoorPassword_JSX" className="Div_ReTypePoorPassword_Style"></div>
        <div
          id="Div_ReTypeMediumPassword_JSX"
          className="Div_ReTypeMediumPassword_Style"
        ></div>
        <div
          id="Div_ReTypeStrongPassword_JSX"
          className="Div_ReTypeStrongPassword_Style"
        ></div>
      </div>
      <div
        id="Div_SignUpErrorMessage_JSX"
        className="Div_SignInErrorMessage_Style"
      >
        <p id="P_SignUpError_JSX"></p>
      </div>
      <div className="Div_SignUpButton_Style" onClick={() => formValidation()}>
        Create Accunt&nbsp;&nbsp;
        <i className="fas fa-user-plus"></i>
      </div>
      <div className="Div_SignInIcon_Style">
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
