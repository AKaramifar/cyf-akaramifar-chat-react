import React, { Component } from "react";
import "./MyPanel.css";

class MyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadMessage: null,
      UsersMessageSender: null,
    };
  }
  componentDidMount() {
    let users = [];
    let UsersMessageSender_LV = [];
    // let unreadMessages = [];
    this.props.users_Parm.forEach((user) => {
      this.props.messages_Parm.forEach((message) => {
        if (
          user.userId === message.senderUserId &&
          this.props.currentUserId_Parm !== user.userId
        ) {
          users.push({
            userId: user.userId,
            userName: user.userName,
            lastOnlineTime: user.lastOnlineTime,
            online: user.online,
            read: message.read
          });
        }
      });

      // if (allMessage.indexOf(user.userName) === -1) {
      //
      // }

      // unreadMessage.forEach(uMUuser =>{
      //   user.userName
      // })
      // if (unreadMessages.indexOf(user.userName) === -1 && !user.read) {

      //   unreadMessages.push(user.userName);
      // }
    });
    let messageCounter = 0;
    users.forEach((user) => {
      UsersMessageSender_LV.forEach((UMSender) => {
        if (UMSender.userName === user.userName) {
          messageCounter += 1;
        }
      });
      if (messageCounter === 0) {
        UsersMessageSender_LV.push(user);
      }
      messageCounter = 0;
    });
    this.setState({ UsersMessageSender: UsersMessageSender_LV });
    // console.log(users);
    // console.log(UsersMessageSender_LV);
    // console.log(unreadMessages);
  }
  render() {
    return (
      <div className="MyPannel_Div_MyPanel_CN">
        <div className="MyPanel_Div_UnreadMessages_CN">
          <p className="MyPanel_P_UnreadMessages_CN">Unread Chats</p>
          <div className="MyPanel_Div_UnreadMessagesChild_CN"></div>
        </div>
        <div className="MyPanel_Div_AllMessages_CN">
          <p className="MyPanel_P_UnreadMessages_CN">All Chats</p>
          <div className="MyPanel_Div_AllMessagesChild_CN">
            {this.state.UsersMessageSender && this.state.UsersMessageSender.map((user, index) => {
              return (
                <div
                className="AllUsers_Div_User_CN"
                onClick={() => {                  
                  this.props.setCurrentUserToChat_Func_Parm(user);
                  console.log(user)
                }}
                key={`User_${index}`}
              >
                <i
                  className={
                    user.online === "true"
                      ? "AllUsers_I_OnlineUserIcon_CN fas fa-user-circle"
                      : "AllUsers_I_UserIcon_CN fas fa-user-circle"
                  }
                ></i>
                <div>
                  <p className="AllUsers_P_UserName_CN">{user.userName}</p>
                  <p className="AllUsers_P_LastOnlineTime_CN">
                    Last Seen: {user.lastOnlineTime}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPanel;
