import React, { Component } from "react";
import "./MyPanel.css";

class MyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadMessage: null,
      allMessage: null,
    };
  }
  componentDidMount() {
    let users = [];
    let allMessage = [];
    let unreadMessages = [];
    this.props.users_Parm.forEach((user, index) => {
      this.props.messages_Parm.forEach((message, index) => {
        if (
          user.userId === message.senderUserId &&
          this.props.currentUserId_Parm !== user.userId
        ) {
          users.push({
            userName: user.userName,
            lastSeenTime: user.lastOnlineTime,
            read: message.read
          });
        }
      });
      users.forEach(user => {
        if(allMessage.indexOf(user.userName) === -1){
          allMessage.push(user.userName)
        }
        if(unreadMessages.indexOf(user.userName) === -1 && !user.read){
          unreadMessages.push(user.userName)
        }
      })      
    });
    console.log(users);
    console.log(allMessage)
    console.log(unreadMessages)
  }
  render() {
    return (
      <div className="MyPannel_Div_MyPanel_CN">
        <div className="MyPanel_Div_UnreadMessages_CN">
          <p className="MyPanel_P_UnreadMessages_CN">Unread Messages</p>
          <div className="MyPanel_Div_UnreadMessagesChild_CN"></div>
        </div>
        <div className="MyPanel_Div_AllMessages_CN">
          <p className="MyPanel_P_UnreadMessages_CN">All Messages</p>
          <div className="MyPanel_Div_AllMessagesChild_CN"></div>
        </div>
      </div>
    );
  }
}

export default MyPanel;
