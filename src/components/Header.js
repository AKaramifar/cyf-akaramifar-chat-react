import React from "react";
import "./Header.css";

const Header = ({ signIn_Func_Parm, userState_Parm }) => {
  return (
    <div className="Div_Header_Style">
      <div className="Div_Logo_Style">
        <i className="I_Logo_Style far fa-comments"></i>
        <p className="P_Title_Style">CYF - Web Chat Messanger</p>
      </div>
      <div className="Div_Start_Style">
        <div id="Div_Start_Main_JSX" className={userState_Parm ? "Div_Start_Main_Style Div_Start_Main_LogedIn_Style" : "Div_Start_Main_Style"}>
          <i className="I_User_Style fas fa-user-circle"></i>
          <p id="P_User_JSX" className="P_User_Style">
            Sign in / Create your Account
          </p>
          {userState_Parm ? null : (
            <i
              className="P_SignIn_Style fas fa-sign-in-alt"
              onClick={() => signIn_Func_Parm(true)}
            >
              <span className="Span_SignInTooltip_Style">Log In</span>
            </i>
          )}
          {userState_Parm ? (
            <i
              className="P_SignOut_Style fas fa-sign-out-alt"
              onClick={() => signIn_Func_Parm(true)}
            >
              <span className="Span_SignOutTooltip_Style">Log Out</span>
            </i>
          ) : null}
          {userState_Parm ? null : (
            <i className="P_SignUp_Style fas fa-user-plus">
              <span className="Span_SignUpTooltip_Style">Sign Up</span>
            </i>
          )}
        </div>
      </div>
      <div id="Div_Online_JSX" className={userState_Parm ? "Div_OnlineState_Style Div_Onlinetrue_Style" : "Div_OnlineState_Style"}>
        <i className="fas fa-globe-americas"></i>
        <p className="P_Online_Style">&nbsp;Online</p>
      </div>
    </div>
  );
};

export default Header;
