import React, { Component } from "react";
import "./MainPanel.css";
import AllUsers from "./AllUsers.js";
import ChatPlace from "./ChatPlace.js";
import MyPanel from "./MyPanel.js";

class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      currentUserToChat: null,
      messages: null,
      messagesBetweenCurrentUsers: null,
      usersMessageSender: null,
      unreadUsersMessageSender: null,
    };
  }

  componentDidMount() {
    this.MyPanelDate = (allUsers_Parm, allMessages_Parm) => {
      let AllMyUsersMessages = [];
      let usersMessageSender_LV = [];
      let unreadUsersMessageSender_LV = [];
      allUsers_Parm.forEach((user) => {
        allMessages_Parm.forEach((message) => {
          if (user.userId === message.senderUserId) {
            AllMyUsersMessages.push({
              userId: user.userId,
              userName: user.userName,
              lastOnlineTime: user.lastOnlineTime,
              online: user.online,
              read: message.read,
            });
          }
        });
      });
      let messageCounter = 0;
      AllMyUsersMessages.forEach((user) => {
        // Users Message Sender
        usersMessageSender_LV.forEach((UMSender) => {
          if (UMSender.userName === user.userName) {
            messageCounter += 1;
          }
        });
        if (user.read) {
          if (
            messageCounter === 0 &&
            user.userId !== this.props.userInfo_Parm.userId
          ) {
            usersMessageSender_LV.push(user);
          }
        } else {
          if (messageCounter !== 0) {
            let removedUser = [];
            usersMessageSender_LV.forEach((element) => {
              if (element.userName !== user.userName) {
                removedUser.push(element);
              }
            });
            usersMessageSender_LV = JSON.parse(JSON.stringify(removedUser));
            removedUser = [];
          }
        }
        messageCounter = 0;
        //Unread Message User Sender
        unreadUsersMessageSender_LV.forEach((UMSender) => {
          if (UMSender.userName === user.userName) {
            messageCounter += 1;
          }
        });
        if (!user.read) {
          if (
            messageCounter === 0 &&
            user.userId !== this.props.userInfo_Parm.userId
          ) {
            unreadUsersMessageSender_LV.push(user);
          }
        } else {
          if (messageCounter !== 0) {
            let removedUser = [];
            unreadUsersMessageSender_LV.forEach((element) => {
              if (element.userName !== user.userName) {
                removedUser.push(element);
              }
            });
            unreadUsersMessageSender_LV = JSON.parse(
              JSON.stringify(removedUser)
            );
            removedUser = [];
          }
        }
        messageCounter = 0;
      });
      let allReceiverUserId = [];
      allMessages_Parm.forEach((message) => {
        if (message.senderUserId === this.props.userInfo_Parm.userId) {
          allReceiverUserId.push(message.receiverUserId);
        }
      });
      let allMyUser = [];
      usersMessageSender_LV.forEach((UMS) => {
        allMyUser.push(UMS.userId);
      });
      unreadUsersMessageSender_LV.forEach((UMS) => {
        allMyUser.push(UMS.userId);
      });
      allReceiverUserId.forEach((El_P) => {
        let togle = 0;
        allMyUser.forEach((El_Ch) => {
          if (El_P === El_Ch) {
            togle = 1;
          }
        });
        if (togle === 0) {
          allUsers_Parm.forEach((all_u) => {
            if (all_u.userId === El_P) usersMessageSender_LV.push(all_u);
          });
        }
      });
      this.setState({ usersMessageSender: usersMessageSender_LV });
      this.setState({ unreadUsersMessageSender: unreadUsersMessageSender_LV });
    };
    this.getMessages_Func = () => {
      fetch(`https://cyf-akaramifar-chat-node.glitch.me/data`, {
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
          currentUserToChat:
            this.state.currentUserToChat !== null
              ? this.state.currentUserToChat.userId
              : null,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          this.setState({ users: data[0] });
          this.setState({ messages: data[1] });
          this.MyPanelDate(data[0], data[1]);
          if (this.state.currentUserToChat !== null) {
            let usersId = [
              this.props.userInfo_Parm.userId,
              this.state.currentUserToChat.userId,
            ];
            this.setState({
              messagesBetweenCurrentUsers: this.state.messages.filter(
                (message) =>
                  usersId.indexOf(message.senderUserId) > -1 &&
                  usersId.indexOf(message.receiverUserId) > -1
              ),
            });
          }
          setTimeout(() => this.getMessages_Func(), 2000);
        })
        .catch((err) => console.log(err));
    };
    this.setCurrentUserToChat_Func = (user) => {
      this.setState({ currentUserToChat: user });
      let usersId = [this.props.userInfo_Parm.userId, user.userId];
      this.setState({
        messagesBetweenCurrentUsers: this.state.messages.filter(
          (message) =>
            usersId.indexOf(message.senderUserId) > -1 &&
            usersId.indexOf(message.receiverUserId) > -1
        ),
      });
    };
    this.getMessages_Func();
  }

  render() {
    return (
      <div className="MainPanel_Div_MainBody_CN">
        {this.state.users !== null ? (
          <AllUsers
            setCurrentUserToChat_Func_Parm={this.setCurrentUserToChat_Func}
            users_Parm={this.state.users}
            userInfo_Parm={this.props.userInfo_Parm}
            setMessages_Func_Parm={this.setMessages_Func}
          />
        ) : null}
        {this.state.currentUserToChat !== null ? (
          <ChatPlace
            currentUserToChat_Parm={this.state.currentUserToChat}
            userInfo_Parm={this.props.userInfo_Parm}
            messages_Parm={this.state.messagesBetweenCurrentUsers}
          />
        ) : null}
        {this.state.usersMessageSender !== null &&
        this.state.unreadUsersMessageSender !== null ? (
          <MyPanel
            setCurrentUserToChat_Func_Parm={
              this.setCurrentUserToChat_Func
            }
            usersMessageSender_Parm={this.state.usersMessageSender}
            unreadUsersMessageSender_Parm={this.state.unreadUsersMessageSender}
          />
        ) : null}
      </div>
    );
  }
}
export default MainPanel;
