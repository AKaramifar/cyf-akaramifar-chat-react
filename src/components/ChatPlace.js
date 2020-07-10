import React from "react";
import "./ChatPlace.css";

const ChatPlace = ({ currentUserToChat_Parm }) => {
  return (
    <div className="ChatPlace_Div_ChatPlace_CN">
      <div className="ChatPlace_Div_ReceiverUser_CN">
        <i
          className={
            currentUserToChat_Parm.online === "true"
              ? "ChatPlace_I_OnlineUserIcon_CN fas fa-user-circle"
              : "ChatPlace_I_UserIcon_CN fas fa-user-circle"
          }
        ></i>
        <p className="ChatPlace_P_UserName_CN">
          {currentUserToChat_Parm.userName},
        </p>
        <p className="ChatPlace_P_LastOnlineTime_CN">
          Last Seen: {currentUserToChat_Parm.lastOnlineTime},{currentUserToChat_Parm.online === "true" ? " Online" : " Offline"}
        </p>
      </div>
      <div className="ChatPlace_Div_MessagesBox_CN"></div>
      <div className="ChatPlace_Div_WriteMessage_CN">
        <input
          className="ChatPlace_Input_SendMessage_CN"
          placeholder="Type a message"
          spellCheck="false"
          autoComplete="off"
        ></input>
        <i className="ChatPlace_I_SendIcon_CN far fa-paper-plane"></i>
      </div>
    </div>
  );
};

export default ChatPlace;
