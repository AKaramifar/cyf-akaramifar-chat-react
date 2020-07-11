import React, { useState } from "react";
import Header from "./components/Header.js";
import SignUp from "./components/SignUp.js";
import SignIn from "./components/SignIn.js";
import MainPanel from "./components/MainPanel.js";
import "./App.css";

function App() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const signIn_Func = (state) => {
    setSignIn(state);
  };
  const signUp_Func = (state) => {
    setSignUp(state);
  };
  const setUserInfo_Func = (
    userId_Parm,
    userName_Parm,
    userPassword_Parm,
    userSecurityCode_Parm
  ) => {
    setUserInfo({
      userName: userName_Parm,
      userPassword: userPassword_Parm,
      userId: userId_Parm,
      userSecurityCode: userSecurityCode_Parm,
    });
  };
  return (
    <div className="Div_App_style">
      <Header
        userInfo_Parm={userInfo}
        signUp_Func_Parm={signUp_Func}
        signIn_Func_Parm={signIn_Func}
      />
      {signIn ? (
        <SignIn
          signUp_Func_Parm={signUp_Func}
          signIn_Func_Parm={signIn_Func}
          setUserInfo_Func_Parm={setUserInfo_Func}
        />
      ) : null}
      {signUp ? (
        <SignUp
          signUp_Func_Parm={signUp_Func}
          signIn_Func_Parm={signIn_Func}
          setUserInfo_Func_Parm={setUserInfo_Func}
        />
      ) : null}
      <div className="App_Div_MainBody_CN">
        {userInfo !== null ? <MainPanel userInfo_Parm={userInfo}/> : null}
      </div>
    </div>
  );
}
export default App;
