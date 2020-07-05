import React, { useState } from "react";
import moment from "moment";
import "./SignUp.css";

const SignUp = ({
  signUp_Func_Parm,
  signIn_Func_Parm,
  setUserState_Func_Parm,
  setUserInfo_Func_Parm
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
    } else {
      if (password_Input_Parm === "SignUp_Input_ReTypePassword_Id") {
        setReTypePasswordValid(false);
      }
      if (password_Input_Parm === "SignUp_Input_Password_Id") {
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass > 0 && numberOfValidatePass <= 2) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "none";
      strongPassword_Div.style.display = "none";
      if (password_Input_Parm === "SignUp_Input_ReTypePassword_Id") {
        setReTypePasswordValid(false);
      }
      if (password_Input_Parm === "SignUp_Input_Password_Id") {
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass > 2 && numberOfValidatePass <= 4) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "block";
      strongPassword_Div.style.display = "none";
      if (password_Input_Parm === "SignUp_Input_ReTypePassword_Id") {
        setReTypePasswordValid(false);
      }
      if (password_Input_Parm === "SignUp_Input_Password_Id") {
        setPasswordValid(false);
      }
    }
    if (numberOfValidatePass === 5) {
      poorPassword_Div.style.display = "block";
      mediumPassword_Div.style.display = "block";
      strongPassword_Div.style.display = "block";
      if (password_Input_Parm === "SignUp_Input_ReTypePassword_Id") {
        setReTypePasswordValid(true);
      }
      if (password_Input_Parm === "SignUp_Input_Password_Id") {
        setPasswordValid(true);
      }
    }
    if (numberOfValidatePass === 0) {
      poorPassword_Div.style.display = "none";
      mediumPassword_Div.style.display = "none";
      strongPassword_Div.style.display = "none";
      if (password_Input_Parm === "SignUp_Input_ReTypePassword_Id") {
        setReTypePasswordValid(false);
      }
      if (password_Input_Parm === "SignUp_Input_Password_Id") {
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
  const formValidation_Func = () => {
    let userName_Input = document.getElementById("SignUp_Input_UserName_Id");
    let userName_Div = document.getElementById("SignUp_Div_UserName_Id");
    let password_Input = document.getElementById("SignUp_Input_Password_Id");
    let password_Div = document.getElementById("SignUp_Div_Password_Id");
    let reTypePassword_Input = document.getElementById(
      "SignUp_Input_ReTypePassword_Id"
    );
    let reTypePassword_Div = document.getElementById(
      "SignUp_Div_ReTypePassword_Id"
    );
    let errorMessage_Div = document.getElementById(
      "SignUp_Div_ErrorMessage_Id"
    );
    let signUpIcon_I = document.getElementById("SignUp_I_SignUpIcon_Id");
    let userTitle_P = document.getElementById("Header_P_User_Id");
    if (userName_Input.value === "") {
      userName_Div.style.animation = "SignUp_Keyframes_Error infinite 2s";
    }
    if (password_Input.value === "" || passwordValid === false) {
      password_Div.style.animation = "SignUp_Keyframes_Error infinite 2s";
    }
    if (reTypePassword_Input.value === "" || reTypePasswordValid === false) {
      reTypePassword_Div.style.animation = "SignUp_Keyframes_Error infinite 2s";
    }
    if (reTypePassword_Input.value !== password_Input.value) {
      errorMessage_Div.style.display = "block";
      errorMessage_Div.textContent = "Please make sure your passwords matchs!";
    }
    if (
      reTypePassword_Input.value.length === password_Input.value.length &&
      reTypePassword_Input.value === password_Input.value &&
      passwordValid === true &&
      reTypePasswordValid === true
    ) {
      reTypePassword_Div.style.animation = "none";
      password_Div.style.animation = "none";
      signUpIcon_I.className =
        "SignUp_I_SignUpIcon_CN fa fa-cog fa-spin fa-3x fa-fw";
      fetch(`https://cyf-akaramifar-chat-node.glitch.me/newuser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName_Input.value,
          userPassword: password_Input.value,
          lastOnlineTime: moment().format("MMMM Do YYYY, h:mm:ss a").toString(),
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          if (data.status === "Success") {
            setUserInfo_Func_Parm(data.userId, data.userName, data.userPassword, data.userSecurityCode);
            userTitle_P.textContent = userName_Input.value;
            setUserState_Func_Parm(true);
            signUp_Func_Parm(false);
            signUpIcon_I.className = "fas fa-user-plus";
          } else {
            signUpIcon_I.className = "fas fa-user-plus";
            errorMessage_Div.style.display = "block";
            errorMessage_Div.textContent = data;
          }
        })
        .catch((err) => console.log(err));
    }
  };
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
          id="SignUp_Input_UserName_Id"
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
        <i className="SignUp_P_PasswordInfo_CN fas fa-info-circle"></i>
        <div className="SignUp_Div_PasswordInfo_CN">
          <ul>
            <li>Min 8 Characters</li>
            <li>Upper Case Characters ( A - Z )</li>
            <li>Lower Case Characters ( z - z )</li>
            <li>Numbers ( 0 - 9 )</li>
            <li>Special  Characters ( e.g., !@#$% )</li>
          </ul>
        </div>
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
      <div id="SignUp_Div_ReTypePassword_Id" className="SignUp_Div_Password_CN">
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
        onClick={() => formValidation_Func()}
      >
        Create Account&nbsp;&nbsp;
        <i id="SignUp_I_SignUpIcon_Id" className="fas fa-user-plus"></i>
      </div>
      <div className="SignUp_Div_SignInIcon_CN">
        &nbsp;&nbsp;&nbsp;&nbsp;Sign In
        <i
          className="SignUp_I_SignInIcon_CN fas fa-sign-in-alt"
          onClick={() => {
            signUp_Func_Parm(false);
            signIn_Func_Parm(true);
          }}
        >
          <span className="SignUp_Span_Tooltip_CN">Sign In</span>
        </i>
      </div>
    </div>
  );
};

export default SignUp;
