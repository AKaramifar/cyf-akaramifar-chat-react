import React, { useState } from "react";
import "./SignUp.css";
// if (
//   password_Input.value.length === reTypePassword_Input.value.length &&
//   password_Input.value !== reTypePassword_Input.value &&
//   password_Input.length > 0
// ) {
//   console.log("true");
//   reTypePasswordDiv.style.animation = "error infinite 2s";
//   passwordDiv.style.animation = "error infinite 2s";
// }
const SignUp = ({
  signUp_Func_Parm,
  signIn_Func_Parm,
  setUserState_Func_Parm,
}) => {
  const [passwordValid, setPasswordValid] = useState(false);
  const [reTypePasswordValid, setReTypePasswordValid] = useState(false);
  const passwordValidator_Func = (
    password_Input_Parm,
    password_Div_Parm,
    errorMessage_Div_Parm,
    strongPassword_Div_Parm,
    mediumPassword_Div_Parm,
    poorPassword_Div_Parm
  ) => {
    let numberOfValidatePass = 0;
    let password_Input = document.getElementById(password_Input_Parm);
    let password_Div = document.getElementById(password_Div_Parm);
    let strongPassword_Div = document.getElementById(strongPassword_Div_Parm);
    let mediumPassword_Div = document.getElementById(mediumPassword_Div_Parm);
    let poorPassword_Div = document.getElementById(poorPassword_Div_Parm);
    let errorMessage_Div = document.getElementById(errorMessage_Div_Parm);
    if (password_Input.value.length > 0) {
      password_Div.style.animation = "none";
      errorMessage_Div.style.display = "none";
    } else {
      password_Div.style.animation = "error infinite 2s";
    }
    if (/\d/.test(password_Input.value)) {
      numberOfValidatePass += 1;
    }
    if (/[a-z]/g.test(password_Input.value)) {
      numberOfValidatePass += 1;
    }
    if (/[A-Z]/g.test(password_Input.value)) {
      numberOfValidatePass += 1;
    }
    if (/[-!$%^&*()#@_+|~=`{}\]:";'<>?,.]/.test(password_Input.value)) {
      numberOfValidatePass += 1;
    }
    if (password_Input.value.length >= 8) {
      numberOfValidatePass += 1;
    }
    else{
      if(password_Input_Parm === "SignUp_Input_ReTypePassword_Id"){
        setReTypePasswordValid(false);
      }
      if(password_Input_Parm === "SignUp_Input_Password_Id"){
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass > 0 && numberOfValidatePass <= 2) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "none";
      strongPassword_Div.style.display = "none";
      if(password_Input_Parm === "SignUp_Input_ReTypePassword_Id"){
        setReTypePasswordValid(false);
      }
      if(password_Input_Parm === "SignUp_Input_Password_Id"){
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass > 2 && numberOfValidatePass <= 4) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "block";
      strongPassword_Div.style.display = "none";
      if(password_Input_Parm === "SignUp_Input_ReTypePassword_Id"){
        setReTypePasswordValid(false);
      }
      if(password_Input_Parm === "SignUp_Input_Password_Id"){
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass === 5) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "block";
      strongPassword_Div.style.display = "block";
      if(password_Input_Parm === "SignUp_Input_ReTypePassword_Id"){
        setReTypePasswordValid(true);
      }
      if(password_Input_Parm === "SignUp_Input_Password_Id"){
        setPasswordValid(true);
      }
    }
    if (numberOfValidatePass === 0) {
      poorPassword_Div.style.display = "none";
      mediumPassword_Div.style.display = "none";
      strongPassword_Div.style.display = "none";
      if(password_Input_Parm === "SignUp_Input_ReTypePassword_Id"){
        setReTypePasswordValid(false);
      }
      if(password_Input_Parm === "SignUp_Input_Password_Id"){
        setPasswordValid(false);
      }
    }
  };
  const showPassword_Func = (icon_I, password_Input_Id) => {
    if (icon_I.target.className === "SignUp_I_EyeIcon_CN far fa-eye-slash") {
      icon_I.target.className = "SignUp_I_EyeIcon_CN far fa-eye";
      document.getElementById(password_Input_Id).type = "password";
    } else {
      icon_I.target.className = "SignUp_I_EyeIcon_CN far fa-eye-slash";
      document.getElementById(password_Input_Id).type = "text";
    }
  };
  // const formValidation = () => {
  //   let numberOfEmptyElements = 0;
  //   let userName = document.getElementById("Input_UserNameSignUp_JSX");
  //   let password = document.getElementById("Input_PasswordSignUp_JSX");
  //   let reTypePassword = document.getElementById(
  //     "Input_ReTypePasswordSignUp_JSX"
  //   );
  //   let userNameDiv = document.getElementById("Div_UserNameSignUp_JSX");
  //   let passwordDiv = document.getElementById("Div_PasswordSignUp_JSX");
  //   let reTypePasswordDiv = document.getElementById(
  //     "Div_ReTypePasswordSignUp_JSX"
  //   );
  //   let showErrorDiv = document.getElementById("Div_SignUpErrorMessage_JSX");
  //   let showError = document.getElementById("P_SignUpError_JSX");
  //   let userTitle = document.getElementById("P_UserSignUp_JSX");
  //   if (userName.value === "") {
  //     numberOfEmptyElements += 1;
  //     userNameDiv.style.animation = "error infinite 2s";
  //     showErrorDiv.style.display = "none";
  //   } else {
  //     userNameDiv.style.animation = "none";
  //   }
  //   if (password.value === "") {
  //     numberOfEmptyElements += 1;
  //     passwordDiv.style.animation = "error infinite 2s";
  //     showErrorDiv.style.display = "none";
  //   } else {
  //     password.style.animation = "none";
  //   }
  //   if (reTypePassword.value === "") {
  //     numberOfEmptyElements += 1;
  //     reTypePasswordDiv.style.animation = "error infinite 2s";
  //     showErrorDiv.style.display = "none";
  //   } else {
  //     reTypePasswordDiv.style.animation = "none";
  //   }
  //   if (
  //     password.length === reTypePassword.length &&
  //     password.value !== reTypePassword.value &&
  //     password.length > 0
  //   ) {
  //     reTypePasswordDiv.style.animation = "error infinite 2s";
  //     passwordDiv.style.animation = "error infinite 2s";
  //   }
  //   if (numberOfEmptyElements === 0) {
  //     fetch(
  //       `https://cyf-akaramifar-chat-node.glitch.me/signin?username=${userName.value}&password=${password.value}`,
  //       { method: "POST" }
  //     )
  //       .then((Response) => Response.json())
  //       .then((data) => {
  //         showError.textContent = data;
  //         showErrorDiv.style.display = "block";
  //         if (data === "Success") {
  //           setUserState_Func_Parm(true);
  //           userTitle.textContent = userName.value;
  //           signUp_Func_Parm(false);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  return (
    <div className="SignUp_Div_SignUp_CN">
      <div className="SignUp_Div_CloseButton_CN">
        <i
          className="SignUp_P_CloseButton_CN fas fa-times-circle"
          onClick={() => signUp_Func_Parm(false)}
        ></i>
      </div>
      <div className="SignUp_Div_UserIcon_CN">
        <i className="SignUp_I_UserIcon_CN fas fa-user-circle"></i>
      </div>
      <div id="SignUp_Div_UserName_Id" className="SignUp_Div_UserName_CN">
        <i className="SignUp_I_UserNameIcon_CN fas fa-user-circle"></i>
        <input
          id="SignUp_Input_UserName_JSX"
          className="SignUp_Input_UserName_CN"
          spellCheck="false"
          autoComplete="off"
          placeholder="Type Your User Name..."
          type="text"
          onChange={() => {
            let userName_Div = document.getElementById(
              "SignUp_Div_UserName_Id"
            );
            let showError_Div = document.getElementById(
              "SignUp_Div_ErrorMessage_Id"
            );
            userName_Div.style.animation = "";
            showError_Div.style.display = "none";
          }}
        ></input>
      </div>
      <div id="SignUp_Div_Password_Id" className="SignUp_Div_Password_CN">
        <i className="SignUp_I_LockIcon_CN fas fa-lock"></i>
        <input
          id="SignUp_Input_Password_Id"
          placeholder="Type Your Password..."
          type="password"
          className="SignUp_Input_Password_CN"
          onChange={(e) => {
            passwordValidator_Func(
              "SignUp_Input_Password_Id",
              "SignUp_Div_Password_Id",
              "SignUp_Div_ErrorMessage_Id",
              "SignUp_Div_StrongPassword_Id",
              "SignUp_Div_MediumPassword_Id",
              "SignUp_Div_PoorPassword_Id"
            );
          }}
        ></input>
        <i
          className="SignUp_I_EyeIcon_CN far fa-eye"
          onClick={(e) => {
            showPassword_Func(e, "SignUp_Input_Password_Id");
          }}
        ></i>
      </div>
      <div className="SignUp_Div_PasswordValidState_CN">
        <div
          id="SignUp_Div_PoorPassword_Id"
          className="SignUp_Div_PoorPassword_CN"
        ></div>
        <div
          id="SignUp_Div_MediumPassword_Id"
          className="SignUp_Div_MediumPassword_CN"
        ></div>
        <div
          id="SignUp_Div_StrongPassword_Id"
          className="SignUp_Div_StrongPassword_CN"
        ></div>
      </div>
      <div
        id="SignUp_Div_ReTypePassword_Id"
        className="SignUp_Div_Password_CN"
      >
        <i className="SignUp_I_LockIcon_CN fas fa-lock"></i>
        <input
          id="SignUp_Input_ReTypePassword_Id"
          placeholder="Re-Type Your Password..."
          type="password"
          className="SignUp_Input_Password_CN"
          onChange={(e) => {
            passwordValidator_Func(
              "SignUp_Input_ReTypePassword_Id",
              "SignUp_Div_ReTypePassword_Id",
              "SignUp_Div_ErrorMessage_Id",
              "SignUp_Div_ReTypeStrongPassword_Id",
              "SignUp_Div_ReTypeMediumPassword_Id",
              "SignUp_Div_ReTypePoorPassword_Id"
            );
          }}
        ></input>
        <i
          className="SignUp_I_EyeIcon_CN far fa-eye"
          onClick={(e) => {
            showPassword_Func(e, "SignUp_Input_ReTypePassword_Id");
          }}
        ></i>
      </div>
      <div className="SignUp_Div_ReTypePasswordValidState_CN">
        <div
          id="SignUp_Div_ReTypePoorPassword_Id"
          className="SignUp_Div_ReTypePoorPassword_CN"
        ></div>
        <div
          id="SignUp_Div_ReTypeMediumPassword_Id"
          className="SignUp_Div_ReTypeMediumPassword_CN"
        ></div>
        <div
          id="SignUp_Div_ReTypeStrongPassword_Id"
          className="SignUp_Div_ReTypeStrongPassword_CN"
        ></div>
      </div>
      <div
        id="SignUp_Div_ErrorMessage_Id"
        className="SignUp_Div_ErrorMessage_CN"
      >
        <p id="SignUp_P_ErrorMessage_Id"></p>
      </div>
      <div
        className="SignUp_Div_SignUpButton_CN"
        // onClick={() => formValidation_Func()}
      >
        Create Accunt&nbsp;&nbsp;
        <i className="fas fa-user-plus"></i>
      </div>
      <div className="SignUp_Div_SignInIcon_CN">
        &nbsp;&nbsp;&nbsp;&nbsp;Sign In
        <i
          className="SignUp_I_SignInIcon_CN fas fa-sign-in-alt"
          onClick={() => {
            signUp_Func_Parm(true);
            signIn_Func_Parm(false);
          }}
        >
          <span className="SignUp_Span_Tooltip_CN">Sign In</span>
        </i>
      </div>
    </div>
  );
};

export default SignUp;
