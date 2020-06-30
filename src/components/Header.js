import React from "react";
import "./Header.css";

const Header = ({signIn_F_P}) => {
  return (
    <div className="Div_Header_Style">
      <div className="Div_Logo_Style">
        <i className="I_Logo_Style far fa-comments"></i>
        <p className="P_Title_Style">CYF - Web Chat Messanger</p>
      </div>
      <div className="Div_Start_Style">
        <div className="Div_Start_Main_Style">
          <i className="I_User_Style fas fa-user-circle"></i>
          <p className="P_User_Style">Sign in / Create your Account</p>
          <i class="P_SignIn_Style fas fa-sign-in-alt" onClick={() => signIn_F_P(true)}>
            <span className="Span_SignInTooltip_Style">Sign In</span>
          </i>
          <i class="P_Plus_Style fas fa-plus">
            <span className="Span_PlusTooltip_Style">Sign Up</span>
          </i>

          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Header;
