import React from "react";
import "./Header.css";

const Header = ({ signUp_Func_Parm, signIn_Func_Parm, userState_Parm }) => {
  return (
    <div className="Header_Div_Header_CN">
      <div className="Header_Div_Logo_CN">
        <i className="Header_I_Logo_CN far fa-comments"></i>
        <p className="Header_P_Title_CN">CYF - Web Chat Messanger</p>
      </div>
      <div className="Header_Div_Start_CN">
        <div id="Header_Div_Start_Main_Id" className={userState_Parm ? "Header_Div_Start_Main_CN Header_Div_Start_Main_LogedIn_CN" : "Header_Div_Start_Main_CN"}>
          <i className="Header_I_User_CN fas fa-user-circle"></i>
          <p id="Header_P_User_Id" className="Header_P_User_CN">
            Sign in / Create your Account
          </p>
          {userState_Parm ? null : (
            <i
              className="Header_P_SignIn_CN fas fa-sign-in-alt"
              onClick={() => signIn_Func_Parm(true)}
            >
              <span className="Header_Span_SignInTooltip_CN">Sign In</span>
            </i>
          )}
          {userState_Parm ? (
            <i
              className="Header_P_SignOut_CN fas fa-sign-out-alt"              
            >
              <span className="Header_Span_SignOutTooltip_CN">Sign Out</span>
            </i>
          ) : null}
          {userState_Parm ? null : (
            <i className="Header_P_SignUp_CN fas fa-user-plus" onClick={() => signUp_Func_Parm(true)}>
              <span className="Header_Span_SignUpTooltip_CN">Sign Up</span>
            </i>
          )}
        </div>
      </div>
      <div id="Header_Div_Online_Id" className={userState_Parm ? "Header_Div_OnlineState_CN Header_Div_Onlinetrue_CN" : "Header_Div_OnlineState_CN"}>
        <i className="fas fa-globe-americas"></i>
        <p className="Header_P_Online_CN">&nbsp;Online</p>
      </div>
    </div>
  );
};

export default Header;
