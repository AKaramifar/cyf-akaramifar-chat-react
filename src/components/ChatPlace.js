import React, { useState } from "react";
import moment from "moment";
import "./ChatPlace.css";
const ChatPlace = ({
  currentUserToChat_Parm,
  userInfo_Parm,
  messages_Parm,
}) => {
  const [editMessage, setEditMessage] = useState(null);
  const sendNewMessage_Func = () => {
    let newMessage = document.getElementById("ChatPlace_Input_Message_CN")
      .value;
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
      });
    }
    document.getElementById("ChatPlace_Input_Message_CN").value = "";
  };
  const editMessage_Func = () => {
    let editedMessage = document.getElementById(
      "ChatPlace_Input_EditMessage_CN"
    ).value;
    if (editedMessage !== "") {
      fetch(`https://cyf-akaramifar-chat-node.glitch.me/editmessage`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: editMessage.messageId,
          message: editedMessage,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          if (data === "Success") {
            document.getElementById("ChatPlace_Input_EditMessage_CN").value =
              "";
            setEditMessage(null);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteMessage_Func = () => {
    fetch(`https://cyf-akaramifar-chat-node.glitch.me/deletemessage`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId: editMessage.messageId,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        if (data === "Success") {
          document.getElementById("ChatPlace_Input_EditMessage_CN").value = "";
          setEditMessage(null);
        }
      })
      .catch((err) => console.log(err));
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
        <div className="ChatPlace_Div_CurrentUserToChatDetile_CN">
          <p className="ChatPlace_P_UserName_CN">
            {currentUserToChat_Parm.userName}
          </p>
          <p className="ChatPlace_P_LastOnlineTime_CN">
            Last Seen: {currentUserToChat_Parm.lastOnlineTime}
          </p>
        </div>
      </div>
      <div
        id="ChatPlace_Div_MessagesBox_Id"
        className="ChatPlace_Div_MessagesBox_CN"
      >
        {messages_Parm !== null
          ? messages_Parm.map((message, index) => {
              return message.senderUserId === userInfo_Parm.userId ? (
                <div
                  className="ChatPlace_Div_MessageSender_CN"
                  key={index}
                  onClick={() =>
                    setEditMessage({
                      messageId: message.messageId,
                      MessageToEdit: message.message,
                    })
                  }
                >
                  <div className="ChatPlace_Div_MessageSenderPart_CN">
                    <p className="ChatPlace_P_MessageSender_CN">
                      {message.message}
                    </p>
                    <p className="ChatPlace_P_MessageTimeSender_CN">
                      {message.messageTime}
                    </p>
                  </div>
                  <div>
                    <i className="ChatPlace_I_OnlineUserIcon_CN fas fa-user-circle"></i>
                  </div>
                </div>
              ) : (
                <div className="ChatPlace_Div_MessageReceiver_CN" key={index}>
                  <div>
                    <i
                      className={
                        currentUserToChat_Parm.online === "true"
                          ? "ChatPlace_I_OnlineUserIcon_CN fas fa-user-circle"
                          : "ChatPlace_I_UserIcon_CN fas fa-user-circle"
                      }
                    ></i>
                  </div>
                  <div className="ChatPlace_Div_MessageReceiverPart_CN">
                    <p className="ChatPlace_P_MessageReceiver_CN">
                      {message.message}
                    </p>
                    <p className="ChatPlace_P_MessageTimeReceiver_CN">
                      {message.messageTime}
                    </p>
                  </div>
                </div>
              );
            })
          : null}
        {editMessage !== null ? (
          <div className="Chatplace_Div_EditMessageParnet_CN">
            <div className="Chatplace_Div_EditMessageChild_CN">
              <div className="ChatPlace_Div_CloseIcon_CN">
                <i
                  className="ChatPlace_I_CloseIcon_CN fas fa-times-circle"
                  onClick={() => setEditMessage(null)}
                ></i>
              </div>
              <div className="Chatplace_Div_Message_0_CN">
                <div className="Chatplace_Div_Message_CN">
                  <p className="ChatPlace_P_MessageSender_CN">
                    {editMessage.MessageToEdit}
                  </p>
                </div>
              </div>
              <div className="Chatplace_Div_InputMessage_CN">
                <input
                  id="ChatPlace_Input_EditMessage_CN"
                  className="ChatPlace_Input_SendMessage_CN"
                  placeholder="Type a message"
                  spellCheck="false"
                  autoComplete="off"
                  required
                ></input>
              </div>
              <div className="ChatPlace_Div_Buttons_CN">
                <p
                  className="ChatPlace_P_Buttons_CN"
                  onClick={() => deleteMessage_Func()}
                >
                  Delete
                </p>
                <p
                  className="ChatPlace_P_Buttons_CN"
                  onClick={() => editMessage_Func()}
                >
                  Edit
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="ChatPlace_Div_WriteMessage_CN">
        <input
          id="ChatPlace_Input_Message_CN"
          className="ChatPlace_Input_SendMessage_CN"
          placeholder="Type a message"
          spellCheck="false"
          autoComplete="off"
          required
        ></input>
        <i
          className="ChatPlace_I_SendIcon_CN far fa-paper-plane"
          onClick={() => {
            sendNewMessage_Func();
          }}
        ></i>
      </div>
    </div>
  );
};

export default ChatPlace;
