import React from "react";
import moment from "moment";
import "./ChatPlace.css";

const ChatPlace = ({ currentUserToChat_Parm, userInfo_Parm }) => {
  const sendNewMessage_Func = () => {
    let newMessage = document.getElementById("ChatPlace_Input_Message_CN").value;
    let senderUserId = userInfo_Parm.userId;
    let receiverUserId = currentUserToChat_Parm.userId;
    if (newMessage !== "") {
      fetch(`https://cyf-akaramifar-chat-node.glitch.me/newmessage`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderUserId: senderUserId,
          receiverUserId: receiverUserId,
          groupId: "null",
          message: newMessage,
          messageTime: moment().format("MMMM Do YYYY, h:mm:ss a").toString(),
        }),
      })
    }
  };
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
          Last Seen: {currentUserToChat_Parm.lastOnlineTime},
          {currentUserToChat_Parm.online === "true" ? " Online" : " Offline"}
        </p>
      </div>
      <div className="ChatPlace_Div_MessagesBox_CN"></div>
      <div className="ChatPlace_Div_WriteMessage_CN">
        <input
          id="ChatPlace_Input_Message_CN"
          className="ChatPlace_Input_SendMessage_CN"
          placeholder="Type a message"
          spellCheck="false"
          autoComplete="off"
        ></input>
        <i
          className="ChatPlace_I_SendIcon_CN far fa-paper-plane"
          onClick={() => sendNewMessage_Func()}
        ></i>
      </div>
    </div>
  );
};

export default ChatPlace;
