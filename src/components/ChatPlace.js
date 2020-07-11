import React, { Component } from "react";
import moment from "moment";
import "./ChatPlace.css";
// ({ currentUserToChat_Parm, userInfo_Parm, setMessages_Func_Parm, messages_Parm }) => {
class ChatPlace extends Component {
  getMessages_Func = () => {
    fetch(`https://cyf-akaramifar-chat-node.glitch.me/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: this.props.userInfo_Parm.userId,
        currentUserName: this.props.userInfo_Parm.userName,
        currentUserPassword: this.props.userInfo_Parm.userPassword,
        currentUserSecurityCode: this.props.userInfo_Parm.userSecurityCode,
        currentUserIdToChat: this.props.currentUserToChat_Parm.userId,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        this.props.setMessages_Func_Parm(data);
        setTimeout(() => this.getMessages_Func(), 2000);
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getMessages_Func();
  }
  sendNewMessage_Func = () => {
    let newMessage = document.getElementById("ChatPlace_Input_Message_CN")
      .value;
    let senderUserId = this.props.userInfo_Parm.userId;
    let receiverUserId = this.props.currentUserToChat_Parm.userId;
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
  render() {
    return (
      <div className="ChatPlace_Div_ChatPlace_CN">
        <div className="ChatPlace_Div_ReceiverUser_CN">
          <i
            className={
              this.props.currentUserToChat_Parm.online === "true"
                ? "ChatPlace_I_OnlineUserIcon_CN fas fa-user-circle"
                : "ChatPlace_I_UserIcon_CN fas fa-user-circle"
            }
          ></i>
          <div className="ChatPlace_Div_CurrentUserToChatDetile_CN">
            <p className="ChatPlace_P_UserName_CN">
              {this.props.currentUserToChat_Parm.userName}
            </p>
            <p className="ChatPlace_P_LastOnlineTime_CN">
              Last Seen: {this.props.currentUserToChat_Parm.lastOnlineTime}
            </p>
          </div>
        </div>
        <div
          id="ChatPlace_Div_MessagesBox_Id"
          className="ChatPlace_Div_MessagesBox_CN"
        >
          {this.props.messages_Parm !== null
            ? this.props.messages_Parm.map((message, index) => {
                return message.senderUserId ===
                  this.props.userInfo_Parm.userId ? (
                  <div className="ChatPlace_Div_MessageSender_CN" key={index}>
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
                          this.props.currentUserToChat_Parm.online === "true"
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
        </div>
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
            onClick={() => {
              this.sendNewMessage_Func();
            }}
          ></i>
        </div>
      </div>
    );
  }
}

export default ChatPlace;
