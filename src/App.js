import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import SignUp from "./components/SignUp.js";
import SignIn from "./components/SignIn.js";
import AllUsers from "./components/AllUsers.js";
import MyPannel from "./components/MyPannel.js";
import ChatPlace from "./components/ChatPlace.js";
import "./App.css";

function App() {
  const [userState, setUserState] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [requestAllUsers, setRequestAllUsers] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (requestAllUsers !== "") {
      fetch(requestAllUsers, { method: "POST" })
        .then((Response) => Response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, [requestAllUsers]);
  const signIn_Func = (state) => {
    setSignIn(state);
  };
  const signUp_Func = (state) => {
    setSignUp(state);
  };
  const setUserState_Func = (userStateParm) => {
    setUserState(userStateParm);
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
    setRequestAllUsers(
      `https://cyf-akaramifar-chat-node.glitch.me/users?userid=${escape(
        userId_Parm
      )}&username=${escape(userName_Parm)}&userpassword=${escape(
        userPassword_Parm
      )}&usersecuritycode=${escape(userSecurityCode_Parm)}`
    );
  };
  return (
    <div className="Div_App_style">
      <Header
        userInfo_Parm={userInfo}
        signUp_Func_Parm={signUp_Func}
        signIn_Func_Parm={signIn_Func}
        userState_Parm={userState}
        setUserState_Func_Parm={setUserState_Func}
      />
      {signIn ? (
        <SignIn
          signUp_Func_Parm={signUp_Func}
          signIn_Func_Parm={signIn_Func}
          setUserState_Func_Parm={setUserState_Func}
          setUserInfo_Func_Parm={setUserInfo_Func}
        />
      ) : null}
      {signUp ? (
        <SignUp
          signUp_Func_Parm={signUp_Func}
          signIn_Func_Parm={signIn_Func}
          setUserState_Func_Parm={setUserState_Func}
          setUserInfo_Func_Parm={setUserInfo_Func}
        />
      ) : null}
      <div className="App_Div_MainBody_CN">
        {userState ? <AllUsers users_Parm={users} userInfo_Parm={userInfo}/> : null}
        {userState ? <ChatPlace /> : null}
        {userState ? <MyPannel /> : null}
      </div>
    </div>
  );
}

export default App;
